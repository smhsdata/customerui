import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignerDashboardComponent } from './designer-dashboard/designer-dashboard.component';

const routes: Routes = [
  {path: '', component: DesignerDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
