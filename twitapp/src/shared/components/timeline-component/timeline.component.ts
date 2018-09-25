import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {TwitterService} from '../../services/twitter.service';
import {Models} from '../../models/models';
import TweetModel = Models.TweetModel;
import {MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
import UserModel = Models.UserModel;

@Component({
  selector: 'app-timeline-component',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.scss']
})

export class TimelineComponent implements OnInit, OnChanges {

  @Input() private screenName: string;
  @Input() private filters: string;
  @Input() private excludeReplies = false;
  @Output() private profileSent = new EventEmitter<UserModel>();
  private tweets: MatTableDataSource<TweetModel> = new MatTableDataSource<TweetModel>();
  private displayedColumns: string[] = ['tweet'];
  private loadingResults = false;
  private error = '';
  private serverError = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) matTable: MatTable<TweetModel>;

  constructor(private twitterService: TwitterService) {}

  ngOnInit() {
    this.tweets.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.screenName) {
      this.screenName = changes.screenName.currentValue;
      this.profileSent.emit(null);
    }
    if (changes.filters) {
      this.filters = changes.filters.currentValue;
    }
    if (changes.isReplies) {
      this.excludeReplies = changes.excludeReplies.currentValue;
    }
    if (this.screenName || this.filters || this.excludeReplies) {
      this.getUserTweets();
    }
  }

  private getUserTweets() {
    this.loadingResults = true;
    this.serverError = false;
    this.error = '';
    this.tweets.data = [];
    this.twitterService.getTweets(this.screenName, this.excludeReplies).subscribe(response => {
      if (response.resp && response.resp.statusCode === 200) {
        let data: Array<TweetModel> = [];
        response.data.forEach(tweet => {
          data.push(TweetModel.create(tweet));
        });
        if (this.filters) {
          const splitFilters: Array<string> = this.splitFilters();
          data = data.filter(element => {
            let isChosen = false;
            splitFilters.forEach(filter => {
              const reg = new RegExp(filter, 'i');
              if (element.text.search(reg) >= 0) {
                isChosen = true;
                element.text = this.replaceSearchResults(element.text, reg, filter);
              }
              if (element.quotedTweet) {
                if (element.quotedTweet.text.search(reg) >= 0) {
                  isChosen = true;
                  element.quotedTweet.text = this.replaceSearchResults(element.quotedTweet.text, reg, filter);
                }
              }
            });
            return isChosen;
          });
        }
        this.tweets.data = data;
        if (response.data.length > 0) {
          const profile: UserModel = UserModel.create(response.data[0].user);
          profile.profileImage = this.replaceProfileImage(profile.profileImage);
          this.profileSent.emit(profile);
        } else {
          this.profileSent.emit(null);
        }
        this.matTable.renderRows();
        this.loadingResults = false;
      } else if (response.statusCode === 404) {
        this.loadingResults = false;
        this.error = 'Invalid twitter screen name';
        this.profileSent.emit(null);
      } else if (response.statusCode === 401) {
        this.loadingResults = false;
        this.error = 'This user\'s timeline is protected';
        this.profileSent.emit(null);
      }
    }, error => {
      this.loadingResults = false;
      this.serverError = true;
      console.log(error);
    });
  }

  private splitFilters(): Array<string> {
    return this.filters.split(' ');
  }

  private replaceSearchResults(text: string, reg: RegExp, filter: string): string {
    const searchPosition = text.search(reg);
    const searchResult = text.substring(searchPosition, searchPosition + filter.length);
    text = text.replace(searchResult, '<span style="background-color: #94d5fd">' + searchResult + '</span>');

    return text;
  }

  private replaceProfileImage(profileImage: string): string {
    if (profileImage.search('_normal.') > 0) {
      profileImage = profileImage.replace('_normal.', '_400x400.');
    } else if (profileImage.search('_bigger.') > 0) {
      profileImage = profileImage.replace('_bigger.', '_400x400.');
    }

    return profileImage;
  }

  public getTweets(): MatTableDataSource<TweetModel> {
    return this.tweets;
  }

  public getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }

  public isScreenName(): boolean {
    if (this.screenName) {
      return true;
    }
  }

  public getExcludeReplies(): boolean {
    return this.excludeReplies;
  }

  public getFilters(): string {
    return this.filters;
  }

  public getError(): string {
    return this.error;
  }

  public isLoadingResults(): boolean {
    return this.loadingResults;
  }

  public isServerError(): boolean {
    return this.serverError;
  }
}
