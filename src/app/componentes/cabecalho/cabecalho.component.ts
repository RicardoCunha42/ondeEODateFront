import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {
  barOuCafe: boolean = true

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  eBarOuCafe() {
    if (this.barOuCafe) {
      return 'Bares'

    } else {
      return 'Cafés'
    }
  }

  alteraTipo() {
    if(this.barOuCafe) {
      this.barOuCafe = false
    } else {
      this.barOuCafe = true
    }
  }

}
