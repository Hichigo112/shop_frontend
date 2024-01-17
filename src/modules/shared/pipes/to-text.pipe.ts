import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toText',
  standalone: true
})
export class ToTextPipe implements PipeTransform {

  transform(value: boolean, isTrueText: string, isFalseText: string): string {
    return value ?  isTrueText : isFalseText;
  }
}
