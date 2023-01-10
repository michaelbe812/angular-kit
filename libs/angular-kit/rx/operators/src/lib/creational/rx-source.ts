import {Observable, ReplaySubject, share, ShareConfig} from 'rxjs';
import {rxDistinctUntilChanged} from '../rx-distinct-until-changed';
import {rxFilterUndefined} from '../rx-filter-undefined';
import {coerceObservable} from '@code-workers.io/angular-kit/coercing';

export function rxSource<T>(
  source: Observable<T> | T,
  cfg?: {
    shareCfg?: ShareConfig<T>;
  }
): Observable<T> {
  return coerceObservable(source).pipe(
    rxFilterUndefined(),
    rxDistinctUntilChanged(),
    share(
      cfg?.shareCfg ?? {
        connector: () => new ReplaySubject<T>(1),
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: false,
      }
    )
  );
}
