import { httpCall } from './http';
import FormData from 'form-data';
import { InitiatePaymentRequestParams } from './dto';

class SslCommerzPayment {
  private baseURL: string;
  private endpoints: {
    init: string;
    validate: string;
    initiateRefund: string;
    refundQuery: string;
    transactionQueryBySessionId: string;
    transactionQueryByTransactionId: string;
  };
  private storeId: string;
  private storePassword: string;

  constructor(storeId: string, storePassword: string, live = false) {
    const baseDomain = live ? 'securepay' : 'sandbox';
    this.baseURL = `https://${baseDomain}.sslcommerz.com`;

    this.endpoints = {
      init: `${this.baseURL}/gwprocess/v4/api.php`,
      validate: `${this.baseURL}/validator/api/validationserverAPI.php?`,
      initiateRefund: `${this.baseURL}/validator/api/merchantTransIDvalidationAPI.php?`,
      refundQuery: `${this.baseURL}/validator/api/merchantTransIDvalidationAPI.php?`,
      transactionQueryBySessionId: `${this.baseURL}/validator/api/merchantTransIDvalidationAPI.php?`,
      transactionQueryByTransactionId: `${this.baseURL}/validator/api/merchantTransIDvalidationAPI.php?`,
    };

    this.storeId = storeId;
    this.storePassword = storePassword;
  }

  private paymentInitDataProcess(data: InitiatePaymentRequestParams): FormData {
    const formData = new FormData();

    for (const key of Object.keys(data)) {
      const value = data[key as keyof InitiatePaymentRequestParams];
      formData.append(key, value ?? '');
    }

    return formData;
  }

  init(data: InitiatePaymentRequestParams, url: string = '', method: string = 'POST') {
    const requestData = {
      ...data,
      store_id: this.storeId,
      store_passwd: this.storePassword,
    };

    return httpCall({
      url: url || this.endpoints.init,
      method: method || 'POST',
      data: this.paymentInitDataProcess(requestData),
    });
  }

  validate(data: Record<string, any>, url: string = '', method: string = 'GET') {
    const { val_id } = data;
    const query = `val_id=${val_id}&store_id=${this.storeId}&store_passwd=${this.storePassword}&v=1&format=json`;
    const requestURL = url || `${this.endpoints.validate}${query}`;

    return httpCall({ url: requestURL, method: method || 'GET' });
  }

  initiateRefund(data: Record<string, any>, url: string = '', method: string = 'GET') {
    const { refund_amount, refund_remarks, bank_tran_id, refe_id } = data;
    const query = `refund_amount=${refund_amount}&refund_remarks=${refund_remarks}&bank_tran_id=${bank_tran_id}&refe_id=${refe_id}&store_id=${this.storeId}&store_passwd=${this.storePassword}&v=1&format=json`;
    const requestURL = url || `${this.endpoints.initiateRefund}${query}`;

    return httpCall({ url: requestURL, method: method || 'GET' });
  }

  refundQuery(data: Record<string, any>, url: string = '', method: string = 'GET') {
    const { refund_ref_id } = data;
    const query = `refund_ref_id=${refund_ref_id}&store_id=${this.storeId}&store_passwd=${this.storePassword}&v=1&format=json`;
    const requestURL = url || `${this.endpoints.refundQuery}${query}`;

    return httpCall({ url: requestURL, method: method || 'GET' });
  }

  transactionQueryBySessionId(data: Record<string, any>, url: string = '', method: string = 'GET') {
    const { sessionkey } = data;
    const query = `sessionkey=${sessionkey}&store_id=${this.storeId}&store_passwd=${this.storePassword}&v=1&format=json`;
    const requestURL = url || `${this.endpoints.transactionQueryByTransactionId}${query}`;

    return httpCall({ url: requestURL, method: method || 'GET' });
  }

  transactionQueryByTransactionId(data: Record<string, any>, url: string = '', method: string = 'GET') {
    const { tran_id } = data;
    const query = `tran_id=${tran_id}&store_id=${this.storeId}&store_passwd=${this.storePassword}&v=1&format=json`;
    const requestURL = url || `${this.endpoints.transactionQueryByTransactionId}${query}`;

    return httpCall({ url: requestURL, method: method || 'GET' });
  }
}

export default SslCommerzPayment;
