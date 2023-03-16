# @angular-kit/signal

> **Warning**
> The term `signal` which is used here does nothing have in common with Angular's signals shipping with version 16! 
> The `signal` in this package is an abstraction of RxJs subjects.

Reduce boilerplate code when working with RxJS subjects.

- 🦥 lazy by default
- ✅ reduce boilerplate
- ✅ [no late subscriber problem](https://trilon.io/blog/dealing-with-late-subscribers-in-rxjs)

The package includes two functions for creating signals:
- `createSignal` - creates a signal with a single value
- `createSignals` - creates multiple signals from a type definition

## Usage

### `createSignal`

```typescript
import { createSignal } from '@angular-kit/signal';
import { Component } from '@angular/core';
import { scan } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="signal.send(1)">Click me</button>

    <div *ngIf="signalValue$ | async as value">
      {{ value }}
    </div>
  `,
})
export class AppComponent {
  signal = createSignal<number>();

  signalValue$ = this.signal.$.pipe(scan((acc, value) => acc + value, 0));
}
```

### Use `createSignal` together with @Input()

```typescript
import { createSignal } from '@angular-kit/signal';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-some',
  template: `
    <div *ngIf="signal.$ | async as value">
      {{ value }}
    </div>
  `,
})
export class SomeComponent {
  signal = createSignal<number>();

  @Input()
  set value(value: number) {
    this.signal.send(value);
  }
}
```

### `createSignals`

```typescript
import { createSignals } from '@angular-kit/signal';
import { Component } from '@angular/core';
import { scan } from 'rxjs';

interface SomeSignals {
  value: number;
}
@Component({
  selector: 'app-root',
  template: `
    <button (click)="signals.value(1)">Click me</button>

    <div *ngIf="signalValue$ | async as value">
      {{ value }}
    </div>
  `,
})
export class AppComponent {
  signals = createSignals<SomeSignals>();

  signalValue$ = this.signals.value$.pipe(scan((acc, value) => acc + value, 0));
}
```
