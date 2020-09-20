import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

type contentType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl';

const funcMap = {
  html: 'bypassSecurityTrustHtml',
  style: 'bypassSecurityTrustStyle',
  script: 'bypassSecurityTrustScript',
  url: 'bypassSecurityTrustUrl',
  resourceUrl: 'bypassSecurityTrustResourceUrl'
}

@Pipe({
  name: 'safeContent'
})
export class SafeContentPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string, type: contentType = 'html'): unknown {
    return this.sanitizer[funcMap[type]](value);
  }

}
