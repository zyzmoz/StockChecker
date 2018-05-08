import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import firebase from 'firebase';


@Injectable()
export class UserProvider {

  user: any;

  constructor(public http: HttpClient, private alertCtrl: AlertController, private toastCtrl : ToastController) {
    const currentUser = firebase.auth().currentUser.uid;
    firebase.database().ref('accounts/' + currentUser).once('value').then((user) => {
      this.user = user.val();
    });

  }

  getUser = async () => {
    const currentUser = firebase.auth().currentUser.uid;
    let promise = new Promise((resolve) => {
      firebase.database().ref('accounts/' + currentUser).once('value').then((user) => {
        resolve(user.val());
      });
    });

    let result = await promise;
    console.log(result);
    return result;
  }

  updateName = () => {
    return new Promise((resolve) => {
      let msg = this.alertCtrl.create({
        title: 'Type a new Name',
        inputs: [
          {
            name: 'name',
            placeholder: 'New Name'
          }
        ],
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Confirm',
            handler: (data) => {
              const currentUser = firebase.auth().currentUser.uid;              
              firebase.database().ref('accounts/' + currentUser).update({
                name: data.name
              }).then(() => resolve(data.name));
            }
          }
        ]
      });


      msg.present();
    });  

  }

  resetPassword = async () => {
    const { email } = firebase.auth().currentUser;
    await firebase.auth().sendPasswordResetEmail(email);

    this.toastCtrl.create({
      message: 'Password Reset Email has been sent!',
      duration: 5000
    }).present();
  }

  isWatching = (symbol) => {
    return new Promise(resolve => {
      const currentUser = firebase.auth().currentUser.uid;
      firebase.database().ref('accounts/' + currentUser).once('value').then((user) => {
        var watching: any = user.val().watching;
        

        if (watching && (watching.indexOf(symbol) !== -1)) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

  }





}
