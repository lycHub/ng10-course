## vs Promise
Observable和Promise的不同点
1. 可观察对象是声明式的，在被订阅之前，它不会开始执行。承诺是在创建时就立即执行的。这让可观察对象可用于定义那些应该按需执行的菜谱。
```typescript
class AppComponent {
    newPromise() {
      const p = new Promise(resolve => {
        console.log('initial a promise'); // 立即触发
      });
    }
    newObservable() {
      const o = new Observable(subscriber => {
        console.log('initial a newObservable'); // 不触发
      });
    }
}
```

2. 串联
跟第一条类似，只有当调用subscribe方法时，才会执行所有管道函数
```typescript
class AppComponent {
newPromise() {
    const p = new Promise(resolve => {
      resolve(['a', 'b', 'c']);
    }).then(res => {
      console.log('第一个then');
      return res;
    }).then(res => {
      console.log('第2个then');
      return res;
    });
  }
  newObservable() {
    const o = new Observable(subscriber => {
      console.log('initial a newObservable');
      subscriber.next(['a', 'b', 'c']);
    }).pipe(
      map(res => {
        console.log('第一个map');
        return res;
      }),
      map(res => {
        console.log('第2个map');
        return res;
      })
    );  // 不订阅，pipe中的所有函数都不会触发
  }
}
```
3. Observable可以手动取消
```typescript
const sub = interval(1000).subscribe(res => {
  console.log('interval', res);
});
class App {
  cancelObservable() {
      sub.unsubscribe();
  }
}
```
而Promise被解析时自动完成。
