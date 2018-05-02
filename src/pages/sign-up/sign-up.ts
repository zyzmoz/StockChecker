import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  data: any = {
    name: '',
    email: '',
    password1: '',
    password2: '',
    message: ''
  }

  constructor(public navCtrl: NavController, private authProvider: AuthProvider) {
  }

  signUpWithEmailAndPassword = () => {
    this.authProvider.signUpWithEmail(this.data).then((res) =>{
      this.navCtrl.pop();
    }).catch((err) => {
      this.data.message = err.message;
    });    
  }

  

}
