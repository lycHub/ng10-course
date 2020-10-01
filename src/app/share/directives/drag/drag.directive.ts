import {AfterViewInit, Directive, ElementRef, HostListener, Inject, PLATFORM_ID, Renderer2} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

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
  private startPosition: StartPosition;
  private hostEl: HTMLElement;
  private movable = false;
  private dragMoveHandler: () => void;
  private dragEndHandler: () => void;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private doc: Document,
    private el: ElementRef,
    private rd2: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.hostEl = this.el.nativeElement;
  }

  @HostListener('mousedown', ['$event'])
  dragStart(event: MouseEvent): void {
    if (isPlatformBrowser(this.platformId)) {
      event.preventDefault();
      event.stopPropagation();
      const { left, top } = this.hostEl.getBoundingClientRect();
      this.startPosition = {
        x: event.clientX,
        y: event.clientY,
        left,
        top
      };
      this.toggleMoving(true);
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
    }
  }

  private dragMove(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const diffX = event.clientX - this.startPosition.x;
    const diffY = event.clientY - this.startPosition.y;
    const { left, top } = this.calculate(diffX, diffY);
    this.rd2.setStyle(this.hostEl, 'left', left + 'px');
    this.rd2.setStyle(this.hostEl, 'top', top + 'px');
  }

  private calculate(diffX: number, diffY: number): { left: number; top: number } {
    let newLeft = this.startPosition.left + diffX;
    let newTop = this.startPosition.top + diffY;
    return {
      left: newLeft,
      top: newTop
    };
  }

  private dragEnd(): void {
    this.toggleMoving(false);
  }
}
