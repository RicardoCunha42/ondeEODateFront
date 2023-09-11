import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LugarService } from '../lugar.service';
import { Lugar } from '../lugar';
import { ActivatedRoute, Router } from '@angular/router';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  formulario!: FormGroup
  lugar: Lugar = {
    id: -1,
    nome: '',
    insta: '',
    gasto: '',
    clima: '',
    obs: ''
  }

  constructor(
      private service: LugarService,
      private cafeService: CafeService,
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit(): void {
    var idString = this.route.snapshot.paramMap.get('id')

    if(idString != null) {
      const idNumber = parseInt(idString)
      var path = this.route.snapshot.url.toString()

      if (path.includes('bares-formulario')){
        this.service.pegarPorId(idNumber).subscribe((lugarPego)=>{
          this.lugar = lugarPego
          this.constroiForm()
        })

      } else if (path.includes('cafes-formulario')) {
        this.cafeService.pegarPorId(idNumber).subscribe((lugarPego)=>{
          this.lugar = lugarPego
          this.constroiForm()
        })
      }

    } else {
      this.constroiForm()

    }
  }

  constroiForm() {
    this.formulario = this.formBuilder.group({
      id: this.lugar.id,
      nome: [this.lugar.nome,
        [Validators.required,
        Validators.minLength(3)]],
      insta: [this.lugar.insta,
        [Validators.required,
        Validators.pattern('^(https:\/\/www.instagram.com\/)([\\w.\/]+)')]],
      gasto: [this.lugar.gasto, Validators.required],
      clima: [this.lugar.clima, Validators.required],
      obs: [this.lugar.obs, Validators.maxLength(120)]
    })
  }

  enviadados() {
    if(this.formulario.valid) {
      var path = this.route.snapshot.url.toString()
      if (path === 'bares-formulario'){
        this.service.criar(this.formulario.value).subscribe(() => {
          this.router.navigate(['/'])
        })

      } else if (path === 'cafes-formulario') {
        this.cafeService.criar(this.formulario.value).subscribe(() => {
          this.router.navigate(['cafes'])
        })
      }
    }
  }

  atualizaDados() {
    if (this.formulario.valid) {
      var path = this.route.snapshot.url.toString()

      if (path.includes('bares-formulario')){
        this.service.atualizar(this.formulario.value, this.lugar.id).subscribe(() => {
          this.router.navigate([''])
        })

      } else if (path.includes('cafes-formulario')) {
        this.cafeService.atualizar(this.formulario.value, this.lugar.id).subscribe(() => {
          this.router.navigate(['cafes'])
        })
      }
    }
  }

  barOuCafe() {
    var path = this.route.snapshot.url.toString()
    if (path.includes('bares-formulario')) {
      return 'Bares'

    } else {
      return 'Cafés'
    }
  }
}
