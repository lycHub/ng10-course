export interface Base<T> {
  ret: number;
  message: string;
  data: T;
}

export interface Category {
  id: number;
  displayName: string;
  pinyin: string;
}

export interface SubCategory {
  id: number;
  displayValue: string;
  code: string;
}

export interface MetaData {
  id: number;
  name: string;
  displayName: string;
  metaValues: MetaValue[];
}

export interface MetaValue {
  id: number;
  code: string;
  displayName: string;
}

export interface Album {
  albumId: number;
  anchorName: string; // 作者名
  coverPath: string;
  isFinished: number; // 1 - 连载中  2 - 已完本
  isPaid: boolean;
  link: string;
  playCount: number;  // 播放数
  title: string;
  trackCount: number; // 章节数
  uid: number;
  vipType: number;
}


export interface User {
  phone: string;
  name: string;
  password: string;
}

export interface TracksInfo {
  trackTotalCount: number;
  tracks: Track[];
}


export interface AlbumInfo {
  albumId: number;
  albumTitle: string;
  cover: string;
  detailRichIntro: string;
  isFinished: number; // 1 - 连载 0 - 完结
  rate: number;
  playCount: number;
  crumbs: {
    // categoryId: 5
    categoryPinyin: string;
    // categoryTitle: "外语"
    // subcategoryCode: "yingyu"
    subcategoryDisplayName: string;
    // subcategoryId: number;
  };
  metas: AlbumInfoMeta[];
}


export interface AlbumInfoMeta {
  metaDataId: number;
  metaValueId: number;
  metaDisplayName: string;
  isSubCategory: boolean;
}

export interface Anchor {
  anchorName: string;
  anchorCover: string;
  anchorTracksCount: number;
  anchorAlbumsCount: number;
  anchorFansCount: number;
  personalIntroduction: string;
  anchorAlbumList: AnchorAlbum[];
}


export interface AnchorAlbum {
  albumId: number;
  albumTitle: number;
  playCount: number;
  cover: string;
}

export interface Track {
  trackId: number;
  index: number;
  playCount: number;
  title: string;
  createDateFormat: string;
  src?: string;
  isPaid?: boolean;
}

export interface RelateAlbum {
  id: number;
  playCount: number;
  title: string;
  coverPath: string;
}

export interface TrackAudio {
  trackId: number;
  canPlay: boolean;
  isPaid: boolean;
  hasBuy: boolean;
  src: string;
}
