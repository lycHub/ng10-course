## Observable
Observable负责从数据源中推送数据，类似Promise

```typescript
import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  // 推送三个数据
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
});

console.log('before subscribe');
observable.subscribe(x => {
  console.log('获得 value ' + x);
});
console.log('subscribe');
```

## lazy computations
之前与Promise对比时讲过，只要不订阅(调用subscribe)Observable，Observable的回调函数就不会执行

```typescript
import { Observable } from 'rxjs';

const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
});

foo.subscribe(x => {
  console.log(x);
});
```

## Observable可同步，也可异步 推送值
```typescript
import { Observable } from 'rxjs';

const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
});

console.log('before');
foo.subscribe(x => {
  console.log(x);
});
console.log('after');
```

下面是异步：
```typescript
import { Observable } from 'rxjs';

const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100);
  subscriber.next(200);
  setTimeout(() => {
    subscriber.next(300); // happens asynchronously
  }, 1000);
});

console.log('before');
foo.subscribe(x => {
  console.log(x);
});
console.log('after');
```
output:
```txt
"before"
"Hello"
42
100
200
"after"
300
```


## 创建Observables
可用new Observable创建，但实际情况更多的是用of, from, interval等操作符创建

```typescript
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    // 每秒推送一个 hi
    subscriber.next('hi')
  }, 1000);
});
```

## 订阅Observables
```text
Observable.subscribe(x => console.log(x));
```
之前已经多次订阅过Observables，但都不是完整写法
<br>
Observable.subscribe方法有三个回调函数，上面写的只是其中最常用但一个
- "Next": 接收Observable推送过来但值
- "Error": 接收错误对象
- "Complete": 推送结束时触发(即使出现error)，不会收到任何值


**Observable.subscribe和new Observable(function subscribe(subscriber) {...})
这两个函数都叫subscribe，在程序的角度它们是不同的，但在概念上是相同的**


### 显示的结束推送
```typescript
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  // 不调用complete方法，下面的observable.subscribe就不会输出complete
  subscriber.complete();
  subscriber.next(4); // 结束后再推送值，observable.subscribe也接收不到了
});

observable.subscribe(value => {
  console.log('value', value);
}, error => {
  console.error('error', error);
}, () => {
  console.log('complete');
});
```

### 发生错误
```typescript
const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.error(new Error('出错了'));
});
observable.subscribe(value => {
  console.log('value', value);
}, error => {
  console.error('error err', error);
}, () => {
  console.log('complete');
});
```

可以用try/catch捕获错误
```typescript
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  } catch (err) {
    subscriber.error(err); // delivers an error if it caught one
  }
});
```

### Observable.subscribe的完整写法
```typescript
observable.subscribe(value => {
  console.log('value', value);
}, error => {
  console.error('error err', error);
}, () => {
  console.log('complete');
});
```

```typescript
observable.subscribe({
  next(value) {
    console.log('value', value);
  },
  error(error) {
    console.error('error', error);
  },
  complete() {
    console.log('complete');
  }
});
```

## 取消订阅
observable.subscribe返回一个Subscription对象
```typescript
const subscription = observable.subscribe(x => console.log(x));
```
调用subscription.unsubscribe()即可取消订阅
```typescript
const observable = interval(1000);
const subscription = observable.subscribe(x => console.log(x));
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
```
