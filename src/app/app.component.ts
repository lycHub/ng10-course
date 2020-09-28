import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlbumService} from './services/apis/album.service';
import {Category} from './services/apis/types';
import {CategoryService} from './services/business/category.service';
import {Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {OverlayService} from './services/tools/overlay.service';

@Component({
  selector: 'xm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  currentCategory: Category;
  categories: Category[] = [];
  categoryPinyin = '';
  subCategory: string[] = [];
  constructor(
    private albumServe: AlbumService,
    private cdr: ChangeDetectorRef,
    private categoryServe: CategoryService,
    private router: Router,
    private overlayServe: OverlayService
  ) {

  }

  showOverlay() {
    // this.overlayServe.create()
  }

  ngOnInit(): void {
    this.init();
  }
  changeCategory(category: Category): void {
    this.router.navigateByUrl('/albums/' + category.pinyin);
  }
  private init(): void {
    combineLatest(
      this.categoryServe.getCategory(),
      this.categoryServe.getSubCategory()
    ).subscribe(([category, subCategory]) => {
      console.log('get category', category);
      if (category !== this.categoryPinyin) {
        this.categoryPinyin = category;
        if (this.categories.length) {
          this.setCurrentCategory();
        }
      }
      this.subCategory = subCategory;
    });
    this.getCategories();
  }

  private getCategories(): void {
    this.albumServe.categories().subscribe(categories => {
      this.categories = categories;
      this.setCurrentCategory();
      this.cdr.markForCheck();
    });
  }

  private setCurrentCategory(): void {
    this.currentCategory = this.categories.find(item => item.pinyin === this.categoryPinyin);
  }
}
