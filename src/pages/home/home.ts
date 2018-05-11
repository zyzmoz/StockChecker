import { Component } from '@angular/core';
import { NavController, PopoverController, Platform, IonicPage } from 'ionic-angular';
import { StocksProvider } from '../../providers/stocks/stocks';
import { StockPage } from '../stock/stock';
import { MenuComponent } from '../../components/menu/menu';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  view: string;
  stockList: any[] = [];
  watchingList: any[] = [];

  constructor(public navCtrl: NavController,
    private stockProvider: StocksProvider,
    private popoverCtrl: PopoverController,
    private adMob: AdMobFree,
    private platform: Platform) {
  }

  ionViewDidLoad = () => {
    console.log(this.platform);
    this.view = 'trending';
    this.stockProvider.listStocks().subscribe(async(res: any[]) => {
      console.log(res);
      this.stockList = await res;
    });

    this.stockProvider.getWatching().then(async(res: any[]) => {
      console.log(res);
      this.watchingList = await res;
    });



  }

  ionViewDidEnter = () => {
      
    if (this.platform.is('cordova')) {
      const bannerConfig: AdMobFreeBannerConfig = {
        overlap: true,        
        id: "ca-app-pub-6323085540054973/9782149817",
        isTesting: false,
        autoShow: true
      }

      this.adMob.banner.config(bannerConfig);
      this.adMob.banner.prepare()
        .then(() => {

        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  viewStock = (str) => {
    this.navCtrl.push(StockPage, { stock: str });
  }

  viewMenu = (event) => {

    let menu = this.popoverCtrl.create(MenuComponent);
    menu.present({
      ev: event
    });
  }

}
