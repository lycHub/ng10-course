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
