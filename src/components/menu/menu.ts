import { Component } from '@angular/core';
import firebase from 'firebase';
import {App, NavController, ViewController} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { ProfilePage } from '../../pages/profile/profile';


@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  
  navCtrl: NavController;
  constructor(private app : App, private viewCtrl : ViewController) {
    this.navCtrl = this.app.getRootNav();
  }

  signOut = () => {
    firebase.auth().signOut();
    this.navCtrl.setRoot(LoginPage);
    this.viewCtrl.dismiss();
  }

  openProfile = () => {
    this.navCtrl.push(ProfilePage);
    this.viewCtrl.dismiss();
  }

}
