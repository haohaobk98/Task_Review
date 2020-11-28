import { Component, OnInit } from '@angular/core';
import { TransactionModel } from '@models/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transaction: TransactionModel;
  constructor() { }

  ngOnInit(): void {
  }
  addTransaction(transaction) {
    this.transaction = transaction;
  }
}
