import {Component, Input} from '@angular/core';
import {Models} from '../../models/models';
import UserModel = Models.UserModel;

@Component({
  selector: 'app-profile-component',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent {

  @Input() private profile: UserModel;

  public getProfile(): UserModel {
    return this.profile;
  }

}
