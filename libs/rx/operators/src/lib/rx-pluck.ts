/* tslint:disable:max-line-length */
import {map, OperatorFunction} from "rxjs";

// Original pluck implementation from rxjs which got deprecated in v7.

export function rxPluck<T, K1 extends keyof T>(k1: K1): OperatorFunction<T, T[K1]>;
export function rxPluck<T, K1 extends keyof T, K2 extends keyof T[K1]>(k1: K1, k2: K2): OperatorFunction<T, T[K1][K2]>;
export function rxPluck<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
  k1: K1,
  k2: K2,
  k3: K3
): OperatorFunction<T, T[K1][K2][K3]>;
export function rxPluck<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4
): OperatorFunction<T, T[K1][K2][K3][K4]>;
export function rxPluck<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4]
  >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): OperatorFunction<T, T[K1][K2][K3][K4][K5]>;
export function rxPluck<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5]
  >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): OperatorFunction<T, T[K1][K2][K3][K4][K5][K6]>;
export function rxPluck<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5]
  >(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, ...rest: string[]): OperatorFunction<T, unknown>;
export function rxPluck<T>(...properties: string[]): OperatorFunction<T, unknown>;
/* tslint:enable:max-line-length */

/**
 * Maps each source value to its specified nested property.
 *
 * <span class="informal">Like {@link map}, but meant only for picking one of
 * the nested properties of every emitted value.</span>
 *
 * Given a list of strings or numbers describing a path to a property, retrieves
 * the value of a specified nested property from all values in the source
 * Observable. If a property can't be resolved, it will return `undefined` for
 * that value.
 *
 * ## Example
 *
 * Map every click to the tagName of the clicked target element
 *
 * ```ts
 * import { fromEvent } from 'rxjs';
 * import { rxPluck } from '@angular-kit/rx/operators';
 *
 * const clicks = fromEvent(document, 'click');
 * const tagNames = clicks.pipe(rxPluck('target', 'tagName'));
 *
 * tagNames.subscribe(x => console.log(x));
 * ```
 *
 * @see {@link map}
 *
 * @param properties The nested properties to pluck from each source
 * value.
 * @return A function that returns an Observable of property values from the
 * source values.
 */
export function rxPluck<T, R>(...properties: Array<string | number | symbol>): OperatorFunction<T, R> {
  const length = properties.length;
  if (length === 0) {
    throw new Error('list of properties cannot be empty.');
  }
  return map((x) => {
    let currentProp: any = x;
    for (let i = 0; i < length; i++) {
      const p = currentProp?.[properties[i]];
      if (typeof p !== 'undefined') {
        currentProp = p;
      } else {
        return undefined;
      }
    }
    return currentProp;
  });
}
