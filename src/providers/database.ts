import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';

/* http://gonehybrid.com/how-to-use-pouchdb-sqlite-for-local-storage-in-ionic-2/ */

@Injectable()
export class Database {
  private _db: any;
  private _journals : any;
  constructor() {
    this._db = new PouchDB('incammino', { adapter: 'websql' });
    window['PouchDB'] = PouchDB;
  }

  addJournal (journal) {
    return this._db.post(journal); 
  }

  updateJournal(journal) {
      return this._db.put(journal);
  }
  deleteJournal(journal) {
      return this._db.remove(journal);
  }

  getAll() {  
    if (!this._journals) {
        return this._db.allDocs({ include_docs: true})
            .then(docs => {

                // Each row has a .doc object and we just want to send an 
                // array of birthday objects back to the calling controller,
                // so let's map the array to contain just the .doc objects.
                this._journals = docs.rows;

                // Listen for changes on the database.
                this._db.changes({ live: true, since: 'now', include_docs: true})
                    .on('change', this.onDatabaseChange);

                return this._journals;
            });
    } else {
        // Return cached data as a promise
        return Promise.resolve(this._journals);
    }
  }
  

  getJournal(stageId: number) {
    return this._db.get(stageId).then(doc => {
        return doc
    });
  }


  private onDatabaseChange = (change) => {  
    var index = this.findIndex(this._journals, change.id);
    var birthday = this._journals[index];

    if (change.deleted) {
        if (birthday) {
            this._journals.splice(index, 1); // delete
        }
    } else {
        change.doc.Date = new Date(change.doc.Date);
        if (birthday && birthday._id === change.id) {
            this._journals[index] = change.doc; // update
        } else {
            this._journals.splice(index, 0, change.doc) // insert
        }
    }
  }
  // Binary search, the array is by default sorted by _id.
  private findIndex(array, id) {  
      var low = 0, high = array.length, mid;
      while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
      }
      return low;
  }


}
