import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();


  close(){
    this.onCloseSidenav.emit(true);
  }
}
