import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda/tienda.component';
import { MenuComponent } from './menu/menu/menu.component';
import { LogosComponent } from './logos/logos/logos.component';
import { PruevaComponent } from './prueva/prueva/prueva.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
        {
            path: 'Tienda', component: TiendaComponent, 
        },
        {
          path: 'Menu', component: MenuComponent, 
        },
        {
          path: 'Logos', component: LogosComponent, 
        },
        {
          path: 'prueva', component: PruevaComponent, 
        },
    ], {scrollPositionRestoration: 'enabled'})
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
