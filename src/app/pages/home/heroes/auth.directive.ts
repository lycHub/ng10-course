import {Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from '../../../services/user.service';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective implements OnChanges {
  @Input('appAuth') auths: string[] = [];
  private hasView = false;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userServe: UserService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.auths.length) {
      this.userServe.user$.subscribe(user => {
        if (this.auths.includes(user?.role)) {
          this.createView();
        } else {
          if (this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
          }
        }
      });
    } else {
      this.createView();
    }
  }

  createView() {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  }
}
