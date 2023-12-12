import { Component,Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
'@angular/material/dialog';

import { ApiProv } from '../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books-modal',
  templateUrl: './books-modal.component.html',
  styleUrl: './books-modal.component.css'
})
export class BooksModalComponent {
  public new = false;
  public bookId = "";
  public titulo = '';
  public autor = '';
  public isbn = '';
  public genero = '';
  public precio = '';
  public stock = '';
  public img = '';
  constructor(
    public dialogRef: MatDialogRef<BooksModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProv
  ){
    this.new = data.new;
    this.bookId = data.bookId;
    this.titulo = data.titulo;
    this.autor = data.autor;
    this.isbn = data.isbn;
    this.genero = data.genero;
    this.precio = data.precio;
    this.stock = data.stock;
    this.img = data.img;
  }
  public createBook() {
    const data = {
      titulo: this.titulo,
      autor: this.autor,
      isbn: this.isbn,
      genero: this.genero,
      precio: this.precio,
      stock: this.stock,
      img: this.img
    }
    this.apiProv.createBook(data)
    .then((res) => {
      if (res) {
        Swal.fire({
          title: 'Libro creado',
          text: 'El libro se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.Onclose();
      }
    });
    
  }

  public updateBook(): void {
    const data = {
      titulo: this.titulo,
      autor: this.autor,
      isbn: this.isbn,
      genero: this.genero,
      precio: this.precio,
      stock: this.stock,
      img: this.img
    }

    this.apiProv.updateBook(this.bookId, data)
    .then(
      (res) => {
        if(res){
          Swal.fire({
            title: "Libro Actualizado",
            icon: "success"
          });
          this.Onclose()
        }
      }
    );
  }

  Onclose(): void {
    this.dialogRef.close();
  }

  
}
