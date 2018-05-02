import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import firebase from 'firebase';

/*
  Generated class for the StocksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StocksProvider {
  private url = "https://api.iextrading.com/1.0/stock/";

  constructor(public http: HttpClient) {
    console.log('Hello StocksProvider Provider');
  }

  listStocks = () => {
    
    return this.http.get(this.url + 'market/list/mostactive').map((res) => 
      res
    )
  }

  getQuote = (str) => {
    return this.http.get(this.url + str+'/quote').map((res) =>
      res
    )
  }

  getChart = (str) => {
    const params = new HttpParams;
    params.append('chartInterval', '10');
    return this.http.get(this.url + str + '/chart/1d?chartInterval=10', {params: params }).map((res) =>
      res
    )
  }

  watchStock = (stock) => {
    const currentUser = firebase.auth().currentUser.uid;
    firebase.database().ref('accounts/' + currentUser).once('value').then((user) => {
      var watching : any = user.val().watching;
      console.log(watching);  
      if (!watching){
        watching = [stock.symbol];
      } else {
        if (watching.indexOf(stock.symbol) === -1)
          watching = [...watching, stock.symbol];          
      }

      firebase.database().ref('accounts/' + currentUser).update({
        watching: watching
      })
          
    });

  } 

  unwatchStock = (stock) => {

  }

  postComment = (stock, comment) => {

  }

}
