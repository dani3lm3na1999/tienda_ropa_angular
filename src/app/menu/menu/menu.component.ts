import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private routeService:Router
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
        const lista: any[] = []
        r.forEach(e=>{
          if(e.nombre === 'UNIFORMES DEPORTIVOS' || e.nombre === 'UNIFORMES EMPRESARIALES'){
          }else{
            lista.push(e)
          }
        })
        this.lstMostrarCategorias = lista;
      },
      error: (e) => {},
      complete: () => {},
    });
  }

  mostrarUnProductoById(id:string){
    this.productoService.obtenerProductoById(id).subscribe({
      next: (r) => {
        this.routeService.navigate(['/Camisa3d/'+r._id])
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {},
    });
  }
}
