import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {WindowService} from '../tools/window.service';
import {storageKeys} from '../../configs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private category$ = new BehaviorSubject<string>('youshengshu');
  private subcategory$ = new BehaviorSubject<string[]>([]);
  constructor(private winServe: WindowService) {
    const cacheCategory = this.winServe.getStorage(storageKeys.categoryPinyin);
    if (cacheCategory) {
      this.category$.next(cacheCategory);
    }
  }

  setCategory(category: string): void {
    this.winServe.setStorage(storageKeys.categoryPinyin, category);
    this.category$.next(category);
  }

  getCategory(): Observable<string> {
    return this.category$.asObservable();
  }

  setSubCategory(category: string[]): void {
    this.subcategory$.next(category);
  }

  getSubCategory(): Observable<string[]> {
    return this.subcategory$.asObservable();
  }
}
