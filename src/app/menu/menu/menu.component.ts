import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  elementos = ['Elemento 1', 'Elemento 2', 'Elemento 3','Elemento 2', 'Elemento 3','Elemento 2', 
  'Elemento 3','Elemento 2', 'Elemento 3','Elemento 2', 'Elemento 3','Elemento 2', 'Elemento 3'];


  ngOnInit(): void {
  }

  
}
