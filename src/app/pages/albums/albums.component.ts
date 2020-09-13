import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {AlbumArgs, AlbumService, AlbumsInfo, CategoryInfo} from '../../services/apis/album.service';
import {MetaData, MetaValue, SubCategory} from '../../services/apis/types';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/business/category.service';
import {combineLatest, forkJoin} from 'rxjs';
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
  albumsInfo: AlbumsInfo;
  sorts = ['综合排序', '最近更新', '播放最多'];
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
      this.unCheckMeta('clear');
      this.updatePageData();
    });
  }

  changeSubCategory(subCategory?: SubCategory): void {
    console.log('subCategory', subCategory);
    if (this.searchParams.subcategory !== subCategory?.code) {
      this.searchParams.subcategory = subCategory?.code || '';
      this.categoryServe.setSubCategory([subCategory.displayValue]);
      this.unCheckMeta('clear');
      this.updatePageData();
    }
  }

  changeMeta(row: MetaData, meta: MetaValue): void {
    // row.id_meta.id-
    this.checkedMetas.push({
      metaRowId: row.id,
      metaRowName: row.name,
      metaId: meta.id,
      metaName: meta.displayName
    });
    this.searchParams.meta = this.getMetaParams();
    // console.log('checkedMetas', this.checkedMetas);
    this.updateAlbums();
  }

  unCheckMeta(meta: CheckedMeta | 'clear'): void {
    if (meta === 'clear') {
      this.checkedMetas = [];
      this.searchParams.meta = '';
    } else {
      const targetIndex = this.checkedMetas.findIndex(item => {
        return (item.metaRowId === meta.metaRowId) && (item.metaId === meta.metaId);
      });
      if (targetIndex > -1) {
        this.checkedMetas.splice(targetIndex, 1);
        this.searchParams.meta = this.getMetaParams();
      }
    }
    this.updateAlbums();
  }

  private getMetaParams(): string {
    let result = '';
    if (this.checkedMetas.length) {
      this.checkedMetas.forEach(item => {
        result += item.metaRowId + '_' + item.metaId + '-';
      });
    }
    console.log('meta params', result.slice(0, -1));
    return result.slice(0, -1);
  }

  changeSort(index: number): void {
    if (this.searchParams.sort !== index) {
      this.searchParams.sort = index;
      this.updateAlbums();
    }
  }

  showMetaRow(name: string): boolean {
    if (this.checkedMetas.length) {
      return this.checkedMetas.findIndex(item => item.metaRowName === name) === -1;
    }
    return true;
  }

  private updatePageData(): void {
    forkJoin([
      this.albumServe.albums(this.searchParams),
      this.albumServe.detailCategoryPageInfo(this.searchParams)
    ]).subscribe(([albumsInfo, categoryInfo]) => {
      this.categoryInfo = categoryInfo;
      console.log('AlbumInfo', albumsInfo);
      this.albumsInfo = albumsInfo;
      this.cdr.markForCheck();
    });
  }

  private updateAlbums(): void {
    this.albumServe.albums(this.searchParams).subscribe(albumsInfo => {
      this.albumsInfo = albumsInfo;
      this.cdr.markForCheck();
    });
  }

  trackBySubCategories(index: number, item: SubCategory): string { return item.code; }
  trackByMetas(index: number, item: MetaValue): number { return item.id; }
}
