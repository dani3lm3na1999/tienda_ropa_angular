import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/Service/firebase.service';
import { LogsService } from 'src/app/Service/logs.service';

@Component({
  selector: 'app-logos',
  templateUrl: './logos.component.html',
  styleUrls: ['./logos.component.css']
})
export class LogosComponent implements OnInit {
  logos: any[] = [];
  logoForm: FormGroup;
  imagen:any;

  constructor(
    private _builder: FormBuilder,
    private logoService: LogsService,
    private firebaseService: FirebaseService    
  ){
    this.logoForm = this._builder.group({
      tipo: ['', Validators.required],
      url: ['', Validators.required]
    });
  };

  ngOnInit(): void {
    this.MostrarLogos();
  }
  
  obtenerImagen(event: any){
    let imagen = event.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(imagen[0]);
    reader.onloadend = () => {
      this.imagen = reader.result;
    }
  }

  GuardarLogos(){
    console.log(this.imagen);
    let logo = {  
      tipo: this.logoForm.get('tipo')?.value,
      url: ''
    }

    this.firebaseService.subirImagen(`${Date.now()}`, this.imagen, logo.tipo).then((res) =>{
      if (res != null){
        logo.url = res;
        console.log(res);
        this.logoService.guardarLogo(logo).subscribe({
          next: (r) => {
            console.log(r);
          },
          error: (e) => {},
          complete: () => {},
        });
      }
    });
  }

  MostrarLogos(){
    this.logoService.obtenerLogos().subscribe({
      next: (r) => {
        this.logos = r;
      },
      error: (e) => {},
      complete: () => { }
    });
  }
}
