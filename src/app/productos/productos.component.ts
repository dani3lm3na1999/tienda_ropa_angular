import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoriasService } from '../Service/categorias.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{

  selectCategoria:any;
  lstMostrarCategorias:any;

  constructor(
    private fb: FormBuilder,
    private categoriasServices: CategoriasService
  ) {

  }
  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(){
    this.categoriasServices.obtenerProducto().subscribe(data=>{
    this.lstMostrarCategorias = data
    })
  }
 
}
