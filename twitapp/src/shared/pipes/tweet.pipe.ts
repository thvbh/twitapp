import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Models} from '../models/models';
import TweetModel = Models.TweetModel;

@Pipe({
  name: 'tweet'
})

export class TweetPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(tweet: TweetModel): any {
      let text = this.domSanitizer.sanitize(SecurityContext.NONE, tweet.text);

      if (tweet.entities.userMentions) {
        tweet.entities.userMentions.forEach(item => {
          const pattern = `@${item.screenName}`;
          const replaceValue = `<a href="https://twitter.com/${item.screenName}" target="_blank">@${item.screenName}</a>`;
          text = text.replace(new RegExp(pattern, 'gi'), replaceValue);
        });
      }

      if (tweet.entities.urls) {
        tweet.entities.urls.forEach(item => {
          const replaceValue = `<a href="${item.url}" target="_blank">${item.displayUrl}</a>`;
          text = text.replace(item.url, replaceValue);
        });
      }

      if (tweet.entities.media) {
        tweet.entities.media.forEach(item => {
          text = text.replace(item.url, '');
        });
      }

      return this.domSanitizer.bypassSecurityTrustHtml(text);
  }
}
