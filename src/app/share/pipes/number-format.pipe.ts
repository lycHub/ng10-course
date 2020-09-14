import { Pipe, PipeTransform } from '@angular/core';
import { round } from 'lodash';

type unitTypes = '万' | '亿';

interface FormatNumberConfig {
  unit?: unitTypes;
  precision?: number;
}

enum Exponent {
  '万' = 10000,
  '亿' = 100000000
}

const defaultConfig: FormatNumberConfig = {
  unit: '万',
  precision: 1
}

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number, config: FormatNumberConfig = defaultConfig): number {
    const unit = config.unit || '万';
    return round(value / Exponent[unit], config.precision || 1);
  }
}
