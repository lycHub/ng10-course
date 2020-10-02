import { Injectable } from '@angular/core';
import {AlbumInfo, Track} from '../apis/types';
import {BehaviorSubject, Observable} from 'rxjs';

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
  constructor() { }

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
      this.currentTrack$.next(track);
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
}
