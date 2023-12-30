import { Component,OnInit } from '@angular/core';
import { FilterObject, FoodCategory, FoodCategoryArea, FoodCategoryIng, FoodService } from '../services/food/food.service';
import { FormControl, FormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Observable, take, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  selectedList: any;
  loader:boolean = true;
  categoryList$!: Observable<FoodCategory[]>;
  categoryFilter$!: Observable<FilterObject[]>;
  areaList$!:Observable<FoodCategoryArea[]> ;
  ingredientList$!:Observable<FoodCategoryIng[]>;
  selectedOption = new FormControl('c');
  constructor(private foodService: FoodService) {
  }
  
  // areaList$ = this.foodService.foodListArea$;
  
  dropdownOptions = [
    { label: 'Category', value: 'c' },
    { label: 'Area', value: 'a' },
    { label: 'Ingredient', value: 'i' },
  ];

  // Handle the selection change event
  onSelectionChange(event: MatSelectChange): void {
    this.loader=true
    if(event.value == 'c') {
      this.categoryList$.subscribe(products => {
        this.selectedList = products[0].strCategory;
        this.categoryFilter$ = this.foodService.getFilterList('c',this.selectedList)
      });
    }
    if(event.value == 'a') {
      this.areaList$.subscribe(products => {
        this.selectedList = products[0].strArea;
        this.categoryFilter$ = this.foodService.getFilterList('a',this.selectedList)
      });
    }
    if(event.value == 'i') {
      this.ingredientList$.subscribe(products => {
        this.selectedList = products[0].strIngredient;
        this.categoryFilter$ = this.foodService.getFilterList('i',this.selectedList)
      });
    }
    this.loader=false
  }

  filterList(type:String,name:String):void {
    this.selectedList = name;
    this.categoryFilter$ = this.foodService.getFilterList(type,name)
  }

  ngOnInit(): void {
    this.loader=true
    this.categoryList$ = this.foodService.foodListCategory$;
    this.categoryList$.subscribe(products => {
      this.selectedList = products[0].strCategory;
      this.categoryFilter$ = this.foodService.getFilterList('c',this.selectedList)
    });
    this.areaList$ = this.foodService.foodListArea$;
    this.ingredientList$ = this.foodService.foodListIngredient$;
    this.loader=false
  }
}
