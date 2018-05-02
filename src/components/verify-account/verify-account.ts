import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import firebase from 'firebase';


@Component({
  selector: 'verify-account',
  templateUrl: 'verify-account.html'
})
export class VerifyAccountComponent {

  data: any = {
    email: '',
    password: ''
  }
  
  constructor(private viewCtrl: ViewController) {
   
  }

  verify = () => {  

    firebase.auth().onIdTokenChanged(data => {
      console.log(data);
      
            
    });  

  }

  close = () => {
    this.viewCtrl.dismiss();
  }

}
