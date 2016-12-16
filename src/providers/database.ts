import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import 'rxjs/add/operator/map';

const DB_NAME: string = 'incammino';
const win: any = window;

/* https://gist.github.com/aggarwalankush/0b700328e797e22a1d9994cb35afdf09 */

@Injectable()
export class Database {
  private storage: SQLite;
  private isOpen: boolean;

  constructor() {
    if(!this.isOpen) {
      this.storage = new SQLite();
      this.storage.openDatabase({name: DB_NAME, location: "default"}).then(this._tryInit);        
    }
  }

  // Initialize the DB with our required tables
  _tryInit() {
    this.storage.executeSql("CREATE TABLE IF NOT EXISTS journal (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)", []);
    this.isOpen = true;
    // this.query('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)').catch(err => {
    //   console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
    // });
  }

  getJournal(stageId: number) {
    return new Promise((resolve, reject) => {
      var sql = 'SELECT * FROM journal WHERE id = ?';
      return this.storage.executeSql(sql, [stageId]).then(data => {
        var journal = {};
        if (data.res.rows.length > 0) {
          var result = data.res.rows.item(0).value;
          journal = {
            id: result.id,
            text : result.text
          }; 
        }
        resolve(journal);
      }, (error) => {reject(error);});
    });
  
    
  }

}
