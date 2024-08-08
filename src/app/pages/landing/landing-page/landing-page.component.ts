import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements AfterViewInit {
  infos = [
    { title: 'Feature 1', content: 'Details about feature 1.' },
    { title: 'Feature 2', content: 'Details about feature 2.' },
    { title: 'Feature 3', content: 'Details about feature 3.' }
  ];

  constructor(private animationCtrl: AnimationController) {}

  ngAfterViewInit() {
    this.animateFeatures();
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private animateFeatures() {
    const features = document.querySelectorAll('.feature');

    features.forEach((feature: Element) => {
      const animation = this.animationCtrl.create()
        .addElement(feature)
        .duration(1500)
        .iterations(1)
        .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
        .fromTo('opacity', '0', '1');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animation.play();
          }
        });
      });

      observer.observe(feature);
    });
  }
}
