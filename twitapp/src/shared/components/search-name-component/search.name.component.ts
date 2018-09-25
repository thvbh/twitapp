import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-name-component',
  templateUrl: 'search.name.component.html',
  styleUrls: ['search.name.component.scss']
})

export class SearchNameComponent implements OnInit {
  private _screenName: string;

  @Output('usernameSent')
  private usernameSent = new EventEmitter<string>();

  ngOnInit() {
    if (localStorage.getItem('screenName')) {
      this._screenName = localStorage.getItem('screenName');
      this.sendScreenName();
    }
  }

  public get screenName(): string {
    return this._screenName;
  }

  public set screenName(value: string) {
    this._screenName = value;
  }

  public sendScreenName() {
    this.usernameSent.emit(this._screenName);
  }
}
