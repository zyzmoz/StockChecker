import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage } from '../../pages/home/home';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter(){  
  
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user.uid)
        this.navCtrl.setRoot(HomePage);  
    });
    
      
  }

  login = () => {
    firebase.auth().signInWithEmailAndPassword(this.data.email, this.data.password).then((res) =>{
      this.navCtrl.setRoot(HomePage);
    }).catch(err => {
      this.data.message = err.message;      
    });
  }

}
