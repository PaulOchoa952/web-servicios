import { Component } from '@angular/core';
import { ApiProv } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import { BooksModalComponent } from '../books-modal/books-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  public books: any= [];
    constructor(private  apiProv: ApiProv,
      public dialog: MatDialog,) { 
      this.getBooks();
    }
    
    public getBooks() {
      this.apiProv.getBooks().then((response) => {
        this.books = response.data;
      }).catch((error) => {
        console.log(error);
      });
    }
  // Función para hacer un seguimiento de los elementos en *ngFor
  trackBookId(index: number, book: any): number {
    return book._id; // Suponiendo que `_id` es único para cada libro
  }
  
    public logout(){
      this.apiProv.logout();
      window.location.href = '/login';
    }
    
    public newBookModal() {
      const dialogRef = this.dialog.open(BooksModalComponent, {
        data: {
          new: true
        },
        disableClose: true,
        hasBackdrop: true,
        width: '80%',
        height: '80%',
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        this.getBooks();
      });
    }

    public updateBookModal(book: any) {
      const dialogRef = this.dialog.open(BooksModalComponent, {
        data: {
          new: false,
          bookId: book._id,
          titulo: book.titulo,
          autor: book.autor,
          isbn: book.isbn,
          genero: book.genero,
          precio: book.precio,
          stock: book.stock,
          img: book.img
        },
        disableClose: true,
        hasBackdrop: true,
        width: '80%',
        height: '80%',
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        this.getBooks();
      });
    }

    public deleteBook(book: any) {
      Swal.fire({
        showCancelButton: true,
        title: '¿Desea eliminar libro: ' + book.titulo + ' ?',
        confirmButtonText: "Confirmar",
        cancelButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiProv.deleteBook(book._id)
            .then(
              (res) => {
                Swal.fire({
                  title: "Libro Eliminado",
                  icon: "success"
                });
                this.getBooks();
              }
            );
        }
      });
    }

}
