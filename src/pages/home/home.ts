import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StocksProvider } from '../../providers/stocks/stocks';
import { StockPage } from '../stock/stock';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  view: string = 'trending';
  stockList : any[] = [];

  constructor(public navCtrl: NavController, private stockProvider : StocksProvider) {

  }

  ionViewWillEnter = () => {
    this.stockProvider.listStocks().subscribe((res: any[]) => {
      console.log(res);
      
      this.stockList = res;      
    })        
  }

  viewStock = (str) => {
    this.navCtrl.push(StockPage, { stock : str});
  }

}
