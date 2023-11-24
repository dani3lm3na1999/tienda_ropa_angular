import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogsService } from 'src/app/Service/logs.service';

@Component({
  selector: 'app-logos',
  templateUrl: './logos.component.html',
  styleUrls: ['./logos.component.css']
})
export class LogosComponent implements OnInit {
  logos: any[] = [];
  logoForm: FormGroup;
  archivo:File = new File([], '');

  constructor(
    private _builder: FormBuilder,
    private logoService: LogsService,
  ){
    this.logoForm = this._builder.group({
      tipo: ['', Validators.required],
      url: ['', Validators.required]
    });
  };

  ngOnInit(): void {
    this.MostrarLogos();
  }

  MostrarLogos(){
    this.logoService.obtenerLogos().subscribe({
      next: (r) => {
        this.logos = r;
        console.log(r);
      },
      error: (e) => {},
      complete: () => { }
    });
  }

  obtenerImagen(event: any){
   this.archivo = event.target.files[0];
  }
  
  guardarLogos(){
    const formData = new FormData();
    formData.append('url', this.archivo);
    formData.append('tipo', this.logoForm.get('tipo')?.value);

    this.logoService.guardarLogo(formData).subscribe({
      next: (r) => {
        console.log(r);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.MostrarLogos();
      },
    })
  }
 
}
