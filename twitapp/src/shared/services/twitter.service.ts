import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Models} from '../models/models';
import TwitterResponseModel = Models.TwitterResponseModel;


@Injectable()
export class TwitterService {
  constructor(private http: HttpClient) {}

  getTweets(screenName: string, excludeReplies: boolean) {
    return this.http.get<TwitterResponseModel>(environment.api + '/tweets?screen_name=' + screenName + '&exclude_replies=' + excludeReplies);
  }
}
