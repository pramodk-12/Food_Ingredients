import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, shareReplay, tap } from 'rxjs/operators';

export interface FoodCategory {
  strCategory:string
}
export interface FoodCategoryObject {
  meals:FoodCategory[]
}
export interface FoodCategoryArea {
  strArea:string
}
export interface FoodCategoryAreaObject {
  meals:FoodCategoryArea[]
}
export interface FoodCategoryIng {
  idIngredient:string;
  strIngredient:string;
  strDescription:string;
  strType:string;
}
export interface FoodCategoryIngObject {
  meals:FoodCategoryIng[]
}

export interface FilterObject {
  strMeal:string;
  strMealThumb:string;
  idMeal:string;
}

export interface FilterList {
  meals:FilterObject[];
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodSearchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?';
  private listUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?';
  private filterUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?';

  constructor(private http: HttpClient) { }
  foodListCategory$ = this.http.get<FoodCategoryObject>(this.listUrl+`c=list`)
    .pipe(
        map(element => element['meals'] ),
        tap(data => console.log(data))
    );
  foodListArea$ = this.http.get<FoodCategoryAreaObject>(this.listUrl+`a=list`)
    .pipe(
        map(element => element['meals'] ),
        tap(data => console.log(data))
    );
  foodListIngredient$ = this.http.get<FoodCategoryIngObject>(this.listUrl+`i=list`)
    .pipe(
        map(element => element['meals'] ),
        tap(data => console.log(data))
    );
  getFilterList(type:String,name:String) {
    return this.http.get<FilterList>(this.filterUrl+type + `=` + name).pipe(
      map(element => element['meals'] ),
      tap(data => console.log('Filter list',data))
  );
  }
}
