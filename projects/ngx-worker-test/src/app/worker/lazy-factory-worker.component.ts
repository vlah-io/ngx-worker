import {Component, EventEmitter, NgModule} from '@angular/core';

@Component({
  selector: 'app-lazy-factory-worker',
  templateUrl: './lazy-factory-worker.component.html'
})
export class LazyFactoryWorkerComponent {
  close$: EventEmitter<boolean> = new EventEmitter<boolean>();

  close(): void {
    this.close$.emit(true);
  }
}

@NgModule({
  declarations: [LazyFactoryWorkerComponent]
})
export class LazyFactoryWorkerModule {
}
