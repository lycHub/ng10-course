import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlbumService} from './services/apis/album.service';
import {Category} from './services/apis/types';
import {CategoryService} from './services/business/category.service';
import {Router} from '@angular/router';
import {combineLatest, empty, merge, of, Subscription} from 'rxjs';
import {OverlayRef, OverlayService} from './services/tools/overlay.service';
import {pluck, switchMap} from 'rxjs/operators';

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
  private overlayRef: OverlayRef;
  private overlaySub: Subscription;
  constructor(
    private albumServe: AlbumService,
    private cdr: ChangeDetectorRef,
    private categoryServe: CategoryService,
    private router: Router,
    private overlayServe: OverlayService
  ) {

  }

  showOverlay(): void {
    this.overlayRef = this.overlayServe.create({ fade: true, responseEvent: false, backgroundColor: 'rgba(0,0,0,.32)' });
    // console.log('overlayRef', this.overlayRef);
    this.overlaySub = merge(
      this.overlayRef.backdropClick(),
      this.overlayRef.backdropKeyup().pipe(
        pluck('key'),
        switchMap(key => {
          return key.toUpperCase() === 'ESCAPE' ? of(key) : empty();
        })
      )
    ).subscribe(() => {
      this.hideOverlay();
    });
  }

  hideOverlay(): void {
    if (this.overlaySub) {
      this.overlaySub.unsubscribe();
      this.overlaySub = null;
    }
    this.overlayRef.dispose();
    this.overlayRef = null;
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
