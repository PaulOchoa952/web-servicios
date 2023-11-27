import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { BookListComponent } from './book-page/book-list.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'books', component: BookListComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: '**',redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
