contest.service.ts:
```typescript
@Injectable({
  providedIn: 'root'
})
export class ContextService {
  constructor(
    private windowServe: WindowService,
    private userServe: UserService,
    private accountServe: AccountService
  ) { }
  setContext(): Observable<Hero | false> {
    const cacheAuth = this.windowServe.getStorage(AuthKey);
    if (cacheAuth) {
      return this.userServe.user$.pipe(
        mergeMap(user => {
          if (user) {
            return of(user);
          }
          return this.accountServe.account();
        }),
        switchMap(res => {
          let user: Hero;
          if ('token' in res) {
            this.windowServe.setStorage(AuthKey, res.token);
            this.userServe.setUser(res.user);
            user = res.user;
          } else {
            user = res;
          }
          return of(user);
        })
      );
    }
    return of(false);
  }
}

```

app.component:
```typescript
construct() {
  this.contextServe.setContext().pipe(first()).subscribe();
}
```


login-auth.guard:
```typescript
@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  constructor(
    private userServe: UserService,
    private contextServe: ContextService,
    private windowServe: WindowService,
    private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.contextServe.setContext().pipe(
      switchMap(user => {
        if (user) {
          this.router.navigateByUrl('/home/heroes').then(() => {
            this.windowServe.alert('您已登陆，不需要重复登陆');
          });
          return of(false);
        }
        return of(true);
      })
    );
  }
}

```
