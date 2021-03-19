## 什么是Operator
之前讲过什么是函数试编程，那么Operator就是一个个的函数，所以这些函数都具有函数式的特点：
- 都有返回值
- 不会对元数据产生副作用

即每个操作符(函数), 在拿到原Observable对象后，经过处理，都是返回一个新的Observable
比如下面这个自定义map函数：
```typescript
const people = of('Jerry', 'Anna');
function map(source, callback) {
  return new Observable(observer => {
    return source.subscribe(
      value => {
        try{
          observer.next(callback(value));
        } catch (e) {
          observer.error(e);
        }
      },
      (err) => { observer.error(err); },
      () => { observer.complete(); }
    );
  });
}

const helloPeople = map(people, (item) => item + ' Hello~');
helloPeople.subscribe(res => {
  console.log('res', res);
});
```

这个map函数符合函数式的特点，在rxjs中，可称它为一个操作符(operator)

## Operator分类
- 管道操作符：filter, take...
- 创建类操作符：of，from...


## Marble diagrams
异步往往是复杂的，尤其是多个异步结合在一起的逻辑，用文字难以表达
所以出现了一种叫Marble diagrams的图形表示法，协助理解各種 operators！
参考：
- [30 天精通 RxJS (07)](https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-07/)
- [rxmarbles](https://rxmarbles.com/)
