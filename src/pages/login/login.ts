import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { SignUpPage } from '../../pages/sign-up/sign-up';
import { AuthProvider } from '../../providers/auth/auth';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data : any = {
    email: '',
    password: '',
    message: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider : AuthProvider) {
    
  }

  ionViewWillEnter(){ 
    const user = firebase.auth().currentUser;
       
      
  }

  login = () => {
    this.authProvider.signIn(this.data).catch((err) => {
      this.data.message = err.message;
    });    
  }

  register = () => {
    this.navCtrl.push(SignUpPage);
  }

}
