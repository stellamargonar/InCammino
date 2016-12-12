import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, NavParams } from 'ionic-angular';

import { Post } from '../../pages/post/post'

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class Journal {
  posts: Array<{}> ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.load()  
  }

  stageSelected(event, post) {
    // move to stage page
    this.navCtrl.push(Post, { post: post });
  }

  load() {
      if (this.posts) {
          // already loaded data
          return Promise.resolve(this.posts);
      }
      // don't have the data yet
      return new Promise(resolve => {
          // We're using Angular Http provider to request the data,
          // then on the response it'll map the JSON data to a parsed JS object.
          // Next we process the data and resolve the promise with the new data.
          this.http.get('data/posts.json').subscribe(res => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              this.posts = res.json();
              resolve(this.posts);
          });
      });
  }

  // send to view to create new post
  create (event, postData) {
      this.navCtrl.push(Post, {});
  }
}
