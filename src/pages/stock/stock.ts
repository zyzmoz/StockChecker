import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StocksProvider } from '../../providers/stocks/stocks';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
})
export class StockPage {

  @ViewChild('price') price: any;
  @ViewChild('msg') msg: any;

  lineChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private stocksProvider: StocksProvider) {
  }

  private stock: any;
  private stockChart: any;
  private stockId: string;
  watching = Math.floor((Math.random() * 10000) + 1);
  graph: string = 'price';

  ionViewDidEnter() {


    this.stocksProvider.getChart(this.stockId).subscribe(res => {
      let labels: any[] = [];
      let data: any = {lines: [], trades: []};
      this.stockChart = res;
      // console.log(res);

      this.stockChart.forEach(element => {
        labels.push(element.label);
        data.lines.push(element.marketAverage);
        data.trades.push(element.marketNumberOfTrades);
      });
      //marketNumberOfTrades
      
      this.lineChart = new Chart(this.price.nativeElement, {
        type: 'line',
        options: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        },
        data: {
          labels: labels,

          datasets: [
            {
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 0.5,
              pointHitRadius: 1,
              data: data.lines,
              spanGaps: false,
            }
          ]
        }
      });

      this.lineChart = new Chart(this.msg.nativeElement, {
        type: 'line',
        options: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        },
        data: {
          labels: labels,

          datasets: [
            {
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 0.5,
              pointHitRadius: 1,
              data: data.trades,
              spanGaps: false,
            }
          ]
        }
      });


    });

  }

  ionViewWillEnter = () => {
    this.stockId = this.navParams.get('stock');
    this.stocksProvider.getQuote(this.stockId).subscribe(res => {
      this.stock = res;


    });

  }


  watch = (stock) => {
    this.stocksProvider.watchStock(stock);
  }

}
