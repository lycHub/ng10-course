```typescript
import {Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {first} from 'rxjs/operators';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective implements OnChanges {
  @Input('appAuth') auths: string[] = [];
  constructor(private userServe: UserService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.auths.length) {
      this.userServe.user$.pipe(first()).subscribe(user => {
        if (this.auths.includes(user.role)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}

```
