import { Component, Input, OnInit } from '@angular/core';
import { Lugar } from '../lugar';
import { LugarService } from '../lugar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() lugar: Lugar = {
    id: 0,
    nome: '',
    insta: '',
    gasto: '',
    clima: '',
    obs: ''
  }

  constructor(
    private service: LugarService,
    private cafeService: CafeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  deletaLugar() {
    if(this.lugar.id){
      var path = this.route.snapshot.url.toString()

      if (path === '') {
        this.service.deletar(this.lugar.id).subscribe(() => {
          this.router.navigate([this.router.url])
        })

      } else if (path === 'cafes') {
        this.cafeService.deletar(this.lugar.id).subscribe(() => {
          this.router.navigate([this.router.url])
        })
      }
    }
  }

  barOuCafe() {
    var path = this.route.snapshot.url.toString()

    if (path === '') {
      return 'bares-formulario'

    } else {
      return 'cafes-formulario'
    }
  }

}
