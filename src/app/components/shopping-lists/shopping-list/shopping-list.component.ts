import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  faTrash,
  faPlus,
  faShoppingCart,
  faEraser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  @Input() shoppingList: any;
  @Input() userId: any;

  @Output() deleteShoppingList: EventEmitter<any> = new EventEmitter();
  @Output() buyShoppingList: EventEmitter<any> = new EventEmitter();
  @Output() unBuyShoppingList: EventEmitter<any> = new EventEmitter();

  constructor() {}
  
  faTrash = faTrash;
  faPlus = faPlus;
  faShoppingCart = faShoppingCart;
  faEraser = faEraser;

  ngOnInit(): void {}

  onDelete(id) {
    this.deleteShoppingList.emit(id);
  }

  onBuy(id) {
    this.buyShoppingList.emit(id);
  }

  onUnBuy(id) {
    this.unBuyShoppingList.emit(id);
  }
}
