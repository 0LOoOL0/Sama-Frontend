import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketInfoPage } from './marketinfo.page';

const routes: Routes = [
  {
    path: '',
    component: MarketInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketInfoPageRoutingModule {}
