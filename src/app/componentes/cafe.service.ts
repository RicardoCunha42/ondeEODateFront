import { Lugar } from './lugar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filtro } from './filtro';

@Injectable({
  providedIn: 'root'
})
export class CafeService {
  private readonly ApiCafes = 'https://ondeeodate-production.up.railway.app/cafes'

  constructor(private http: HttpClient) { }

  criar(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>(this.ApiCafes, lugar);
  }

  pegar(pagina: number): Observable<Lugar[]> {
    let params = new HttpParams().set('page', pagina)
    return this.http.get<Lugar[]>(this.ApiCafes, {params})
  }

  pesquisaFiltrada(pagina: number, filtro: Filtro): Observable<Lugar[]> {
    let params: HttpParams = this.filtraParams(pagina, filtro)
    let url = this.ApiCafes + '/search'

    return this.http.get<Lugar[]>(url, {params})
  }

  filtraParams(pagina: number, filtro: Filtro): HttpParams {
    let params = new HttpParams().set('page', pagina)
    console.log(filtro.prefix)

    if(filtro.prefix != '') {
      params = params.set('prefix', filtro.prefix)

    }

    if(filtro.gasto != '') {
      params = params.set('gasto', filtro.gasto)

    }

    if(filtro.clima != '') {
      params = params.set('clima', filtro.clima)

    }

    return params
  }

  atualizar(lugarAtualizado: Lugar, id?: number): Observable<Lugar> {
    var putUrl = this.ApiCafes + '/' + id
    return this.http.put<Lugar>(putUrl, lugarAtualizado)
  }

  pegarPorId(id: number): Observable<Lugar> {
    var getPorIdUrl = this.ApiCafes + '/' + id
    return this.http.get<Lugar>(getPorIdUrl)
  }

  deletar(id: number): Observable<Lugar[]> {
    var deleteUrl = this.ApiCafes + '/' + id
    console.log(deleteUrl)
    return this.http.delete<Lugar[]>(deleteUrl)
  }
}
