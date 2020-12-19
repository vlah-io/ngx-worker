import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  EventEmitter,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  TemplateRef,
  Type
} from '@angular/core';
import {
  GluingOptionsInterface,
  MakeAndAppendInterface,
  MakeAndInsertAfterInterface,
  MakeAndInsertBeforeInterface,
  MakeAndPrependInterface
} from '../interface/ngx-worker.interface';

// https://brianflove.com/2019/12/13/lazy-load-angular-v9-components/
// https://johnpapa.net/angular-9-lazy-loading-components/
// https://netbasal.com/welcome-to-the-ivy-league-lazy-loading-components-in-angular-v9-e76f0ee2854a
// https://juristr.com/blog/2019/10/lazyload-module-ivy-viewengine/
@Injectable({
  providedIn: 'root'
})
export class FactoryWorker {
  error$: EventEmitter<DOMException> = new EventEmitter<DOMException>();
  private renderer: Renderer2;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // https://medium.com/hackernoon/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
  resolve<C>(c: Type<C>, content?: any[][]): ComponentRef<C> {
    return this.componentFactoryResolver
      .resolveComponentFactory(c)
      .create(this.injector, content || [[]]);
  }

  // https://medium.com/hackernoon/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
  build<C>(compRef: ComponentRef<C>): ComponentRef<C> {
    this.appRef.attachView((compRef.hostView));
    compRef.onDestroy(() => {
      this.appRef.detachView(compRef.hostView);
    });

    return compRef;
  }

  make<C>(c: Type<C>, content?: any[][]): ComponentRef<C> {
    const compRef = this.resolve(c, content);
    this.build(compRef);

    return compRef;
  }

  load<C>(c: Type<C>, options: MakeAndAppendInterface = {}): ComponentRef<C> {
    const {content, container} = options;
    const compRef = this.make(c, content);

    return this.glue(compRef, {container});
  }

  insertBefore<C>(c: Type<C>, options: MakeAndInsertBeforeInterface = {}): ComponentRef<C> {
    const {content, container} = options;
    const compRef = this.make(c, content);

    return this.glue(compRef, {container, before: true});
  }

  prepend<C>(c: Type<C>, options: MakeAndPrependInterface = {}): ComponentRef<C> {
    const {content, container} = options;
    const compRef = this.make(c, content);

    return this.glue(compRef, {container, prepend: true});
  }

  append<C>(c: Type<C>, options: MakeAndAppendInterface = {}): ComponentRef<C> {
    const {content, container} = options;
    const compRef = this.make(c, content);

    return this.glue(compRef, {container, append: true});
  }

  insertAfter<C>(c: Type<C>, options: MakeAndInsertAfterInterface = {}): ComponentRef<C> {
    const {content, container} = options;
    const compRef = this.make(c, content);

    return this.glue(compRef, {container, after: true});
  }

  destroy<C>(compRef: ComponentRef<C>): void {
    if (compRef && Object.prototype.toString.call(compRef.destroy) === '[object Function]') {
      compRef.destroy();
    }
  }

  // https://medium.com/hackernoon/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
  // https://blog.ng-book.com/dynamic-components-with-content-projection-in-angular/
  glue<C>(compRef: ComponentRef<C>, options: GluingOptionsInterface): ComponentRef<C> {
    const el = (compRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const {before, prepend, append, after, container = document.body} = options;
    try {
      switch (true) {
        case before:
          this.glueBefore(container, el);
          break;
        case prepend:
          this.glueAtTheBeginning(container, el);
          break;
        case append:
          this.glueAtTheEnd(container, el);
          break;
        case after:
          this.glueAfter(container, el);
          break;
        default:
          this.glueAtTheEnd(container, el);
      }
    } catch (err) {
      this.error$.emit(err as DOMException);
    }

    return compRef;
  }

  glueBefore(parentNode: any, el: any): void {
    let refChild = parentNode;
    if (parentNode instanceof HTMLBodyElement) {
      refChild = parentNode.firstElementChild;
    } else {
      parentNode = this.renderer.parentNode(parentNode);
    }

    this.renderer.insertBefore(
      parentNode,
      el,
      refChild
    );
  }

  glueAtTheBeginning(parentNode: any, el: any): void {
    let refChild = parentNode;
    if (parentNode instanceof HTMLElement) {
      refChild = parentNode.firstElementChild;
    } else {
      parentNode = this.renderer.parentNode(parentNode);
    }

    this.renderer.insertBefore(
      parentNode,
      el,
      refChild
    );
  }

  glueAtTheEnd(parentNode: any, el: any): void {
    if (parentNode instanceof HTMLElement) {
      this.renderer.appendChild(parentNode, el);
    } else {
      this.glueAfter(parentNode, el);
    }
  }

  glueAfter(parentNode: any, el: any): void {
    const nextSibling = this.renderer.nextSibling(parentNode);
    parentNode = this.renderer.parentNode(parentNode);
    if (nextSibling) {
      this.renderer.insertBefore(
        parentNode,
        el,
        nextSibling
      );
    } else {
      this.glueAtTheEnd(parentNode, el);
    }
  }

  // https://blog.ng-book.com/dynamic-components-with-content-projection-in-angular/
  resolveNgContent<T>(content: Type<T>): any[][] {
    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(null);
      return [viewRef.rootNodes];
    }

    /** Otherwise it's a service */
    return [[
      this.resolve(content).location.nativeElement
    ]];
  }

  // https://netbasal.com/things-worth-knowing-about-dynamic-components-in-angular-166ce136b3eb
  attachOnView(): void {
  }
}
