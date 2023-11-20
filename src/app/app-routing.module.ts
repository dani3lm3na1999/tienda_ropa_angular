import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda/tienda.component';
import { MenuComponent } from './menu/menu/menu.component';
import { LogosComponent } from './logos/logos/logos.component';
import { ProductosComponent } from './productos/productos.component';


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
          path: 'Productos', component: ProductosComponent, 
        },
        {
          path: '', component: MenuComponent, 
        },
    ], {scrollPositionRestoration: 'enabled'})
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
