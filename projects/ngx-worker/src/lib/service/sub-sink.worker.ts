// Copy of this: https://github.com/wardbell/subsink
import {Injectable} from '@angular/core';
import {SubscriptionLike} from '../interface/ngx-worker.interface';

@Injectable({
  providedIn: 'root'
})
export class SubSinkWorker {

  protected subs: SubscriptionLike[] = [];

  constructor() {
  }

  /**
   * Assign subscription to this sink to add it to the tracked subscriptions
   *
   * @example
   *  this.subs.sink = observable$.subscribe(...);
   */
  set sink(subscription: SubscriptionLike) {
    this.subs.push(subscription);
  }

  /**
   * Add subscriptions to the tracked subscriptions
   *
   * @example
   *  this.subs.add(observable$.subscribe(...));
   */
  add(...subscriptions: SubscriptionLike[]) {
    this.subs = this.subs.concat(subscriptions);
  }

  /**
   * Unsubscribe to all subscriptions in ngOnDestroy()
   *
   * @example
   *   ngOnDestroy() {
   *     this.subs.unsubscribe();
   *   }
   */
  unsubscribe() {
    this.subs.forEach((sub: SubscriptionLike): void => {
      if (sub && Object.prototype.toString.call(sub.unsubscribe) === '[object Function]') {
        sub.unsubscribe();
      }
    });
    this.subs = [];
  }
}
