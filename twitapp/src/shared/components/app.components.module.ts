import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SearchNameComponent} from './search-name-component/search.name.component';
import {FormsModule} from '@angular/forms';
import {TimelineComponent} from './timeline-component/timeline.component';
import {TweetComponent} from './tweet-component/tweet.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import {FilteringComponent} from './filtering-component/filtering.component';
import {TweetPipe} from '../pipes/tweet.pipe';
import {ProfileComponent} from './profile-component/profile.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCheckboxModule
  ],
  declarations: [
    SearchNameComponent,
    TimelineComponent,
    TweetComponent,
    FilteringComponent,
    ProfileComponent,
    TweetPipe
  ],
  providers: [
    DatePipe
  ],
  exports: [
    SearchNameComponent,
    TimelineComponent,
    TweetComponent,
    FilteringComponent,
    ProfileComponent
  ]
})

export class AppComponentsModule {

}
