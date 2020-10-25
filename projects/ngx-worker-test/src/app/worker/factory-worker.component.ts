import {Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-factory-worker',
  template: `
    <div class="card">
      <div class="card-body">
        <button type="button" class="close" aria-label="Close" (click)="close()">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5 class="card-title">Dynamic</h5>
        <p class="card-text">Dynamically loaded component.</p>
        <span class="btn btn-danger btn-sm" (click)="close()">Remove</span>
      </div>
    </div>
  `
})
export class FactoryWorkerComponent {
  close$: EventEmitter<boolean> = new EventEmitter<boolean>();

  close(): void {
    this.close$.emit(true);
  }
}
