import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: any;
  constructor(public navCtrl: NavController, private userProvider : UserProvider) {
    
  }

  async ionViewDidLoad() {
    this.user = await this.userProvider.getUser();    
  }

  updateName = async () => {
    this.user.name = await this.userProvider.updateName();
  }

  resetPassword = () => {
    this.userProvider.resetPassword();
  }
}
