layout.scss:
```scss
.overlay-container {
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  &.overlay-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .overlay-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: auto;
    transition: opacity .3s cubic-bezier(.25,.8,.25,1);
    opacity: 0;
    //background-color: rgba(0,0,0,.32);
    &.overlay-mask-show {
      opacity: 1;
    }
  }
}
```

调用：
```typescript
class App {
  create() {
      if (this.overlay) {
        this.dispose();
      }
      this.overlay = this.overlayServe.create({ center: true, fade: true, backgroundColor: 'rgba(0,0,0,.32)' });
      this.rd2.appendChild(this.overlay.overlayElement, this.el.nativeElement);
      merge(
        this.overlay.backdropClick(),
        this.overlay.keyupEvents().pipe(
          pluck('key'),
          switchMap(key => {
            return key.toUpperCase() === 'ESCAPE' ? of(key) : empty();
          })
        )
      ).subscribe(() => this.hide.emit());
      this.visible = true;
    }
}
```
