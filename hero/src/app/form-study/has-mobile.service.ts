import { Injectable } from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {iif, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasMobileService implements AsyncValidator {

  constructor() { }

  validate(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    const random = Math.random();
    console.log('random', random);
    return iif(
      () => random > 0.5,
      of({ exist: '该手机已存在' }),
      of(null)
    );
  }
}
