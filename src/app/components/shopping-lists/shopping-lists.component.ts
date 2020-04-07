import { Component, OnInit, Input } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.css'],
})
export class ShoppingListsComponent implements OnInit {
  constructor(
    private _shoppingListService: ShoppingListService,
    private _userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  shoppingLists: any[];
  currentShoppingLists: any[];
  currentPage: number;
  userId: string;

  @Input() id;
  @Input() type;

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.currentShoppingLists = this.shoppingLists.slice(startItem, endItem);
  }

  ngOnInit(): void {
    this.spinner.show();

    this.currentPage = 1;
    this.userId = this._userService.getId();
    this.getAll();
  }

  getAll(): any {
    if (this.type != null) {
      if (this.type == 'owner') {
        this._shoppingListService.getOwner(this.id).subscribe((res) => {
          if (res.data.shoppingLists) {
            this.shoppingLists = res.data.shoppingLists;
            this.updateSubArray();
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
          }
        });
      } else {
        this._shoppingListService.getVolunteer(this.id).subscribe((res) => {
          if (res.data.shoppingLists) {
            this.shoppingLists = res.data.shoppingLists;
            this.updateSubArray();
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
          }
        });
      }
    } else {
      this._shoppingListService.getAll().subscribe((res) => {
        if (res.data.shoppingLists) {
          this.shoppingLists = res.data.shoppingLists;
          this.updateSubArray();
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
      });
    }
  }

  updateSubArray(): void {
    const startItem = (this.currentPage - 1) * 3;
    const endItem = this.currentPage * 3;
    this.currentShoppingLists = this.shoppingLists.slice(startItem, endItem);
  }

  deleteShoppingList(id: string) {
    this.shoppingLists = this.shoppingLists.filter((sl) => sl._id !== id);

    this.updateSubArray();

    this._shoppingListService.deleteShoppingList(id).subscribe();
  }

  addShoppingList(shoppingList: any) {
    this._shoppingListService.create(shoppingList).subscribe((res) => {
      this.shoppingLists.push(res.data.shoppingList);
      this.updateSubArray();
    });
  }
}
