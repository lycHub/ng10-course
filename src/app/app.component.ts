import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlbumService} from './services/apis/album.service';
import {Category} from './services/apis/types';
import {CategoryService} from './services/business/category.service';
import {Router} from '@angular/router';
import {combineLatest, empty, merge, of, Subscription} from 'rxjs';
import {OverlayRef, OverlayService} from './services/tools/overlay.service';
import {pluck, switchMap} from 'rxjs/operators';
import {WindowService} from './services/tools/window.service';
import {UserService} from './services/apis/user.service';
import {storageKeys} from './configs';
import {ContextService} from './services/business/context.service';
import {MessageService} from './share/components/message/message.service';

@Component({
  selector: 'xm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  currentCategory: Category;
  categories: Category[] = [];
  categoryPinyin = '';
  subCategory: string[] = [];
  showLogin = false;
  constructor(
    private albumServe: AlbumService,
    private cdr: ChangeDetectorRef,
    private categoryServe: CategoryService,
    private router: Router,
    private winServe: WindowService,
    private userServe: UserService,
    private contextServe: ContextService,
    private messageServe: MessageService
  ) {

  }

  showMsg(): void {
    const message = this.messageServe.create('一段提示', { showClose: true, type: 'success' });
    // console.log('message', message);
    message.onClose.subscribe(() => {
      console.log('close 回调', message.messageId);
    });
  }

  ngOnInit(): void {
    if (this.winServe.getStorage(storageKeys.remember)) {
      this.userServe.userInfo().subscribe(({ user, token }) => {
        this.contextServe.setUser(user);
        this.winServe.setStorage(storageKeys.auth, token);
      }, error => {
        console.error(error);
        this.clearStorage();
      });
    }
    this.init();
  }
  changeCategory(category: Category): void {
    this.router.navigateByUrl('/albums/' + category.pinyin);
  }
  private init(): void {
    combineLatest(
      this.categoryServe.getCategory(),
      this.categoryServe.getSubCategory()
    ).subscribe(([category, subCategory]) => {
      console.log('get category', category);
      if (category !== this.categoryPinyin) {
        this.categoryPinyin = category;
        if (this.categories.length) {
          this.setCurrentCategory();
        }
      }
      this.subCategory = subCategory;
    });
    this.getCategories();
  }

  private getCategories(): void {
    this.albumServe.categories().subscribe(categories => {
      this.categories = categories;
      this.setCurrentCategory();
      this.cdr.markForCheck();
    });
  }

  private setCurrentCategory(): void {
    this.currentCategory = this.categories.find(item => item.pinyin === this.categoryPinyin);
  }

  logout(): void {
    this.userServe.logout().subscribe(() => {
      this.contextServe.setUser(null);
      this.clearStorage();
      alert('退出成功');
    });
  }
  private clearStorage(): void {
    this.winServe.removeStorage(storageKeys.remember);
    this.winServe.removeStorage(storageKeys.auth);
  }
}
