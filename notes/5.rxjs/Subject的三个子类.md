## BehaviorSubject
BehaviorSubject可以储存最新发送的一个值，只要有新的Observer订阅，就立马推送当前的最新值

先来看一个Subject的例子：
```typescript
const subject = new Subject();
const observerA = {
  next: value => console.log('A next: ' + value),
  error: error => console.log('A error: ' + error),
  complete: () => console.log('A complete!')
}

const observerB = {
  next: value => console.log('B next: ' + value),
  error: error => console.log('B error: ' + error),
  complete: () => console.log('B complete!')
}
subject.subscribe(observerA);
subject.next(1);
subject.next(2);
subject.next(3);

setTimeout(() => {
  // 在这里subject已不再next()推送值，所以在这也订阅不到东西
  subject.subscribe(observerB);
}, 3000);
```
想要定时器里的observerB拿到最新值，只需改用BehaviorSubject
BehaviorSubject必须指定一个初始值：
```typescript
const subject = new BehaviorSubject(0); // 初始值为 0，相当于next(0)
```

下面是官网的例子：
```typescript
import { BehaviorSubject } from 'rxjs';
const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(3);

// Logs
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

## ReplaySubject
ReplaySubject可以指定推送最近的多少个值给新的Observer，而BehaviorSubject只会推最近的一个值
<br>
第一个参数设置数量
```typescript
const subject = new ReplaySubject(100, 500);
const observerA = {
  next: value => console.log('A next: ' + value),
  error: error => console.log('A error: ' + error),
  complete: () => console.log('A complete!')
}

const observerB = {
  next: value => console.log('B next: ' + value),
  error: error => console.log('B error: ' + error),
  complete: () => console.log('B complete!')
}

subject.subscribe(observerA);
subject.next(1);
subject.next(2);
subject.next(3);

setTimeout(() => {
  subject.subscribe(observerB);
}, 3000);
```
官网的例子：
```typescript
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(3); // buffer 3 values for new subscribers

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(5);
```


还可以指定第二个参数， 设置缓存的有效期，单位ms
```typescript
// 缓存3个值，并且只在5秒内有效，超过5秒新的Observer将不会订阅的任何值
const subject = new ReplaySubject(3, 5000 /* windowTime */);
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
range(5).subscribe(value => subject.next(value));

setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
}, 6000);
```

## AsyncSubject
只在Subject结束时，推送最后一个值
```typescript
import { AsyncSubject } from 'rxjs';
const subject = new AsyncSubject();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(5);
subject.complete();

// Logs:
// observerA: 5
// observerB: 5
```
