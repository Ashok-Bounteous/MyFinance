import { AfterViewInit, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements AfterViewInit {
  features = [
    { icon: 'stats-chart', title: 'Track Expenses', description: 'Keep track of your daily expenses easily.' },
    { icon: 'card', title: 'Plan Budgets', description: 'Plan and manage your budgets effectively.' },
    { icon: 'trending-up', title: 'Market Analysis', description: 'Analyze market conditions to make informed decisions.' }
  ];

  showScrollTopButton = false;

  constructor(private animationCtrl: AnimationController, private router: Router) {}

  ngAfterViewInit() {
    this.animateFeatures();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTopButton = window.scrollY > 200;
  }

  navigateToSignUp() {
    // Navigation logic to sign up page
    this.router.navigate(['/signup']);
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

