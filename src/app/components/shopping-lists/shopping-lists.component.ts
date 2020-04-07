import { Component, OnInit, Input } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.css'],
})
export class ShoppingListsComponent implements OnInit {
  constructor(
    private _shoppingListService: ShoppingListService,
    private _userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  shoppingLists: any[];
  currentShoppingLists: any[];
  currentPage: number;
  userId: string;
  loaded: boolean;

  @Input() id;
  @Input() type;

  pageChanged(event: PageChangedEvent): void {
    this.currentPage = event.page;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.currentShoppingLists = this.shoppingLists.slice(startItem, endItem);
  }

  ngOnInit(): void {
    this.loaded = false;
    this.spinner.show();
    this.currentPage = 1;
    this.userId = this._userService.getId();
    this.getAll();
  }

  getAll(): any {
    if (this.type) {
      if (this.type == 'owner') {
        this._shoppingListService.getOwner(this.id).subscribe((res) => {
          if (res.data.shoppingLists) {
            this.shoppingLists = res.data.shoppingLists;
            this.updateSubArray();
            setTimeout(() => {
              this.spinner.hide();
              this.loaded = true;
            }, 1000);
          }
        },
        (err) => {
          this.toastr.error(err.error.msg);
        });
      } else if (this.type == 'volunteer') {
        this._shoppingListService.getVolunteer(this.id).subscribe((res) => {
          if (res.data.shoppingLists) {
            this.shoppingLists = res.data.shoppingLists;
            this.updateSubArray();
            setTimeout(() => {
              this.spinner.hide();
              this.loaded = true;
            }, 1000);
          }
        },
        (err) => {
          this.toastr.error(err.error.msg);
        });
      }
    } else {
      this._shoppingListService.getAll().subscribe((res) => {
        if (res.data.shoppingLists) {
          this.shoppingLists = res.data.shoppingLists;
          this.updateSubArray();
          setTimeout(() => {
            this.spinner.hide();
            this.loaded = true;
          }, 1000);
        }
      },
      (err) => {
        this.toastr.error(err.error.msg);
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

    this._shoppingListService.deleteShoppingList(id).subscribe((res) => {
      this.toastr.success('Done', 'Shopping list deleted succesfully');

    },
      (err) => {
        this.toastr.error(err.error.msg);
      });
  }

  addShoppingList(shoppingList: any) {
    this._shoppingListService.create(shoppingList).subscribe((res) => {
      this.shoppingLists.push(res.data.shoppingList);
      this.updateSubArray();
      this.toastr.success('Done', 'Shopping list added succesfully');
    },
    (err) => {
      this.toastr.error(err.error.msg);
    });
  }

  buyShoppingList(id) {
    this._shoppingListService.buy(id).subscribe((res) => {
      for (let i = 0; i < this.shoppingLists.length; i++) {
        if (this.shoppingLists[i]._id == id) {
          this.shoppingLists[i] = res.data.shoppingList;
          break;
        }
      }
      this.updateSubArray();
      this.toastr.success('Done', 'Shopping list assigned succesfully');
    },
    (err) => {
      this.toastr.error(err.error.msg);
    });
  }

  unBuyShoppingList(id) {
    this._shoppingListService.unBuy(id).subscribe((res) => {
      for (let i = 0; i < this.shoppingLists.length; i++) {
        if (this.shoppingLists[i]._id == id) {
          if (this.type && this.type == 'volunteer') {
            this.shoppingLists.splice(i, 1);
          } else {
            this.shoppingLists[i] = res.data.shoppingList;
          }
          break;
        }
      }
      this.updateSubArray();
      this.toastr.success('Done', 'Shopping list unassigned succesfully');
    },
    (err) => {
      this.toastr.error(err.error.msg);
    });
  }
}
