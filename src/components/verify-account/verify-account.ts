import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import * as firebase from 'firebase';


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

  }

  close = () => {
    this.viewCtrl.dismiss();
  }

}
