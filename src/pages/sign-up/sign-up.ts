import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import * as firebase from 'firebase';

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

  constructor(public navCtrl: NavController) {
  }

  signUpWithEmailAndPassword = () => {
    firebase.auth().createUserWithEmailAndPassword(this.data.email, this.data.password1)
      .then(res => {
        firebase.auth().currentUser.sendEmailVerification().then((res) => {
          console.log(res);
          
          this.navCtrl.pop();
        });               
      })
      .catch(err => {
        console.log(err);  
        this.data.message = err.message;      
      });
  }

  

}
