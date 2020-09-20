import {Component, OnInit, ChangeDetectionStrategy, Inject, ElementRef, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {User} from '../../services/apis/types';
import {DOCUMENT} from '@angular/common';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'xm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('moveUpMotion', [
      state('1', style({
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1
      })),
      transition('* => 1', [
        style({
          transform: 'translateY(-100%)',
          opacity: 0
        }),
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user: User;
  fix = false;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent(this.doc, 'scroll')
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        const top = this.doc.documentElement.scrollTop;
        if (top > this.el.nativeElement.clientHeight + 100) {
          this.fix = true;
        } else if (top === 0) {
          this.fix = false;
        }
        this.cdr.markForCheck();
      });
  }

}
