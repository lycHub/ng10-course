import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlbumService, AlbumTrackArgs} from '../../services/apis/album.service';
import {combineLatest, forkJoin, Subject} from 'rxjs';
import {CategoryService} from '../../services/business/category.service';
import {AlbumInfo, Anchor, RelateAlbum, Track} from '../../services/apis/types';
import {IconType} from '../../share/directives/icon/type';
import {first, takeUntil} from 'rxjs/operators';
import {PlayerService} from '../../services/business/player.service';
import {MessageService} from '../../share/components/message/message.service';

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
export class AlbumComponent implements OnInit, OnDestroy {
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
  private playing = false;
  private currentTrack: Track;
  private destory$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private albumServe: AlbumService,
    private categoryServe: CategoryService,
    private cdr: ChangeDetectorRef,
    private playerServe: PlayerService,
    private messageServe: MessageService
  ) { }

  playAll(): void {
    console.log(this.tracks);
    this.playerServe.setTracks(this.tracks);
    this.playerServe.setCurrentIndex(0);
    this.playerServe.setAlbum(this.albumInfo);
  }

  toggleTrack(track: Track, act: 'play' | 'pause'): void {
    if (act === 'pause') {
      this.playerServe.setPlaying(false);
    } else {
      this.setAlbumInfo();
      this.playerServe.playTrack(track);
    }
  }

  play(needPlay): void {
    if (this.selectedTracks.length) {
      if (needPlay) {
        this.playerServe.playTracks(this.selectedTracks);
      } else {
        this.playerServe.addTracks(this.selectedTracks);
        this.messageServe.info('已添加');
      }
      this.setAlbumInfo();
      this.checkAllChange(false);
    } else {
      this.messageServe.warning('未选中任何曲目');
    }
  }

  private setAlbumInfo(): void {
    if (!this.currentTrack) {
      this.playerServe.setAlbum(this.albumInfo);
    }
  }

  itemCls(id: number): string {
    // console.log('currentTrack', this.currentTrack);
    let result = 'item-name ';
    if (this.currentTrack) {
      if (this.playing) {
        if (this.currentTrack.trackId === id) {
          result += 'item-name-playing';
        }
      } else {
        if (this.currentTrack.trackId === id) {
          result += 'item-name-pause';
        }
      }
    }
    return result;
  }

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
    // console.log('selectedTracks', this.selectedTracks);
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
    this.route.paramMap.pipe(takeUntil(this.destory$)).subscribe(paramMap => {
      this.trackParams.albumId = paramMap.get('albumId');
      this.initPageData();
      this.watchPlayer();
    });
  }
  private watchPlayer(): void {
    combineLatest(
      this.playerServe.getCurrentTrack(),
      this.playerServe.getPlaying()
    ).pipe(takeUntil(this.destory$)).subscribe(([track, playing]) => {
      this.currentTrack = track;
      this.playing = playing;
      this.cdr.markForCheck();
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
    ]).pipe(first()).subscribe(([albumInfo, score, relateAlbums]) => {
      // console.log('albumInfo', albumInfo);
      // console.log('score', score);
      // console.log('relateAlbum', relateAlbum);
      this.albumInfo = { ...albumInfo.mainInfo, albumId: albumInfo.albumId };
      this.score = score / 2;
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
  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
