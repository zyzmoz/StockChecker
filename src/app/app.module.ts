import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AdMobFree } from '@ionic-native/admob-free';

// import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { StockPage } from '../pages/stock/stock';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ProfilePage } from '../pages/profile/profile';
import { StocksProvider } from '../providers/stocks/stocks';

import { MenuComponent } from '../components/menu/menu';
import { VerifyAccountComponent } from '../components/verify-account/verify-account';

import firebase from  'firebase';
import { UserProvider } from '../providers/user/user';
import { AuthProvider } from '../providers/auth/auth';
const config = {
  apiKey: "AIzaSyDPvkprbfclAvxw8sf7fhK2JZJ8ZrwjPsM",
  authDomain: "stockchecker-17203.firebaseapp.com",
  databaseURL: "https://stockchecker-17203.firebaseio.com",
  projectId: "stockchecker-17203",
  storageBucket: "stockchecker-17203.appspot.com",
  messagingSenderId: "378400622678"
}

firebase.initializeApp(config);


@NgModule({
  declarations: [
    MyApp,
    StockPage,
    LoginPage,
    SignUpPage, 
    ProfilePage, 
    MenuComponent,  
    
    VerifyAccountComponent
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  
      
    // AngularFireModule.initializeApp(config, 'myApp'),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StockPage,
    LoginPage,
    SignUpPage,
    ProfilePage,
    MenuComponent,
    
    VerifyAccountComponent
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StocksProvider,
    UserProvider,
    AuthProvider,
    AdMobFree
  ]
})
export class AppModule {}
