import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reporte } from 'src/app/model/reporte.model';
import { ReporteService } from 'src/app/services/reporte.service';
import Swal from 'sweetalert2';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';

const input = document.querySelector('.f_inicio');

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.scss']
})

export class TecnicoComponent implements OnInit {

  reporte: Reporte = <Reporte>{};
  form: FormGroup = new FormGroup({});
  formSubmitted: boolean = false;
  fecha_hora_inicio: Date = new Date;
  fecha_hora_fin: Date = new Date;
  
  //fecha_inicio: string = '2022-02-16T00:00';

  constructor(private formBuilder: FormBuilder,
              private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'tecnico_id': ['', Validators.compose([Validators.required])],
      'servicio_id': ['', Validators.compose([Validators.required])],
      'fecha_hora_inicio': ['', Validators.compose([Validators.required])],
      'fecha_hora_fin': ['', Validators.compose([Validators.required])],
    })
    console.log(input)
  }

  onSubmit(loginForm: string[]) {
    this.formSubmitted = true;

    if (this.form.valid) {
        let tecnico_id = this.form.controls['tecnico_id'].value;
        let servicio_id = this.form.controls['servicio_id'].value;
        this.fecha_hora_inicio = this.form.controls['fecha_hora_inicio'].value;
        this.fecha_hora_fin = this.form.controls['fecha_hora_fin'].value;

        this.reporte.tecnico_id = tecnico_id;
        this.reporte.servicio_id = servicio_id;
        this.reporte.fecha_hora_inicio = this.fecha_hora_inicio;
        this.reporte.fecha_hora_fin = this.fecha_hora_fin;

        this.reporteService.createReporte(this.reporte)
        .subscribe(report =>{
          console.log('REPORTE REGISTRADO', report);
          Swal.fire(
            'Listo!',
            'Reporte registrado con exito!',
            'success'
          )
        })

    } else {
        console.log("The form is NOT valid");
        this.formSubmitted = false;
    }
}

}

