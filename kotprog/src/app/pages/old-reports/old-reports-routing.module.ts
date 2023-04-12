import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OldReportsComponent } from './old-reports.component';

const routes: Routes = [{ path: '', component: OldReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OldReportsRoutingModule { }
