import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule, MatInputModule,
    MatCardModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: HomeComponent 
      }
    ])
  ]
})
export class FoodModule { }
