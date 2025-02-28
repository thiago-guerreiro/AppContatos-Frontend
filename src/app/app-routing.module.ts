import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HerosectionComponent } from './components/herosection/herosection.component';

const routes: Routes = [
  {
    path: '', component: HerosectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
