import { Component } from '@angular/core';
import { ApiProv } from '../providers/api.prov';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
    constructor(private  apiProv: ApiProv) { 
      this.getBooks();
    }
    
    public getBooks() {
      this.apiProv.getBooks().then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
}
