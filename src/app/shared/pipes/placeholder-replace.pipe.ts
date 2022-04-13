import {Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'placeholderReplace' })
export class placeholderReplacePipe implements PipeTransform {
  public transform(appContent: any, arg: string): string {
    const output = appContent.replace('<PLACEHOLDER>', arg);
    return output;
  }
}
