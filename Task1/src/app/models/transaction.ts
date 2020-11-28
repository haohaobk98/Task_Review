export class TransactionModel {
  categoryCode: string;
  dates: {
        valueDate: number
      };
  transaction: {
    amountCurrency: {
      amount: string,
      currencyCode: string
    };
    type: string;
    creditDebitIndicator: string;
  };
  merchant: {
    name: string;
    accountNumber: string;
  };
}
