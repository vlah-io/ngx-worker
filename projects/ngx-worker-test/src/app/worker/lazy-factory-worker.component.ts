import {Component, EventEmitter, NgModule} from '@angular/core';

@Component({
  selector: 'app-lazy-factory-worker',
  template: `
    <div class="card">
      <div class="card-body">
        <button type="button" class="close" aria-label="Close" (click)="close()">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5 class="card-title">Lazy</h5>
        <p class="card-text">Lazy loaded component.</p>
        <span class="btn btn-danger btn-sm" (click)="close()">Remove</span>
      </div>
    </div>
  `
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
