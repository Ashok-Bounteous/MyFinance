import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonServiceService } from '../services/common-service.service';
// import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/userauth.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../components/loading/loading.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef<HTMLCanvasElement>;
  private barChart!: Chart;
  profile = null;

  constructor(
    // private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingComponent,
    private alertController: AlertController
  ) {
    // this.avatarService.getUserProfile().subscribe((data) => {
    //   this.profile = data;
    // })
  }

  ngOnInit() {
    this.barChartMethod();
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

  // async chageImage(){
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.base64,
  //     source: CameraSource.Photos,
  //   })
  //   console.log(image);

  //   if(image){
  //     const loading = await this.loadingController.create();
  //     await loading.present();
  //     const result = await this.avatarService.uploadImage(image);
  //     loading.dismiss();

  //     if(!result){
  //       const alert = await this.alertController.create({
  //         header: 'Upload failed',
  //         message: 'There was a problem uplloading your avatar.',
  //         buttons: ['OK']
  //       })
  //       await alert.present();
  //     }
  //   }
  // }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
