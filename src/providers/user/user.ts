import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {

  }

  isWatching(symbol){        
    return new Promise(resolve => {
      const currentUser = firebase.auth().currentUser.uid;
      firebase.database().ref('accounts/' + currentUser).once('value').then((user) => {
        var watching: any = user.val().watching;
        console.log(watching.indexOf(symbol));
        
        if (watching.indexOf(symbol) !== -1) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    
  }



}
