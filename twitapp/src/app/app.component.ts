import { Component } from '@angular/core';
import {Models} from '../shared/models/models';
import UserModel = Models.UserModel;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private screenName: string;
  private filters: string;
  private profile: UserModel;
  private excludeReplies: boolean;

  public setScreenName(value: string) {
    this.screenName = value;
    localStorage.setItem('screenName', value);
  }

  public getScreenName(): string {
    return this.screenName;
  }

  public setFilters(value: string) {
    this.filters = value;
    localStorage.setItem('filters', value);
  }

  public getFilters(): string {
    return this.filters;
  }

  public setProfile(value: UserModel) {
    this.profile = value;
  }

  public getProfile(): UserModel {
    return this.profile;
  }

  public setExcludeReplies(value: boolean) {
    this.excludeReplies = value;
    localStorage.setItem('excludeReplies', value.toString());
  }

  public getExcludeReplies(): boolean {
    return this.excludeReplies;
  }

}
