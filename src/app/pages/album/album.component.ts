import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlbumService, AlbumTrackArgs} from '../../services/apis/album.service';
import {forkJoin} from 'rxjs';
import {CategoryService} from '../../services/business/category.service';
import {AlbumInfo, Anchor, RelateAlbum, Track} from '../../services/apis/types';
import {IconType} from '../../share/directives/icon/type';
import {first} from 'rxjs/operators';

interface MoreState {
  full: boolean;
  label: string;
  icon: IconType;
}
@Component({
  selector: 'xm-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumComponent implements OnInit {
  albumInfo: AlbumInfo;
  score: number;
  anchor: Anchor;
  relateAlbums: RelateAlbum[];
  tracks: Track[] = [];
  selectedTracks: Track[] = [];
  total = 0;
  trackParams: AlbumTrackArgs = {
    albumId: '',
    sort: 1,
    pageNum: 1,
    pageSize: 30
  };
  moreState: MoreState = {
    full: false,
    label: '显示全部',
    icon: 'arrow-down-line'
  }
  articleHeight: number;
  constructor(
    private route: ActivatedRoute,
    private albumServe: AlbumService,
    private categoryServe: CategoryService,
    private cdr: ChangeDetectorRef
  ) { }

  toggleMore(): void {
    this.moreState.full = !this.moreState.full;
    if (this.moreState.full) {
      this.moreState.label = '收起';
      this.moreState.icon = 'arrow-up-line';
    } else {
      this.moreState.label = '显示全部';
      this.moreState.icon = 'arrow-down-line';
    }
  }
  checkedChange(checked: boolean, track: Track): void {
    const targetIndex = this.selectedIndex(track.trackId);
    if (checked) {
      if (targetIndex === -1) {
        this.selectedTracks.push(track);
      }
    } else {
      if (targetIndex > -1) {
        this.selectedTracks.splice(targetIndex, 1);
      }
    }
    console.log('selectedTracks', this.selectedTracks);
  }
  isChecked(id: number): boolean {
    return this.selectedIndex(id) > -1;
  }

  checkAllChange(checked): void {
    this.tracks.forEach(item => {
      const targetIndex = this.selectedIndex(item.trackId);
      if (checked) {
        if (targetIndex === -1) {
          this.selectedTracks.push(item);
        }
      } else {
        if (targetIndex > -1) {
          this.selectedTracks.splice(targetIndex, 1);
        }
      }
    });
  }

  isCheckedAll(): boolean {
    if (this.selectedTracks.length >= this.tracks.length) {
      return this.tracks.every(item => {
        return this.selectedIndex(item.trackId) > -1;
      });
    }
    return false;
  }

  private selectedIndex(id: number): number {
    return this.selectedTracks.findIndex(item => item.trackId === id);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.trackParams.albumId = paramMap.get('albumId');
      this.initPageData();
    });
  }
  changePage(page: number): void {
    if (this.trackParams.pageNum !== page) {
      this.trackParams.pageNum = page;
      this.updateTracks();
    }
  }
  updateTracks(): void {
    this.albumServe.tracks(this.trackParams).subscribe(res => {
      this.tracks = res.tracks;
      this.total = res.trackTotalCount;
      this.cdr.markForCheck();
    });
  }
  private initPageData(): void {
    forkJoin([
      this.albumServe.album(this.trackParams.albumId),
      this.albumServe.albumScore(this.trackParams.albumId),
      this.albumServe.relateAlbums(this.trackParams.albumId),
    ]).subscribe(([albumInfo, score, relateAlbums]) => {
      // console.log('albumInfo', albumInfo);
      // console.log('score', score);
      // console.log('relateAlbum', relateAlbum);
      this.albumInfo = { ...albumInfo.mainInfo, albumId: albumInfo.albumId };
      this.score = score;
      this.anchor = albumInfo.anchorInfo;
      // this.tracks = albumInfo.tracksInfo.tracks;
      // this.total = albumInfo.tracksInfo.trackTotalCount;
      this.updateTracks();
      this.relateAlbums = relateAlbums.slice(0, 10);
     /* const category = localStorage.getItem('categoryPinyin');
      const { categoryPinyin } = this.albumInfo.crumbs;
      if (category !== categoryPinyin) {
        this.categoryServe.setCategory(categoryPinyin);
      }*/
      this.categoryServe.getCategory().pipe(first()).subscribe(category => {
        const { categoryPinyin } = this.albumInfo.crumbs;
        if (category !== categoryPinyin) {
          this.categoryServe.setCategory(categoryPinyin);
        }
      });
      this.categoryServe.setSubCategory([this.albumInfo.albumTitle]);
      this.cdr.markForCheck();
    });
  }

  trackByTracks(index: number, item: Track): number { return item.trackId; }
}
