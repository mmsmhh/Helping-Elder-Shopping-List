import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-shopping-list',
  templateUrl: './add-shopping-list.component.html',
  styleUrls: ['./add-shopping-list.component.css'],
})
export class AddShoppingListComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;
  constructor(private modalService: BsModalService, private _fb: FormBuilder) {}

  itemName: string;
  quantity: string;
  notes: string;
  modalRef: BsModalRef;
  items: FormArray;
  shoppingList: FormGroup;

  ngOnInit() {
    this.shoppingList = new FormGroup({
      notes: new FormControl(''),
      items: new FormArray([
        new FormGroup({
          itemName: new FormControl(''),
          quantity: new FormControl(''),
        }),
      ]),
    });

    this.items = this.shoppingList.get('items') as FormArray;
  }

  resetForm() {
    this.shoppingList = new FormGroup({
      notes: new FormControl(''),
      items: new FormArray([
        new FormGroup({
          itemName: new FormControl(''),
          quantity: new FormControl(''),
        }),
      ]),
    });

    this.items = this.shoppingList.get('items') as FormArray;
  }

  addNewRow() {
    this.items.push(
      new FormGroup({
        itemName: new FormControl(''),
        quantity: new FormControl(''),
      })
    );
  }

  deleteRow(index: number) {
    this.items.removeAt(index);
  }

  @Output() addShoppingList: EventEmitter<any> = new EventEmitter();

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {
    console.log(this.shoppingList.get('notes').value);
    const shoppingList = {
      items: this.shoppingList.get('items').value,
      notes: this.shoppingList.get('notes').value
        ? this.shoppingList.get('notes').value
        : 'Thank you',
    };

    this.modalRef.hide();

    this.resetForm();

    this.addShoppingList.emit(shoppingList);
  }
}
