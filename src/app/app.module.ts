import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { BaseChartDirective } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppStoreModule } from './store/app-store.module';
import { LoadingModule } from './components/loading/loading.module';
import { provideAuth, getAuth, indexedDBLocalPersistence } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'

import {provideStorage, getStorage } from '@angular/fire/storage'

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { Capacitor } from '@capacitor/core';
import { getApp } from 'firebase/app';
import { TaskService } from './services/task.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
// register Swiper custom elements
register();

import { Plugins } from '@capacitor/core';
const { Keyboard } = Plugins;

import { SharedModule } from './shared/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, NavbarComponent, SidebarComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    // provideAuth(() => getAuth),
    BaseChartDirective, 
    HttpClientModule, 
    ReactiveFormsModule, 
    FormsModule,
    AppStoreModule,
    SharedModule,
    BrowserAnimationsModule
    
  
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    TaskService,
    provideCharts(withDefaultRegisterables()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => {
      const app = initializeApp(environment.firebaseConfig);
      const auth = getAuth(app);
      if (Capacitor.isNativePlatform()) {
        auth.setPersistence(indexedDBLocalPersistence);
      }
      return auth;
    }),
    // provideAuth(() => {
    //   if(Capacitor.isNativePlatform()){
    //     return initializeApp(getApp(), {
    //       persistence: indexedDBLocalPersistence,
    //     })
    //   }
    //   else { getAuth();} 
    // }),
    provideAuth(()=> getAuth()),
    provideFirestore(()=> getFirestore()),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
