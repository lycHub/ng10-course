import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef, EventEmitter,
  HostListener,
  Inject, Input, Output,
  PLATFORM_ID,
  QueryList,
  Renderer2
} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {DragHandlerDirective} from './drag-handler.directive';
import { clamp } from 'lodash';

interface StartPosition {
  x: number;
  y: number;
  left?: number;
  top?: number;
}

@Directive({
  selector: '[xmDrag]'
})
export class DragDirective implements AfterViewInit {
  @Input() limitInWindow = false;
  private startPosition: StartPosition;
  private hostEl: HTMLElement;
  private movable = false;
  private dragMoveHandler: () => void;
  private dragEndHandler: () => void;
  @Output() finished = new EventEmitter<HTMLElement>();
  @ContentChildren(DragHandlerDirective, { descendants: true }) private handlers: QueryList<DragHandlerDirective>;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private doc: Document,
    private el: ElementRef,
    private rd2: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.hostEl = this.el.nativeElement;
    this.setHandlerMouseStyle();
  }

  @HostListener('mousedown', ['$event'])
  dragStart(event: MouseEvent): void {
    if (isPlatformBrowser(this.platformId)) {
      const allowDrag = event.button === 0 && (!this.handlers.length ||
        this.handlers.some(item => item.el.nativeElement.contains(event.target)));
      if (allowDrag) {
        event.preventDefault();
        event.stopPropagation();
        const { left, top } = this.hostEl.getBoundingClientRect();
        this.rd2.setStyle(this.hostEl, 'transition', 'none');
        this.startPosition = {
          x: event.clientX,
          y: event.clientY,
          left,
          top
        };
        this.toggleMoving(true);
      }
    }
  }

  private toggleMoving(movable: boolean): void {
    this.movable = movable;
    if (movable) {
      this.dragMoveHandler = this.rd2.listen(this.doc, 'mousemove', this.dragMove.bind(this));
      this.dragEndHandler = this.rd2.listen(this.doc, 'mouseup', this.dragEnd.bind(this));
    } else {
      if (this.dragMoveHandler) {
        this.dragMoveHandler();
      }
      if (this.dragEndHandler) {
        this.dragEndHandler();
      }
      this.finished.emit(this.hostEl);
    }
  }

  private dragMove(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const diffX = event.clientX - this.startPosition.x;
    const diffY = event.clientY - this.startPosition.y;
    const { left, top } = this.calculate(diffX, diffY);
    this.rd2.setStyle(this.hostEl, 'right', 'unset');
    this.rd2.setStyle(this.hostEl, 'left', left + 'px');
    this.rd2.setStyle(this.hostEl, 'top', top + 'px');
  }

  private calculate(diffX: number, diffY: number): { left: number; top: number } {
    let newLeft = this.startPosition.left + diffX;
    let newTop = this.startPosition.top + diffY;
    if (this.limitInWindow) {
      const { width, height } = this.hostEl.getBoundingClientRect();
      const maxLeft = this.doc.documentElement.clientWidth - width;
      const maxTop = this.doc.documentElement.clientHeight - height;
      newLeft = clamp(newLeft, 0, maxLeft);
      newTop = clamp(newTop, 0, maxTop);
    }
    return {
      left: newLeft,
      top: newTop
    };
  }

  private dragEnd(): void {
    this.toggleMoving(false);
  }

  private setHandlerMouseStyle(): void {
    if (this.handlers.length) {
      this.handlers.forEach(item => this.rd2.setStyle(item.el.nativeElement, 'cursor', 'move'));
    } else {
      this.rd2.setStyle(this.hostEl, 'cursor', 'move');
    }
  }
}
