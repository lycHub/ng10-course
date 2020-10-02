import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {AlbumInfo, Track} from '../../services/apis/types';

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
  constructor() { }

  ngOnInit(): void {
  }

}
