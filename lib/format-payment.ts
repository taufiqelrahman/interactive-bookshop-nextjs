function processType(payment) {
  let type = 'Bank Transfer';
  const {
    va_numbers: vaNumbers,
    permata_va_number: permataVaNumber,
    payment_type: paymentType,
  } = payment;
  if (vaNumbers || permataVaNumber || paymentType === 'echannel') type = 'Virtual Account';
  return type;
}

function processInstance(payment) {
  let instance = '';
  const {
    va_numbers: vaNumbers,
    permata_va_number: permataVaNumber,
    payment_type: paymentType,
  } = payment;
  if (vaNumbers && vaNumbers[0]) {
    instance = vaNumbers[0].bank.toUpperCase();
  } else if (permataVaNumber) {
    instance = 'Permata Bank';
  } else if (paymentType === 'echannel') {
    instance = 'Mandiri';
  }
  return instance;
}

function processNumber(payment) {
  let number = 'Virtual Account';
  const {
    va_numbers: vaNumbers,
    permata_va_number: permataVaNumber,
    payment_type: paymentType,
    biller_code: billerCode,
    bill_key: billKey,
  } = payment;
  if (vaNumbers && vaNumbers[0]) {
    number = vaNumbers[0].va_number;
  } else if (permataVaNumber) {
    number = permataVaNumber;
  } else if (paymentType === 'echannel') {
    number = `${billerCode}${billKey}`;
  }
  return number;
}

function processUrl() {
  const number = '';
  return number;
}

export const formatPayment = payment => {
  const type = processType(payment);
  const instance = processInstance(payment);
  const number = processNumber(payment);
  const url = processUrl();
  return {
    type,
    instance,
    number,
    url,
  };
};

export default { formatPayment };
