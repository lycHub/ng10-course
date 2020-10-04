import { Injectable } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private title: Title, private meta: Meta) { }

  setPageInfo(title: string, metaDesc: string, keywords: string): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'description', content: metaDesc });
  }
}
