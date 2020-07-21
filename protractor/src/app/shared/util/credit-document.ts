export const creditPlanPayment = {
  creditValue: 'creditValue',
  interestRate: 'interestRate',
  frequency: 'frequency',
  fees: 'fees',
  assuranceValue: 'assuranceValue',
  downPayment: 'downPayment',
  initialDate: 'creditDate',
  feeValue: 'feeValue',
  assuranceFeeValue: 'assuranceFeeValue',
  assuranceTotalFeeValue: 'assuranceTotalFeeValue',
  client: 'client',
  // paymentPlan: 'paymentPlan',
  // currentPaymentPlan: 'currentPaymentPlan',
};

export const creditCurrentPlanPayment = {
    // current plan
    calculationDate: 'calculationDate',
    balance: 'balance',
    assuranceBalance: 'assuranceBalance',
    hasArrearsCharge: 'hasArrearsCharge',
    arrearsCharges: 'arrearsCharges',
    lastPaymentDate: 'lastPaymentDate',
    // currentPaymentPlan: 'currentPaymentPlan'
};

export const creditStatus = {
  active: 1,
  paid: 2,
  cancelRequest: 3,
  canceled: 4,
  fraud: 5,
  deceased: 6
};
