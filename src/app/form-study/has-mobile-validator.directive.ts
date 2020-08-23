import { Directive } from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {HasMobileService} from './has-mobile.service';

@Directive({
  selector: '[appHasMobileValidator]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: HasMobileValidatorDirective, multi: true }]
})
export class HasMobileValidatorDirective implements AsyncValidator {
  constructor(private hasMobileServe: HasMobileService) { }
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.hasMobileServe.validate(control);
  }
}
