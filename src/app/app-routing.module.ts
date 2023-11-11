import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda/tienda.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
        {
            path: '', component: TiendaComponent, 
        },
    ], {scrollPositionRestoration: 'enabled'})
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
