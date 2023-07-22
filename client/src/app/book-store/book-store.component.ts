import { Component } from '@angular/core';
import { Book } from '../model/book.model';
import { BookRepository } from '../model/book.repository';
import { Cart } from '../model/cart.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css']
})
export class BookStoreComponent
{
  // public selectedAuthor = null;    // CHANGED "strictNullChecks": false IN TSCONFIG FILE!
  public selectedAuthor:string | null = null;
  public booksPerPage = 4;
  public selectedPage = 1;


  constructor(private repository: BookRepository,     // Putting in Constructor-> Shorthand, gets initialized as variable available to the whole
              private cart: Cart,
              private router: Router){ }

  get books(): Book[]
  {
    const pageIndex = (this.selectedPage - 1) * this.booksPerPage;
    return this.repository.getBooks(this.selectedAuthor)
      .slice(pageIndex, pageIndex + this.booksPerPage);
  }

  get authors(): string[]
  {
    return this.repository.getAuthors();
  }

  changeAuthor(newAuthor?: string): void
  {
    // this.selectedAuthor = newAuthor;
    // this.selectedAuthor = newAuthor !== undefined ? newAuthor : '';
    this.selectedAuthor = newAuthor !== undefined ? newAuthor : null;
  }


  changePage(newPage: number): void
  {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number): void
  {
    this.booksPerPage = Number(newSize);
    this.changePage(1);
  }

  //==================================================
  //Added to make the above work
  onChangePageSize(event: Event): void 
  {
    const target = event.target as HTMLSelectElement;
    this.changePageSize(Number(target.value));
  }   
  //==================================================

  get pageCount(): number
  {
    return Math.ceil(this.repository
      .getBooks(this.selectedAuthor).length / this.booksPerPage);
  }

  // get pageNumbers(): number[]
  // {
  //   return Array(Math.ceil(this.repository
  //     .getBooks(this.selectedAuthor).length / this.booksPerPage))
  //     .fill(0).map((x, i) => i + 1);
  // }

  addBookToCart(book: Book): void
  {
    this.cart.addLine(book);
    this.router.navigateByUrl('/cart');
  }
}
