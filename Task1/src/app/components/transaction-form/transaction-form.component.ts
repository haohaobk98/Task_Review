import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { TransactionModel } from '@models/transaction';
import * as JsonData from '@mocks/transactions.json';

import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  validateForm: FormGroup;
  dataSelect = JSON.parse(JSON.stringify(JsonData)).default.data;
  fromAccount = {
    from: 'Free Checking',
    amount: 5824.76
  };
  isVisible = false;
  isConfirmLoading = false;

  @Output() newTransaction = new EventEmitter<TransactionModel>();
  constructor(private fb: FormBuilder, private nzNotification: NzNotificationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      fromAccount: [{value: `${this.fromAccount.from} - €${this.fromAccount.amount}`, disabled: true}],
      toAccount: [null, [Validators.required]],
      amount: [null, [Validators.required]]
    });
  }

  getIcon() {
    return require(`assets/icons/arrows.png`).default;
  }

  submitForm() {
    let errorCount = 0;
    // check error
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i].errors) {
        errorCount++;
      }
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (errorCount > 0) {
      return;
    }

    // show confirmation dialog
    this.isVisible = true;
  }

  cancel() {
    this.reset();
  }

  reset() {
    this.validateForm.reset();
    this.validateForm.controls.fromAccount.setValue(`${this.fromAccount.from} - €${this.fromAccount.amount}`);
    this.isVisible = false;
    this.isConfirmLoading = false;
  }
  tranfer() {
    this.isConfirmLoading = true;

    // check the amount of money left > 500
    if (Number(this.fromAccount.amount) - Number(this.validateForm.controls.amount.value) < 500) {
      this.nzNotification.blank(
        'Tranfer fail!',
        'The balance is less than €500'
      );
      this.isVisible = false;
      this.isConfirmLoading = false;
      return;
    }

    const newTransaction = this.validateForm.controls.toAccount.value;
    newTransaction.transaction.amountCurrency.amount = this.validateForm.controls.amount.value.toString();
    newTransaction.dates.valueDate = new Date().getTime();

    this.newTransaction.emit(newTransaction);

    // subtract money from sender account
    this.fromAccount.amount = Number(this.fromAccount.amount) - Number(this.validateForm.controls.amount.value);
    this.reset();
  }
}
