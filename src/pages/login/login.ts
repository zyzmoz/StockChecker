import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage } from '../../pages/home/home';
import { SignUpPage } from '../../pages/sign-up/sign-up';
import { VerifyAccountComponent } from '../../components/verify-account/verify-account';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal : ModalController) {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);

      if (user.uid && user.emailVerified)
        this.navCtrl.setRoot(HomePage);

      if (user.uid && !user.emailVerified) {
        let msg = this.modal.create(VerifyAccountComponent);
        msg.present();
      }


    });  
  }

  ionViewWillEnter(){ 
    const user = firebase.auth().currentUser;
    if (user && user.emailVerified)
      this.navCtrl.setRoot(HomePage);
  
     
      
  }

  login = () => {
    firebase.auth().signInWithEmailAndPassword(this.data.email, this.data.password).then((res) =>{
      this.navCtrl.setRoot(HomePage);
    }).catch(err => {
      this.data.message = err.message;      
    });
  }

  register = () => {
    this.navCtrl.push(SignUpPage);
  }

}
