import { Pipe, PipeTransform } from '@angular/core';
import { round } from 'lodash';

enum Exponent {
  '万' = 10000,
  '亿' = 100000000
}

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number, precision = 1): string {
    if (!value || value < Exponent['万']) {
      return value.toString();
    }
    if (value > Exponent['亿']) {
      return round(value / Exponent['亿'], precision) + '亿';
    }
    return round(value / Exponent['万'], precision) + '万';
  }
}
