context Service:
```typescript
export class ContextService {

  constructor(
    private userServe: UserService,
    private windowServe: WindowService,
    private accountServe: AccountService
  ) { }

  setContext(): Observable<false | Hero> {
    const authKey = this.windowServe.getStorage(AuthKey);
    return new Observable(subscriber => {
      if (authKey) {
       this.userServe.user$.pipe(switchMap(user => {
          if (user) {
            return of(user);
          }
          return this.accountServe.account();
        })).subscribe(res => {
         let user: Hero;
         if ('token' in res) {
            this.windowServe.setStorage(AuthKey, res.token);
            this.userServe.setUser(res.user);
            user = res.user;
          } else {
            user = res;
          }
         subscriber.next(user);
       });
      } else {
        return subscriber.next(false);
      }
      subscriber.complete();
    });
  }
}
```


app.component:
```typescript
 constructor(
    private router: Router,
    private userServe: UserService,
    private windowServe: WindowService,
    private contextServe: ContextService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      switchMap(() => {
        return this.contextServe.setContext();
      })
    ).subscribe(res => {
      console.log('set context', res);
    });
  }
```


hero-auth.guard:
```typescript
export class HeroAuthGuard implements CanActivate {
  constructor(
    private userServe: UserService,
    private windowServe: WindowService,
    private contextServe: ContextService,
    private accountServe: AccountService,
    private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const auths: string[] = next.data.auths;
    return this.contextServe.setContext().pipe(
      switchMap(user => {
        if (user) {
          if (auths.includes(user.role)) {
            return of(true);
          } else {
            this.router.navigateByUrl('/no-auth').then(() => {
              this.windowServe.alert('无权限，请联系管理员');
            });
            return of(false);
          }
        }
        this.accountServe.redirectTo = state.url;
        this.router.navigateByUrl('/login').then(() => {
          this.windowServe.alert('请先登陆');
        });
        return of(false);
      })
    );
  }
}
```
