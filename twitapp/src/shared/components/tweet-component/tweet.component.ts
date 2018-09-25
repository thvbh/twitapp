import {Component, Input} from '@angular/core';
import {Models} from '../../models/models';
import TweetModel = Models.TweetModel;

@Component({
  selector: 'app-tweet-component',
  templateUrl: 'tweet.component.html',
  styleUrls: ['tweet.component.scss']
})

export class TweetComponent {

  @Input() private tweet: TweetModel;
  @Input() private isQuote = false;

  public getTweet(): TweetModel {
    return this.tweet;
  }

  public getIsQuote(): boolean {
    return this.isQuote;
  }

}
