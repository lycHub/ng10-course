import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {AlbumArgs, AlbumService, CategoryInfo} from '../../services/apis/album.service';
import {MetaData, MetaValue, SubCategory} from '../../services/apis/types';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/business/category.service';
import {combineLatest} from 'rxjs';
import {withLatestFrom} from 'rxjs/operators';

interface CheckedMeta {
  metaRowId: number;
  metaRowName: string;
  metaId: number;
  metaName: string;
}

@Component({
  selector: 'xm-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent implements OnInit {
  searchParams: AlbumArgs = {
    category: '',
    subcategory: '',
    meta: '',
    sort: 0,
    page: 1,
    perPage: 30
  };
  categoryInfo: CategoryInfo;
  checkedMetas: CheckedMeta[] = [];
  constructor(
    private albumServe: AlbumService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private categoryServe: CategoryService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(withLatestFrom(this.categoryServe.getCategory()))
      .subscribe(([paramMap, category]) => {
      const pinyin = paramMap.get('pinyin');
      // console.log('category params', category);
      // console.log('pinyin params', pinyin);
      if (pinyin !== category) {
        this.categoryServe.setCategory(pinyin);
      }
      this.searchParams.category = pinyin;
      this.searchParams.subcategory = '';
      this.categoryServe.setSubCategory([]);
      this.updatePageData();
    });
  }

  changeSubCategory(subCategory?: SubCategory): void {
    console.log('subCategory', subCategory);
    if (this.searchParams.subcategory !== subCategory?.code) {
      this.searchParams.subcategory = subCategory?.code || '';
      this.categoryServe.setSubCategory([subCategory.displayValue]);
      this.updatePageData();
    }
  }

  changeMeta(row: MetaData, meta: MetaValue): void {
    this.checkedMetas.push({
      metaRowId: row.id,
      metaRowName: row.name,
      metaId: meta.id,
      metaName: meta.displayName
    });
    console.log('checkedMetas', this.checkedMetas);
  }

  unCheckMeta(meta: CheckedMeta | 'clear'): void {
    if (meta === 'clear') {
      this.checkedMetas = [];
    } else {
      const targetIndex = this.checkedMetas.findIndex(item => {
        return (item.metaRowId === meta.metaRowId) && (item.metaId === meta.metaId);
      });
      if (targetIndex > -1) {
        this.checkedMetas.splice(targetIndex, 1);
      }
    }
  }

  showMetaRow(name: string): boolean {
    if (this.checkedMetas.length) {
      return this.checkedMetas.findIndex(item => item.metaRowName === name) === -1;
    }
    return true;
  }

  private updatePageData(): void {
    this.albumServe.detailCategoryPageInfo(this.searchParams).subscribe(categoryInfo => {
      // console.log('categoryInfo', categoryInfo);
      this.categoryInfo = categoryInfo;
      this.cdr.markForCheck();
    });
  }

  trackBySubCategories(index: number, item: SubCategory): string { return item.code; }
  trackByMetas(index: number, item: MetaValue): number { return item.id; }
}
