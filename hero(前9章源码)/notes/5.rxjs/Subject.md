## 单播和多播
之前我们看到的所有Observable都是单播的，即源头有值发出时，不管这个Observable被几个Observer订阅，我一次只会给一个Observer推送
<br>
多播：当源头有值发出时，这个值会同一时间发给所有的Observer，
<br>
简单来说，单播与多播的区别类似于，concat和merge的区别

单播：
```typescript
const source$ = range(5);
source$.subscribe(value => console.log('A: ' + value));
source$.subscribe(value => console.log('B: ' + value));
```

多播：
```typescript
const source$ = range(5);
const subject$ = new Subject();
subject$.subscribe(value => console.log('A: ' + value));
subject$.subscribe(value => console.log('B: ' + value));
source$.subscribe(subject$);
```


## 什么是subject?
Subject是一种特殊的Observable，而且是多播的
<br>
既然是Observable，当然可以正常的被subscribe，只不过每个observer都会存在一份list中(这也是多播的原因)，一旦有值发出，每个observer都会同时收到值
<br>
Subject还是Observer，可以执行next(), error(), complete()的方法

下面示范创建一个Subject, 并且有两个Observer订阅它：
```typescript
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

Subject既然也是个Observer，自然可以作为subscribe的参数传入：
```typescript
import { Subject, from } from 'rxjs';

const observable = from([1, 2, 3]);
const subject = new Subject<number>();
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
observable.subscribe(subject); // You can subscribe providing a Subject

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```
上面这个例子，通过Subject将单播的Observable转成了多播的，
这是其中一种方式，rxjs提供了一些多播类的操作符也可以将单播的Observable转成了多播的
