import { Injectable } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private url = environment.url;
  constructor(private HttpClient: HttpClient) {}

  guardarLogo(logo: any): Observable<any> {
    return this.HttpClient.post(`${this.url}/logos'`, logo);
  }

  obtenerLogos(): Observable<any[]> {
    return this.HttpClient.get<any[]>(`${this.url}/logos`);
  }
}
