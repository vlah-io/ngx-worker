// Inspired by this: https://github.com/wardbell/subsink
import {ComponentRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompRefSinkWorker<C> {
  protected refs: ComponentRef<C>[] = [];

  constructor() {
  }

  /**
   * Assign component reference to this sink to add it to the tracked instances
   *
   * @example
   *  this.refs.sink = ComponentRef<C>;
   */
  set sink(compRef: ComponentRef<C>) {
    this.refs.push(compRef);
  }

  /**
   * Add component references to the tracked instances
   *
   * @example
   *  this.refs.add(ComponentRef<C>);
   */
  add(...compRefs: ComponentRef<C>[]) {
    this.refs = this.refs.concat(compRefs);
  }

  /**
   * Destroy all instances when required
   */
  destroy() {
    this.refs.forEach((compRef: ComponentRef<C>): void => {
      if (compRef && Object.prototype.toString.call(compRef.destroy) === '[object Function]') {
        compRef.destroy();
      }
    });
    this.refs = [];
  }
}
