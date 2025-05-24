import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValuePairsToArray',
})
export class KeyValuePairsToArrayPipe implements PipeTransform {
  transform(value: object): { key: string; value: unknown }[] {
    return Object.entries(value).map(([key, val]) => ({ key, value: val }));
  }
}
