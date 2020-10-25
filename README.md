@vlah.io/ngx-worker

Set of reusable Angular worker classes.

### API

#### factory.worker.ts

```
  resolve<C>(c: Type<C>, content?: any[][]): ComponentRef<C>;
  build<C>(compRef: ComponentRef<C>): ComponentRef<C>;
  make<C>(c: Type<C>, content?: any[][]): ComponentRef<C>;
  load<C>(c: Type<C>, options: MakeAndAppendInterface = {}): ComponentRef<C>;
  insertBefore<C>(c: Type<C>, options: MakeAndInsertBeforeInterface = {}): ComponentRef<C>;
  prepend<C>(c: Type<C>, options: MakeAndPrependInterface = {}): ComponentRef<C>;
  append<C>(c: Type<C>, options: MakeAndAppendInterface = {}): ComponentRef<C>;
  insertAfter<C>(c: Type<C>, options: MakeAndInsertAfterInterface = {}): ComponentRef<C>;
  destroy<C>(compRef: ComponentRef<C>): void;
  glue<C>(compRef: ComponentRef<C>, options: GluingOptionsInterface): ComponentRef<C>;
  glueBefore(parentNode: any, el: any): void;
  glueAtTheBeginning(parentNode: any, el: any): void;
  glueAtTheEnd(parentNode: any, el: any): void;
  glueAfter(parentNode: any, el: any): void;
```

### Lazy or Dynamically component loading (code example)

```
  ...
  
  @Component({
    ...
  })
  export class AppComponent {
    private componentRef: ComponentRef<FactoryWorkerComponent>;
    ...
  
    @ViewChild('dynamic', {read: ViewContainerRef})
    private dynamic: ViewContainerRef;
    @ViewChild('lazy', {read: ViewContainerRef})
    private lazy: ViewContainerRef;
  
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
      this.componentRef = this.factoryWorker.append(FactoryWorkerComponent, {container: this.dynamic.element.nativeElement});
      this.componentRef.instance.close$.subscribe(
        () => {
          this.componentRef.destroy();
        }
      );
    }
  
    lazyLoad<C, T>(): void {
      this.lazy.clear();
      import('./worker/lazy-factory-worker.component').then(
        ({LazyFactoryWorkerComponent}) => {
          const componentRef = this.lazy.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(LazyFactoryWorkerComponent)
          );
          componentRef.instance.close$.subscribe(
            () => {
              componentRef.destroy();
              this.lazy.clear();
            }
          );
        }
      );
    }
  }
```

### Using factories

```
  {
    provide: FactoryWorker,
    useFactory: FactoryWorkerFactory,
    deps: [
      ComponentFactoryResolver,
      Injector,
      ApplicationRef,
      RendererFactory2
    ]
  }
```

For more details read [here](https://github.com/vlah-io/ngx-worker/blob/master/INSTALLATION.md).
