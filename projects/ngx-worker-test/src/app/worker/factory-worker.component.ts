import {Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-factory-worker',
  templateUrl: './factory-worker.component.html'
})
export class FactoryWorkerComponent {
  close$: EventEmitter<boolean> = new EventEmitter<boolean>();

  close(): void {
    this.close$.emit(true);
  }
}
