import { TestBed } from '@angular/core/testing';
import { from, of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReporteService } from './reporte.service';
import { Reporte } from '../model/reporte.model';
import { environment } from 'src/environments/environment';

describe('ReporteService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  let service: ReporteService;
  let reporteService: ReporteService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ReporteService(httpClientSpy as any);
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    httpTestingController = TestBed.inject(HttpTestingController);
    //service = TestBed.inject(ReporteService);
  });

  it('should return expected created register(HttpClient called once)', () => {
      const reporte: Reporte = {reporte_id:1,tecnico_id:123456,servicio_id:123456,fecha_hora_inicio:new Date(), fecha_hora_fin: new Date()};
      //reporteService.createReporte(reporte).subscribe(creando => expect(creando).toEqual(reporte));  
  });

  it('should return expected horas semanales (HttpClient called once)', () => {
      const horasSemanales = {cantidadHorasNormales: '1',
        cantidadHorasNocturnas:'2',
        cantidadHorasDominicales:'0',
        cantidadHorasNormalesExtra:'0',
        cantidadHorasNocturnasExtra:'0',
        cantidadHorasDominicalesExtra:'0'};

      httpClientSpy.get.and.returnValue(of(horasSemanales));

      service.getReporte(123456,7).subscribe( horasTrabajadas =>
          expect(horasTrabajadas)
          .toEqual(horasSemanales),
        fail);
      
      expect(httpClientSpy.get.calls.count())
    .withContext('one call')
    .toBe(1);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
