import {debounceTime, Observable, SchedulerLike, shareReplay} from 'rxjs';
import {ElementRef} from '@angular/core';
import {isElementRef} from "./utils/is-element-ref";

const DEFAULT_THROTTLE_TIME = 50;

export function supportsIntersectionObserver() {
  return typeof window.IntersectionObserver !== 'undefined';
}

export type IntersectionObserverConfig = {
  /**throttle emissions, defaults to 50*/
  throttleMs?: number;
  /** scheduler to use for throttling */
  scheduler?: SchedulerLike;
}

export function createIntersectionObserver(
  observeElement: ElementRef | Element,
  options?: IntersectionObserverInit,
  cfg?: IntersectionObserverConfig
): Observable<IntersectionObserverEntry[]> {
  if (!supportsIntersectionObserver()) {
    throw new Error('[AngularKit] IntersectionObserver is not supported in this browser');
  }
  const obs$ = new Observable<IntersectionObserverEntry[]>((subscriber) => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      subscriber.next(entries);
    }, options ?? {});

    intersectionObserver.observe(isElementRef(observeElement) ? observeElement.nativeElement : observeElement);

    return () => intersectionObserver.disconnect();
  });

  return obs$.pipe(
    cfg?.throttleMs ? debounceTime(cfg?.throttleMs, cfg?.scheduler) : debounceTime(DEFAULT_THROTTLE_TIME),
    shareReplay({refCount: true, bufferSize: 1})
  );
}
