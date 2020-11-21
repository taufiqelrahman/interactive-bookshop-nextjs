interface Payment {
  va_numbers: {
    bank: string;
    va_number: string;
  }[];
  permata_va_number: string;
  payment_type: string;
  store: string;
  biller_code: string;
  bill_key: string;
  payment_code: string;
  redirect_url: string;
  actions: { url: string }[];
}

function processType(payment: Payment) {
  let type = '';
  const { va_numbers: vaNumbers, permata_va_number: permataVaNumber, payment_type: paymentType, store } = payment;
  switch (paymentType) {
    case 'echannel':
      type = 'virtual account';
      break;
    case 'credit_card':
      type = 'credit card';
      break;
    case 'bca_klikpay':
      type = 'BCA Klikpay';
      break;
    case 'bca_klikbca':
      type = 'KlikBCA';
      break;
    case 'mandiri_clickpay':
      type = 'Mandiri Clickpay';
      break;
    case 'bri_epay':
      type = 'Epay BRI';
      break;
    case 'cimb_clicks':
      type = 'CIMB Clicks';
      break;
    case 'danamon_online':
      type = 'Danamon Online';
      break;
    case 'cstore':
      type = 'Indomaret';
      if (store) type = 'Alfamart';
      break;
    case 'gopay':
      type = 'GoPay';
      break;
    case 'akulaku':
      type = 'Akulaku';
      break;
    default:
      if (vaNumbers || permataVaNumber) type = 'virtual account';
      break;
  }
  return type;
}

function processInstance(payment: Payment) {
  let instance = '';
  const { va_numbers: vaNumbers, permata_va_number: permataVaNumber, payment_type: paymentType, store } = payment;
  if (vaNumbers && vaNumbers.length && vaNumbers[0]) {
    instance = vaNumbers[0].bank.toUpperCase();
  } else if (permataVaNumber) {
    instance = 'Permata Bank';
  } else if (paymentType === 'echannel') {
    instance = 'Mandiri';
  } else if (paymentType === 'cstore') {
    instance = 'Indomaret';
    if (store) instance = 'Alfamart';
  }
  return instance;
}

function processNumber(payment: Payment) {
  let number = '';
  const {
    va_numbers: vaNumbers,
    permata_va_number: permataVaNumber,
    payment_type: paymentType,
    biller_code: billerCode,
    bill_key: billKey,
    payment_code: paymentCode,
    store,
  } = payment;
  if (vaNumbers && vaNumbers.length && vaNumbers[0]) {
    number = vaNumbers[0].va_number;
  } else if (permataVaNumber) {
    number = permataVaNumber;
  } else if (paymentType === 'echannel') {
    number = `${billerCode}${billKey}`;
  } else if (paymentType === 'cstore') {
    number = paymentCode;
    if (store) number = 'Alfamart';
  }
  return number;
}

function processUrl(payment: Payment) {
  let url = '';
  const { redirect_url: redirectUrl, actions } = payment;
  if (redirectUrl) {
    url = redirectUrl;
  } else if (actions && actions.length && actions[0]) {
    url = actions[0].url;
  }
  return url;
}

export const formatPayment = (payment: Payment) => {
  const type = processType(payment);
  const instance = processInstance(payment);
  const number = processNumber(payment);
  const url = processUrl(payment);
  return {
    type,
    instance,
    number,
    url,
  };
};

export default { formatPayment };
