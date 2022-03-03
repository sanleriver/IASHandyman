import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorasSemanales } from 'src/app/model/horasSemanales.model';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-work-hours',
  templateUrl: './work-hours.component.html',
  styleUrls: ['./work-hours.component.scss']
})
export class WorkHoursComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formSubmitted: boolean = false;
  formSubmitted2: boolean = false;
  horasTrabajadas: HorasSemanales = <HorasSemanales>{};
  
  constructor(private formBuilder: FormBuilder,
              private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'tecnico_id': ['', Validators.compose([Validators.required])],
      'semana': ['', Validators.compose([Validators.required])],
    })
  }

  onSubmit(weekForm: string[]) {
    this.formSubmitted = true;
    this.formSubmitted2 = true;

    if (this.form.valid) {
        let tecnico_id = this.form.controls['tecnico_id'].value;
        let semana = this.form.controls['semana'].value;

        this.reporteService.getReporte(tecnico_id, semana)
          .subscribe(horas =>{
            this.horasTrabajadas = horas
            console.log(this.horasTrabajadas);
          })
          this.formSubmitted = false;

    } else {
        console.log("The form is NOT valid");
        this.formSubmitted = false;
    }
}

}
