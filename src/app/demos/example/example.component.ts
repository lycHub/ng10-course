import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {AlertComponent} from '../components/alert/alert.component';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit {
  private container: AlertComponent;
  private componentRef: ComponentRef<AlertComponent>;
  constructor(
    private cfr: ComponentFactoryResolver,
    private inject: Injector,
    private appRef: ApplicationRef
  ) {
  }

  ngOnInit(): void {

  }

  showAlart() {
    if (!this.container) {
      this.container = this.getContainer();
    }
    this.container.setOptions({ content: '一段提示', theme: 'danger' });
  }

  private getContainer(): AlertComponent {
    // 创建指定类型的组件工厂（生产指定类型的组件）
    const factory = this.cfr.resolveComponentFactory<AlertComponent>(AlertComponent);

    // 根据指定的类型，创建组件的示例
    this.componentRef = factory.create(this.inject);
    // console.log('componentRef location', this.componentRef.location);
    // console.log('componentRef hostview', this.componentRef.hostView);

    // 将组件视图添加到视图树中，以激活变更检测
    this.appRef.attachView(this.componentRef.hostView);

    // 将组件到模版(包括app-alert标签)，添加到body最后
    document.body.appendChild(this.componentRef.location.nativeElement);
    // document.body.appendChild((this.componentRef.hostView as EmbeddedViewRef<{}>).rootNodes[0] as HTMLElement);

    this.componentRef.onDestroy(() => {
      console.log('已经销毁');
    });
    const { instance } = this.componentRef;
    instance.closed.subscribe(() => {
      this.componentRef.destroy();
      this.container = null;
    });
    return instance;
  }
}
