import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { StocksProvider } from '../../providers/stocks/stocks';
import { StockPage } from '../stock/stock';
import { MenuComponent } from '../../components/menu/menu';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  view: string = 'trending';
  stockList : any[] = [];
  watchingList : any[] = [];

  constructor(public navCtrl: NavController, 
              private stockProvider : StocksProvider,
              private popoverCtrl : PopoverController) {

  }

  ionViewDidEnter = () => {
    this.stockProvider.listStocks().subscribe((res: any[]) => {
      console.log(res);      
      this.stockList = res;      
    });
    
    this.stockProvider.getWatching().then((res: any[]) => {
      console.log(res);
      this.watchingList = res;      
    });
  }

  viewStock = (str) => {
    this.navCtrl.push(StockPage, { stock : str});
  }

  viewMenu = () => {
    let menu = this.popoverCtrl.create(MenuComponent);
    menu.present();
  }

}
