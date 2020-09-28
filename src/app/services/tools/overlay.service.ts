import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private rd2: Renderer2;
  constructor(private rdFactory2: RendererFactory2, @Inject(DOCUMENT) private doc: Document) {
    this.rd2 = rdFactory2.createRenderer(null, null);
  }

  create() {

  }
}
