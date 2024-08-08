import { Component, OnInit } from '@angular/core';

interface Transaction {
  name: string;
  date: string;
  amount: string;
}

interface Card {
  number: number;
  expiry: string;
  holder: string;
}

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.scss'],
})
export class Demo2Component  implements OnInit {
  transactions: Transaction[] = [];
  cards: Card[] = [];

  constructor() { }

  ngOnInit() {
    // Replace this with your actual data fetching logic
    this.transactions = [
      { name: 'John Smith', date: 'Jul 20, 2024', amount: '$230.00' },
      { name: 'Starbuck', date: 'Jul 19, 2024', amount: '-$15.00' },
      { name: 'Julia Gonzalez', date: 'Jul 18, 2024', amount: '$100.00' },
      { name: 'BBVA', date: 'Jul 17, 2024', amount: '-$50.00' }
    ];

    this.cards = [
      { number: 123, expiry: 'never', holder: 'asd'},
      { number: 456, expiry: 'going', holder: 'tyu'},
      { number: 789, expiry: 'back', holder: 'okm'},
    ]
  }

}
