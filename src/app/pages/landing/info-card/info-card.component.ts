import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements AfterViewInit {
  @Input() info!: { title: string, content: string };

  constructor(private animationCtrl: AnimationController, private el: ElementRef) { }

  ngAfterViewInit() {
    const card = this.el.nativeElement.querySelector('ion-card');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          card.classList.add('in-view');
        } else {
          card.classList.remove('in-view');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(card);
  }
}
