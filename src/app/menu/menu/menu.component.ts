import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/Service/categorias.service';
import { ProductosService } from 'src/app/Service/productos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  productos: any [] = [];
  lstMostrarCategorias: any;
  selectCategoria: any;

  constructor(
    private productoService: ProductosService,
    private categoriasServices: CategoriasService,
  ){}

  ngOnInit(): void {
    this.cargarProductos();
    this.obtenerCategorias();
  }

  cargarProductos(){
    this.productoService.mostrarProductos().subscribe( data => {
      this.productos = data;
    });
  }
  
  cargarProductosByCategoria(){
    this.productoService.mostrarProductosByCategoria(this.selectCategoria).subscribe( data => {
      this.productos = data;
    });
  }

  obtenerCategorias() {
    this.categoriasServices.obtenerProducto().subscribe({
      next: (r) => {
        this.lstMostrarCategorias = r;
      },
      error: (e) => {},
      complete: () => {},
    });
  }
}
