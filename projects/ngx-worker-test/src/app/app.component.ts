import {Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FactoryWorkerComponent} from './worker/factory-worker.component';
import {FactoryWorker} from '../../../ngx-worker/src/lib/service/factory.worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('dynamic', {read: ViewContainerRef})
  readonly dynamic: ViewContainerRef | undefined;
  @ViewChild('lazy', {read: ViewContainerRef})
  readonly lazy: ViewContainerRef | undefined;

  componentRef: ComponentRef<FactoryWorkerComponent> | undefined;
  title = 'ngx-worker-test';

  constructor(private factoryWorker: FactoryWorker,
              private componentFactoryResolver: ComponentFactoryResolver) {
    factoryWorker.error$.subscribe(
      (err: DOMException) => {
        alert(err.message);
      }
    );
  }

  load(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.componentRef = this.factoryWorker.load(
      FactoryWorkerComponent,
      {
        container: this.dynamic?.element.nativeElement
      }
    );
    this.componentRef.instance.close$.subscribe(
      () => {
        this.componentRef?.destroy();
      }
    );
  }

  lazyLoad<C, T>(): void {
    this.lazy?.clear();
    import('./worker/lazy-factory-worker.component').then(
      ({LazyFactoryWorkerComponent}) => {
        const componentRef = this.lazy?.createComponent(
          this.componentFactoryResolver.resolveComponentFactory(LazyFactoryWorkerComponent)
        );
        componentRef?.instance.close$.subscribe(
          () => {
            componentRef.destroy();
            this.lazy?.clear();
          }
        );
      }
    );
  }
}
