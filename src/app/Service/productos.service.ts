import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private url = environment.url;
  constructor(private HttpClient: HttpClient) {}

  guardarProducto(productos: FormData): Observable<any> {
    return this.HttpClient.post(`${this.url}/productos`, productos);
  }
  
  mostrarProductos(): Observable<any[]> {
    return this.HttpClient.get<any[]>(this.url + '/productos');
  }

  mostrarProductosByCategoria(id:String): Observable<any[]> {
    return this.HttpClient.get<any[]>(`${this.url}/productos/categoria/${id}`);
  }
  
  obtenerProducto(): Observable<any> {
    return this.HttpClient.get(this.url + '/productos');
  }

  
}
