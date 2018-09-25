import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filtering-component',
  templateUrl: 'filtering.component.html',
  styleUrls: ['filtering.component.scss']
})

export class FilteringComponent implements OnInit {
  private _filters: string;
  private _excludeReplies: boolean;

  @Output('filtersSent')
  private filtersSent = new EventEmitter<string>();

  @Output('excludeRepliesSent')
  private excludeRepliesSent = new EventEmitter<boolean>();

  ngOnInit() {
    setTimeout(() => {
      if (localStorage.getItem('filters')) {
        this._filters = localStorage.getItem('filters');
        this.sendFilters();
      }
      if (localStorage.getItem('isReplies')) {
        this.excludeReplies = localStorage.getItem('excludeReplies') === 'true';
        this.sendExcludeReplies();
      }
    });
  }

  public get filters(): string {
    return this._filters;
  }

  public set filters(value: string) {
    this._filters = value;
  }

  public get excludeReplies(): boolean {
    return this._excludeReplies;
  }

  public set excludeReplies(value: boolean) {
    this._excludeReplies = value;
  }

  public sendFilters() {
    this.filtersSent.emit(this._filters);
  }

  public sendExcludeReplies() {
    this.excludeRepliesSent.emit(this._excludeReplies);
  }

  public clearFilters() {
    this._filters = '';
    this.sendFilters();
  }

}
