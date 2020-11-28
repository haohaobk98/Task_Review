import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as JsonData from '@mocks/transactions.json';
import ImageMapping from '@mocks/mappingImage.js';
import { TransactionModel } from '@models/transaction';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit, OnChanges {

  @Input() transaction: TransactionModel;

  searchData = '';
  sortOption = '';
  imageMapping = ImageMapping;
  dataSource = JSON.parse(JSON.stringify(JsonData)).default.data;
  dataDisplay = JSON.parse(JSON.stringify(JsonData)).default.data;

  constructor(private nzNotification: NzNotificationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const newTransaction = changes.transaction.currentValue;
    if (newTransaction) {
      this.dataSource.unshift(newTransaction);
      this.dataDisplay.unshift(newTransaction);
      this.nzNotification.blank(
        'Tranfer success!',
        `Transfered €${newTransaction.transaction.amountCurrency.amount} to ${newTransaction.merchant.name}`
      );
    }
  }
  getImage(value) {
    const currentImage = this.imageMapping.find(item => item.value === value);
    return currentImage ? require(`assets/icons/${currentImage.key}.png`).default : '';
  }

  getIcon() {
    return require(`assets/icons/briefcase.png`).default;
  }

  getStyle(transaction) {
    return `
      border-left: 5px solid ${transaction.categoryCode}
    `;
  }
  search(event: any) {
    this.dataDisplay = this.dataSource.filter(item => item.transaction.type.toLowerCase().includes(this.searchData.toLowerCase())
      || item.merchant.name.toLowerCase().includes(this.searchData.toLowerCase()));
  }

  sort() {
    // const arrayTime = [1600493600002, 1600493600000, 1600493600001, 1600493600005, 1600493600003];
    // arrayTime.sort( (a, b) => b - a);
    // console.log("aarayTime", arrayTime);

    if (this.sortOption === 'date') {

      // sort by date
      this.dataDisplay = this.dataSource.sort( (a, b) => b.dates.valueDate - a.dates.valueDate);
    } else if (this.sortOption === 'account') {
      // sort by receiver account
      this.dataDisplay = this.dataSource.sort( (a, b) => a.merchant.name.localeCompare(b.merchant.name));
    } else {

      // sort by amount of money
      // tslint:disable-next-line: max-line-length
      this.dataDisplay = this.dataSource.sort( (a, b) => Number(a.transaction.amountCurrency.amount) - Number(b.transaction.amountCurrency.amount));
    }
  }
  clear() {
    this.searchData = '';
    this.dataDisplay = this.dataSource;
  }
}
