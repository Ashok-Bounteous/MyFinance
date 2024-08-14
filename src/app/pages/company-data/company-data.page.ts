import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCompanyData } from 'src/app/store/actions/company.actions';
import { selectCompanyData, selectCompanyLoading, selectCompanyError } from 'src/app/store/selectors/company.selectors';
import { AlphaVantageService as CompanyService } from 'src/app/services/alpha-vantage.service';

// Import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { HttpClient } from '@angular/common/http';
// Register Swiper custom elements
register();

interface CompanyData {
  symbol: string;
  lastRefreshed: string;
  timeSeries: Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.page.html',
  styleUrls: ['./company-data.page.scss'],
})
export class CompanyDataPage implements OnInit {

  @ViewChild('swiper') SwiperRef: ElementRef | undefined;
  swiper?: Swiper;

  companyData$: Observable<any>;
  compData$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  symbol: string = '';
  searchResult: CompanyData | null = null;
  selectedInterval: string = 'weekly'; // Default interval

  private companiesUrl = 'http://localhost:3010/Companies';

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000,
    }
  };

  SwiperParams = {
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 5
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      940: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      1040: {
        slidesPerView: 5,
        spaceBetween: 10
      }
    }
  };

  constructor(private store: Store, private companyService: CompanyService, private http: HttpClient) {
    this.companyData$ = this.http.get<any[]>(this.companiesUrl);
    this.loading$ = this.store.select(selectCompanyLoading);
    this.error$ = this.store.select(selectCompanyError);
    this.compData$ = this.store.select(selectCompanyData);
  }

  ngOnInit() {
    this.store.dispatch(loadCompanyData({ symbol: 'IBM', interval: this.selectedInterval }));
  }

  search(symbol: string) {
    if (symbol) {
      this.companyService.getCompanyData(symbol, this.selectedInterval).subscribe(
        data => {
          this.searchResult = data;
        },
        error => {
          console.error(error);
          this.searchResult = null;
        }
      );
    }
  }

  setInterval(interval: string) {
    this.selectedInterval = interval;
    this.search(this.symbol); // Trigger search with updated interval
  }
}
