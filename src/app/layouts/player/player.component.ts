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
  @ViewChild('audio', { static: true }) readonly audioRef: ElementRef;
  constructor(
    private playerServe: PlayerService
  ) { }

  ngOnInit(): void {
    console.log('currentTrack', this.currentTrack);
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

  private updateIndex(index: number): void {
    this.playerServe.setCurrentIndex(index);
    this.canPlay = false;
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
