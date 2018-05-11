import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App, NavController, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { VerifyAccountComponent } from '../../components/verify-account/verify-account';

@Injectable()
export class AuthProvider {
  private navCtrl : NavController;

  constructor(public http: HttpClient, private app : App, private modal : ModalController) {
    this.navCtrl = this.app.getActiveNav();
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      
      if (user.uid && user.emailVerified)
        this.navCtrl.setRoot('HomePage');

      if (user.uid && !user.emailVerified) {
        let msg = this.modal.create(VerifyAccountComponent);
        msg.present();
      }
    });
  }

  signUpWithEmail = (data) => {
    return firebase.auth().createUserWithEmailAndPassword(data.email, data.password1).then((res) => {      
      firebase.database().ref('accounts/' + res.uid).set({
        name: data.name,
        email: data.email
      }).then(() => firebase.auth().currentUser.sendEmailVerification());
      
    });  

  }

  signIn = (data) => {
    return firebase.auth().signInWithEmailAndPassword(data.email, data.password);
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  verifyAccount = () => {
    firebase.auth().currentUser.reload();
  }



}
