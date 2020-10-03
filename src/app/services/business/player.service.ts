import { Injectable } from '@angular/core';
import {AlbumInfo, Track} from '../apis/types';
import {BehaviorSubject, Observable} from 'rxjs';
import {AlbumService} from '../apis/album.service';
import {MessageService} from '../../share/components/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private trackList: Track[] = [];
  private currentIndex = 0;
  private playing = false;
  private trackList$ = new BehaviorSubject<Track[]>([]);
  private currentIndex$ = new BehaviorSubject<number>(0);
  private currentTrack$ = new BehaviorSubject<Track>(null);
  private album$ = new BehaviorSubject<AlbumInfo>(null);
  private playing$ = new BehaviorSubject<boolean>(false);
  constructor(
    private albumServe: AlbumService,
    private messageServe: MessageService
  ) { }

  setTracks(tracks: Track[]): void {
    this.trackList = tracks;
    this.trackList$.next(tracks);
  }

  getTracks(): Observable<Track[]> {
    return this.trackList$.asObservable();
  }

  setCurrentIndex(index: number): void {
    this.currentIndex$.next(index);
    this.setCurrentTrack(this.trackList[index]);
  }

  getCurrentIndex(): Observable<number> {
    return this.currentIndex$.asObservable();
  }

  setCurrentTrack(track: Track): void {
    if (track) {
      const target = this.trackList.find(item => item.trackId === track.trackId);
      if (target) {
        if (target.src) {
          this.currentTrack$.next(track);
        } else {
          this.getAudio(track);
        }
      } else {
        this.getAudio(track);
      }
    } else {
      this.currentTrack$.next(null);
    }
  }

  getCurrentTrack(): Observable<Track> {
    return this.currentTrack$.asObservable();
  }

  setPlaying(playing: boolean): void {
    this.playing$.next(playing);
  }

  getPlaying(): Observable<boolean> {
    return this.playing$.asObservable();
  }

  setAlbum(album: AlbumInfo): void {
    this.album$.next(album);
  }

  getAlbum(): Observable<AlbumInfo> {
    return this.album$.asObservable();
  }

  private getAudio(track: Track): void {
    this.albumServe.trackAudio(track.trackId).subscribe(audio => {
      // console.log('audio', audio);
      if (!audio.src && audio.isPaid) {
        this.messageServe.warning('请先购买专辑');
      } else {
        track.src = audio.src;
        track.isPaid = audio.isPaid;
        this.currentTrack$.next(track);
      }
    });
  }

  clear(): void {
    this.setAlbum(null);
    this.setPlaying(false);
    this.setTracks([]);
    this.setCurrentIndex(0);
    this.setCurrentTrack(null);
  }
}
