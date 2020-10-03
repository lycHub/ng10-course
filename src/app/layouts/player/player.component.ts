import {Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef} from '@angular/core';
import {AlbumInfo, Track} from '../../services/apis/types';
import {PlayerService} from '../../services/business/player.service';

@Component({
  selector: 'xm-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
  @Input() trackList: Track[] = [];
  @Input() currentIndex = 0;
  @Input() currentTrack: Track;
  @Input() album: AlbumInfo;
  @Input() playing = false;
  private canPlay = false;
  private audioEl: HTMLAudioElement;
  hidePanel = true;
  @ViewChild('audio', { static: true }) readonly audioRef: ElementRef;
  constructor(
    private playerServe: PlayerService
  ) { }

  ngOnInit(): void {
    console.log('currentTrack', this.currentTrack);
  }

  prev(index: number): void {
    if (this.trackList.length === 1) {
      this.loop();
    } else {
      const newIndex = index < 0 ? this.trackList.length - 1 : index;
      this.updateIndex(newIndex);
    }
  }

  next(index: number): void {
    // if (!this.canPlay) {
    //   return;
    // }
    if (this.trackList.length === 1) {
      this.loop();
    } else {
      const newIndex = index > this.trackList.length - 1 ? 0 : index;
      this.updateIndex(newIndex);
    }
  }

  togglePlay(): void {
    if (this.currentTrack) {
      if (this.canPlay) {
        const playing = !this.playing;
        this.playerServe.setPlaying(playing);
        if (playing) {
          this.audioEl.play();
        } else {
          this.audioEl.pause();
        }
      }
    } else {
      if (this.trackList.length) {
        this.updateIndex(0);
      }
    }
  }

  changePlay(index: number): void {
    if (this.currentIndex !== index) {
      this.updateIndex(index);
    }
  }

  private loop(): void {
    this.audioEl.currentTime = 0;
    this.play();
  }

  togglePanel(hide: boolean): void {
    this.hidePanel = hide;
  }

  private updateIndex(index: number, canPlay = false): void {
    this.playerServe.setCurrentIndex(index);
    this.canPlay = canPlay;
  }

  canplay(): void {
    this.canPlay = true;
    this.play();
  }

  private play(): void {
    if (!this.audioEl) {
      this.audioEl = this.audioRef.nativeElement;
    }
    this.audioEl.play();
    this.playerServe.setPlaying(true);
  }

  ended(): void {

  }
  error(): void {
    this.playerServe.setPlaying(false);
  }

  trackByTracks(index: number, item: Track): number {
    return item.trackId;
  }
}
