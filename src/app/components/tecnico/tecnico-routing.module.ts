import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TecnicoComponent } from './tecnico.component';
import { WorkHoursComponent } from './work-hours/work-hours.component';

const routes: Routes = [{ path: '', component: TecnicoComponent },
  { path: 'work-hours', component: WorkHoursComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicoRoutingModule { }
