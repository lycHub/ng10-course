import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  user = {
    name: '张三',
    phone: '1311111111111'
  }
  constructor() { }
}
