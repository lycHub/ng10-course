/src/share/components/message/message.component.html:
```angular2html
<div class="xm-message-container">
  <div class="xm-message-wrap">
    <div class="xm-message clearfix">
      <div class="content">
        <ng-container>content</ng-container>
      </div>
      <i xmIcon="Close" class="close"></i>
    </div>
  </div>
</div>
```


/src/share/components/message/message.component.scss:
```scss
.xm-message-container {
  position: fixed;
  top: 16px;
  left: 0;
  z-index: 100;
  width: 100%;
  color: rgba(0,0,0,.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-feature-settings: "tnum";
  pointer-events: none;
  user-select: none;
  .xm-message-wrap {
    margin-top: -12px;
    text-align: center;
    padding: 8px;
    &:hover {
      .xm-message {
        transform: scale(1.04);
      }
    }
    .xm-message {
      display: inline-block;
      padding: 8px 12px;
      background-color: #2b85e4;
      color: #fff;
      box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
      pointer-events: auto;
      transition: transform .2s;
      .content {
        float: left;
        margin-right: 12px;
      }
      .close {
        float: right;
        cursor: pointer;
      }
      &.success {
        background-color: #19be6b;
      }
      &.warning {
        background-color: #ff9900;
      }
      &.error {
        background-color: #ed4014;
      }
    }
  }
}

```

