import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  @Input() currentPage: string = '';
  @Output() selectedPage: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  menuSwitch(page: string){
    //this.selectedPage.emit(this.currentPage);
    this.selectedPage.emit(page);
  }

}
