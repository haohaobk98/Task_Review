import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  validateForm: FormGroup;
  fromAccount = {
    from: 'Free Checking',
    amount: 5824.76
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      fromAccount: [`${this.fromAccount.from} - €${this.fromAccount.amount}`],
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

    // submit data


  }
}
