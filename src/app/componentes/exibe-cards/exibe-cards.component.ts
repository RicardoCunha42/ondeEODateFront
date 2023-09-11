import { ActivatedRoute } from '@angular/router';
import { Lugar } from '../lugar';
import { LugarService } from './../lugar.service';
import { Component, OnInit } from '@angular/core';
import { CafeService } from '../cafe.service';
import { Filtro } from '../filtro';

@Component({
  selector: 'app-exibe-cards',
  templateUrl: './exibe-cards.component.html',
  styleUrls: ['./exibe-cards.component.css']
})
export class ExibeCardsComponent implements OnInit {

  lugares: Lugar[] = []
  pagina: number = 0
  filtro: Filtro = {
    prefix: '',
    gasto: '',
    clima: ''
  }

  constructor(
    private service: LugarService,
    private cafeService: CafeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buscaTodos()
  }

  buscaTodos() {
    var path = this.route.snapshot.url.toString()
    if(path === '') {
      this.service.pegar(this.pagina).subscribe(lugaresBuscados => {
        this.lugares = lugaresBuscados
      })
    } else if (path === 'cafes') {
      this.cafeService.pegar(this.pagina).subscribe(lugaresBuscados => {
        this.lugares = lugaresBuscados
      })
    }
  }

  proximaPagina() {
    var path = this.route.snapshot.url.toString()
    if(path === '') {
      this.service.pegar(++this.pagina).subscribe(lugaresBuscados => {
        this.lugares = lugaresBuscados
      })
    } else if (path === 'cafes') {
      this.cafeService.pegar(++this.pagina).subscribe(lugaresBuscados => {
        this.lugares = lugaresBuscados
      })
    }
  }

  voltaPagina() {
    var path = this.route.snapshot.url.toString()
    if(path === '') {
      this.service.pegar(--this.pagina).subscribe(lugaresBuscados => {
        this.lugares = lugaresBuscados
      })
    } else if (path === 'cafes') {
      this.cafeService.pegar(--this.pagina).subscribe(lugaresBuscados => {
        this.lugares = lugaresBuscados
      })
    }
  }

  pesquisarLugar() {
    this.pagina = 0
    var path = this.route.snapshot.url.toString()

    if(path === '') {
      this.service.pesquisaFiltrada(this.pagina, this.filtro).subscribe(filtrados => {
        this.lugares = filtrados
      })

    } else if (path === 'cafes') {
      this.cafeService.pesquisaFiltrada(this.pagina, this.filtro).subscribe(filtrados => {
        this.lugares = filtrados
      })
    }
  }

  barOuCafe() {
    var path = this.route.snapshot.url.toString()

    if (path === '') {
      return 'Bares'

    } else {
      return 'Cafés'
    }
  }

}
