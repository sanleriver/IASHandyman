import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reporte } from '../model/reporte.model';
import { environment } from 'src/environments/environment';
import { HorasSemanales } from '../model/horasSemanales.model';

const cabecera = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private httpClient: HttpClient) { }

  public createReporte(reporte: Reporte){
    return this.httpClient.post(`${environment.api}/reporte`, reporte)
  }

  public getReporte(tecnicoId: number, semana: number){
    return this.httpClient.get<HorasSemanales>(`${environment.api}/reporte/${tecnicoId}/${semana}`)
  }
}
