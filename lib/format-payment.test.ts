import { formatPayment } from './format-payment';

describe('lib/format-payment', () => {
  const mockVAPayment = {
    id: 'test-123',
    amount: '100000',
    currency: 'IDR',
    payment_method: 'bank_transfer',
    status: 'pending',
    created_at: '2023-12-01',
    updated_at: '2023-12-01',
    va_numbers: [{ bank: 'bca', va_number: '1234567890' }],
  };

  describe('processType', () => {
    it('should return "virtual account" for echannel', () => {
      const payment = { ...mockVAPayment, payment_type: 'echannel' };
      const result = formatPayment(payment);
      expect(result.type).toBe('virtual account');
    });

    it('should return "credit card" for credit_card', () => {
      const payment = { ...mockVAPayment, payment_type: 'credit_card' };
      const result = formatPayment(payment);
      expect(result.type).toBe('credit card');
    });

    it('should return "BCA Klikpay" for bca_klikpay', () => {
      const payment = { ...mockVAPayment, payment_type: 'bca_klikpay' };
      const result = formatPayment(payment);
      expect(result.type).toBe('BCA Klikpay');
    });

    it('should return "KlikBCA" for bca_klikbca', () => {
      const payment = { ...mockVAPayment, payment_type: 'bca_klikbca' };
      const result = formatPayment(payment);
      expect(result.type).toBe('KlikBCA');
    });

    it('should return "Mandiri Clickpay" for mandiri_clickpay', () => {
      const payment = { ...mockVAPayment, payment_type: 'mandiri_clickpay' };
      const result = formatPayment(payment);
      expect(result.type).toBe('Mandiri Clickpay');
    });

    it('should return "Epay BRI" for bri_epay', () => {
      const payment = { ...mockVAPayment, payment_type: 'bri_epay' };
      const result = formatPayment(payment);
      expect(result.type).toBe('Epay BRI');
    });

    it('should return "CIMB Clicks" for cimb_clicks', () => {
      const payment = { ...mockVAPayment, payment_type: 'cimb_clicks' };
      const result = formatPayment(payment);
      expect(result.type).toBe('CIMB Clicks');
    });

    it('should return "Danamon Online" for danamon_online', () => {
      const payment = { ...mockVAPayment, payment_type: 'danamon_online' };
      const result = formatPayment(payment);
      expect(result.type).toBe('Danamon Online');
    });

    it('should return "GoPay" for gopay', () => {
      const payment = { ...mockVAPayment, payment_type: 'gopay' };
      const result = formatPayment(payment);
      expect(result.type).toBe('GoPay');
    });

    it('should return "Akulaku" for akulaku', () => {
      const payment = { ...mockVAPayment, payment_type: 'akulaku' };
      const result = formatPayment(payment);
      expect(result.type).toBe('Akulaku');
    });

    it('should return "Indomaret" for cstore without store', () => {
      const payment = { ...mockVAPayment, payment_type: 'cstore' };
      const result = formatPayment(payment);
      expect(result.type).toBe('Indomaret');
    });

    it('should return "Alfamart" for cstore with store', () => {
      const payment = { ...mockVAPayment, payment_type: 'cstore', store: 'alfamart' };
      const result = formatPayment(payment);
      expect(result.type).toBe('Alfamart');
    });

    it('should return "virtual account" for va_numbers', () => {
      const result = formatPayment(mockVAPayment);
      expect(result.type).toBe('virtual account');
    });

    it('should return "virtual account" for permata', () => {
      const payment = { ...mockVAPayment, permata_va_number: '9876543210' };
      delete (payment as any).va_numbers;
      const result = formatPayment(payment);
      expect(result.type).toBe('virtual account');
    });
  });

  describe('processInstance', () => {
    it('should return bank name in uppercase for va_numbers', () => {
      const result = formatPayment(mockVAPayment);
      expect(result.instance).toBe('BCA');
    });

    it('should return "Permata Bank" for permata_va_number', () => {
      const payment = { ...mockVAPayment, permata_va_number: '9876543210' };
      delete (payment as any).va_numbers;
      const result = formatPayment(payment);
      expect(result.instance).toBe('Permata Bank');
    });

    it('should return "Mandiri" for echannel', () => {
      const payment = { ...mockVAPayment, payment_type: 'echannel' };
      delete (payment as any).va_numbers;
      const result = formatPayment(payment);
      expect(result.instance).toBe('Mandiri');
    });

    it('should return "Indomaret" for cstore without store', () => {
      const payment = { ...mockVAPayment, payment_type: 'cstore' };
      delete (payment as any).va_numbers;
      const result = formatPayment(payment);
      expect(result.instance).toBe('Indomaret');
    });

    it('should return "Alfamart" for cstore with store', () => {
      const payment = { ...mockVAPayment, payment_type: 'cstore', store: 'alfamart' };
      delete (payment as any).va_numbers;
      const result = formatPayment(payment);
      expect(result.instance).toBe('Alfamart');
    });
  });

  describe('processNumber', () => {
    it('should return va_number from va_numbers array', () => {
      const result = formatPayment(mockVAPayment);
      expect(result.number).toBe('1234567890');
    });

    it('should return permata_va_number', () => {
      const payment = { ...mockVAPayment, permata_va_number: '9876543210' };
      delete (payment as any).va_numbers;
      const result = formatPayment(payment);
      expect(result.number).toBe('9876543210');
    });

    it('should concatenate biller_code and bill_key for echannel', () => {
      const payment = {
        ...mockVAPayment,
        payment_type: 'echannel',
        biller_code: '123',
        bill_key: '456',
      };
      delete (payment as any).va_numbers;
      const result = formatPayment(payment);
      expect(result.number).toBe('123456');
    });

    it('should return payment_code for cstore', () => {
      const payment = {
        ...mockVAPayment,
        payment_type: 'cstore',
        payment_code: 'CODE123',
      };
      delete (payment as any).va_numbers;
      const result = formatPayment(payment);
      expect(result.number).toBe('CODE123');
    });

    it('should return "Alfamart" for cstore with store', () => {
      const payment = {
        ...mockVAPayment,
        payment_type: 'cstore',
        payment_code: 'CODE123',
        store: 'alfamart',
      };
      delete (payment as any).va_numbers;
      const result = formatPayment(payment);
      expect(result.number).toBe('Alfamart');
    });
  });

  describe('processUrl', () => {
    it('should return redirect_url if present', () => {
      const payment = { ...mockVAPayment, redirect_url: 'https://example.com/pay' };
      const result = formatPayment(payment);
      expect(result.url).toBe('https://example.com/pay');
    });

    it('should return action url if redirect_url not present', () => {
      const payment = { ...mockVAPayment, actions: [{ url: 'https://action.com/pay' }] };
      const result = formatPayment(payment);
      expect(result.url).toBe('https://action.com/pay');
    });

    it('should return empty string if no url available', () => {
      const result = formatPayment(mockVAPayment);
      expect(result.url).toBe('');
    });

    it('should prioritize redirect_url over actions', () => {
      const payment = {
        ...mockVAPayment,
        redirect_url: 'https://redirect.com/pay',
        actions: [{ url: 'https://action.com/pay' }],
      };
      const result = formatPayment(payment);
      expect(result.url).toBe('https://redirect.com/pay');
    });
  });

  describe('formatPayment integration', () => {
    it('should format complete payment data', () => {
      const payment = {
        id: 'pay-123',
        amount: '250000',
        currency: 'IDR',
        payment_method: 'bank_transfer',
        status: 'pending',
        created_at: '2023-12-01',
        updated_at: '2023-12-01',
        payment_type: 'gopay',
        redirect_url: 'https://gojek.com/pay',
      };
      const result = formatPayment(payment);
      expect(result).toEqual({
        type: 'GoPay',
        instance: '',
        number: '',
        url: 'https://gojek.com/pay',
      });
    });
  });
});
