import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNameSplit'
})
export class NameSplitPipePipe implements PipeTransform {

  transform(value: string, length: number = 8): unknown {
    return value.length > length ? value.slice(0, length) + '...' : value;
  }

}
