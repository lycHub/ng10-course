## 类提供者
上节课演示的就是类提供者的创建和使用
假设有logger类：
```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  logs: string[] = [];
  constructor() { }
  log(message: string) {
    this.logs.push(message);
    console.log(message);
  }
}

```
类提供者，使用useClass在NgModule中提供该服务
```typescript
providers: [
    LoggerService,
    // { provide: LoggerService, useClass: LoggerService } 与上面写法相同
  ]
```

## 提供不同于令牌(provide)的类
```typescript
providers: [
  { provide: LoggerService, useClass: BetterLogger }
]
```

## 别名提供者
useExisting指向的服务一定是已经注册过的，这是和useClass的区别之一
```typescript
providers: [
  UserLoggerService,
  // 如果用useClass, 则会得到两份UserLoggerService实例
  { provide: LoggerService, useExisting: UserLoggerService }
]
```

## 值提供者
对于很简单的值，没必要把它做成一个类，可用useValue提供简单的值
```typescript
providers: [{ provide: Logger, useValue: 'simpleValue' }]
```

## 非类令牌
上面每个provide都是一个类，那么也可以用其它数据类型作为令牌
```typescript
providers: [{ provide: 'httpApi', useValue: '123.com' }]
```
注入方式
```typescript
class AppComponent {
  constructor(@Inject('httpApi') readonly api){}
}
```


## [InjectionToken](https://angular.cn/api/core/InjectionToken#constructor)
一般情况下无法使用ts接口作为令牌

```typescript
interface AppConfig {
  apiEndpoint: string;
  title: string;
}
```
无法用AppConfig作为令牌：
```typescript
[
  {
      provide: AppConfig,
      useValue: {
        apiEndpoint: 'api.heroes.com',
        title: 'Dependency Injection'
      }
}]
```
但又想要限制值的类型，可以借助InjectionToken
```typescript
import { InjectionToken } from '@angular/core';
// 参数是该令牌的一个描述，可选
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

[
  {
      provide: APP_CONFIG,
      useValue: {
        apiEndpoint: 'api.heroes.com',
        title: 'Dependency Injection'
      }
}]
```


注入方式
```typescript
class AppComponent {
  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.title = config.title;
  }
}
```

## 工厂提供者
自定义实例化服务
user-logger.service
```typescript
import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {LoggerService} from './logger.service';

@Injectable()
export class UserLoggerService extends LoggerService {
  constructor(private userService: UserService, extra: string) {
    super();
    console.log('UserLoggerService', extra);
  }
  log(message: string) {
    const name = this.userService.user.name;
    super.log(`Message to ${name}: ${message}`);
  }
}

```

```typescript
{
  provide: UserLoggerService,
  useFactory(userServe: UserService) {
    return new UserLoggerService(userServe, 'factory msg');
  },
  deps: [UserService] // 依赖其它服务的话，要列在这里
}
```
