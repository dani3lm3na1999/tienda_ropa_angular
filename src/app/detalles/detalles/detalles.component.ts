import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/Service/productos.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit{

  constructor(
    private productosServices: ProductosService,
    private route: ActivatedRoute,
    private routeService:Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productosServices.obtenerProductoById(id!).subscribe({
        next: (r) => {    
          console.log(r)
        },
        error: (e) => {
          console.log(e)
        },
        complete: () => {},
      });
  })
  }

}
