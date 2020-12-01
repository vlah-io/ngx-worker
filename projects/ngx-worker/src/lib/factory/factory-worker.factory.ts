import {ApplicationRef, ComponentFactoryResolver, Injector, RendererFactory2} from '@angular/core';
import {FactoryWorker} from '../service/factory.worker';

export const FactoryWorkerFactory = (componentFactoryResolver: ComponentFactoryResolver,
                                     injector: Injector,
                                     appRef: ApplicationRef,
                                     rendererFactory: RendererFactory2
): FactoryWorker => new FactoryWorker(componentFactoryResolver, injector, appRef, rendererFactory);
