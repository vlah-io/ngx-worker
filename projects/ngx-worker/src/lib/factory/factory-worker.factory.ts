import {ApplicationRef, ComponentFactoryResolver, Injector, RendererFactory2} from '@angular/core';
import {FactoryWorker} from '../service/factory.worker';

export function FactoryWorkerFactory(componentFactoryResolver: ComponentFactoryResolver,
                                     injector: Injector,
                                     appRef: ApplicationRef,
                                     rendererFactory: RendererFactory2
): FactoryWorker {
  return new FactoryWorker(componentFactoryResolver, injector, appRef, rendererFactory);
}
