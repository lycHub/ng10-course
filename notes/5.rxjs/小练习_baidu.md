## 换百度的搜索接口

1. 安装[jsonp-good](https://github.com/rikochyou/jsonp-good)插件
2. 百度接口(https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=32757,1461,32880,32940,32971,32706,7517,32913&wd=n&req=2&csor=1&pwd=li&cb=jQuery110206797386932220344_1604233361406&_=1604233361413)
3. 改逻辑
```typescript
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injectable,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import {from, fromEvent, Observable, of} from 'rxjs';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import { debounceTime, distinctUntilChanged, map, pluck, retry, switchMap, timeout } from 'rxjs/operators';
import jsonpG from 'jsonp-good';
interface JsonpRes {
  q: string;
}

@Injectable()
class WikiService {
  readonly url = 'https://www.baidu.com/sugrec';
  list(wd): Observable<JsonpRes[]> {
    return from(jsonpG({
      url: this.url,
      params: {
        prod: 'pc',
        from: 'pc_web',
        wd
      },
      funcName: 'jQuery110203052522071732855_1604236886158',
    }).then((res: { g: JsonpRes[] }) => {
      return res.g;
    }));
  }
}


@Component({
  selector: 'app-test-rx',
  template: `
    <div class="autocomplete">
      <input #input class="form-control" placeholder="search..." />
      <ul class="list-group mt-2">
        <li class="list-group-item" *ngFor="let item of list">{{ item?.q }}</li>
      </ul>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WikiService]
})
export class TestRxComponent implements OnInit, AfterViewInit {
  list: JsonpRes[] = [];
}
```