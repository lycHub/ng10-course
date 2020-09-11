import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlbumService} from './services/apis/album.service';
import {Category} from './services/apis/types';

@Component({
  selector: 'xm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  currentCategory: Category;
  categories: Category[];
  categoryPinyin = 'youshengshu';
  subcategory: string[];
  constructor(private albumServe: AlbumService, private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.init();
  }
  changeCategory(category: Category): void {
    if (this.currentCategory.id !== category.id) {
      this.currentCategory = category;
    }
  }
  private init(): void {
    this.albumServe.categories().subscribe(categories => {
      this.categories = categories;
      this.currentCategory = this.categories.find(item => item.pinyin === this.categoryPinyin);
      this.cdr.markForCheck();
    });
  }
}
