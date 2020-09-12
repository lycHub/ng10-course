import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Album, AlbumInfo, Anchor, Base, Category, MetaData, SubCategory, TracksInfo} from './types';

export interface CategoryInfo {
  category: Category;
  currentSubcategory: SubCategory;
  subcategories: SubCategory[];
  metadata: MetaData[];
}

export interface AlbumsInfo {
  albums: Album[];
  page: number;
  pageSize: number;
  total: number;
  pageConfig: { h1title: string };
}

export interface AlbumArgs {
  category: string;
  subcategory: string;
  meta: string;
  sort: number;
  page: number;
  perPage: number;
}

export interface AlbumRes {
  albumId: number;
  mainInfo: AlbumInfo;
  anchorInfo: Anchor;
  tracksInfo: TracksInfo;
}

export interface AlbumTrackArgs {
  albumId: string;
  sort: number;
  pageNum: number;
  pageSize: number;
}


@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  readonly prefix = '/xmly/';
  constructor(private http: HttpClient) {}

  // 一级分类列表
  categories(categoryId = 3): Observable<Category[]> {
    const params = new HttpParams().set('categoryId', categoryId.toString());
    return this.http
      .get(`${environment.baseUrl}${this.prefix}breadcrumb`, { params })
      .pipe(map((res: Base<{ categories: Category[] }>) => res.data.categories));
  }

  // 二三级分类列表
  detailCategoryPageInfo(args: Pick<AlbumArgs, 'category' | 'subcategory'>): Observable<CategoryInfo> {
    return this.http
      .get(`${environment.baseUrl}${this.prefix}categories`, { params: args })
      .pipe(map((res: Base<CategoryInfo>) => res.data));
  }
}
