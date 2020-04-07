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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-shopping-list',
  templateUrl: './add-shopping-list.component.html',
  styleUrls: ['./add-shopping-list.component.css'],
})
export class AddShoppingListComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  faTrash = faTrash;
  faPlus = faPlus;
  itemName: string;
  quantity: string;
  notes: string;
  modalRef: BsModalRef;
  items: FormArray;
  shoppingList: FormGroup;

  @Output() addShoppingList: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.initForm();
  }

  initForm() {
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {
    for (let i = 0; i < this.shoppingList.get('items').value.length; i++) {
      let element = this.shoppingList.get('items').value[i];
      if (element.itemName.length < 1) {
        this.toastr.error("Item name can't be empty");
        return;
      }

      if (element.quantity.length < 1) {
        this.toastr.error("Quantity can't be empty");
        return;
      }
    }

    if (this.shoppingList.get('notes').value.length < 1) {
      this.toastr.error("Notes can't be empty");
      return;
    }

    const shoppingList = {
      items: this.shoppingList.get('items').value,
      notes: this.shoppingList.get('notes').value,
    };

    this.modalRef.hide();

    this.initForm();

    this.addShoppingList.emit(shoppingList);
  }
}
