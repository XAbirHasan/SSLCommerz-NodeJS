
export const PAYMENT_TYPES = [
  // Individual Card Gateways
  'brac_visa',            // BRAC VISA
  'dbbl_visa',            // Dutch Bangla VISA
  'city_visa',            // City Bank Visa
  'ebl_visa',             // EBL Visa
  'sbl_visa',             // Southeast Bank Visa
  'brac_master',          // BRAC MASTER
  'dbbl_master',          // MASTER Dutch-Bangla
  'city_master',          // City Master Card
  'ebl_master',           // EBL Master Card
  'sbl_master',           // Southeast Bank Master Card
  'city_amex',            // City Bank AMEX
  'qcash',                // QCash
  'dbbl_nexus',           // DBBL Nexus
  'bankasia',             // Bank Asia IB
  'abbank',               // AB Bank IB
  'ibbl',                 // IBBL IB and Mobile Banking
  'mtbl',                 // Mutual Trust Bank IB
  'bkash',                // Bkash Mobile Banking
  'dbblmobilebanking',    // DBBL Mobile Banking
  'city',                 // City Touch IB
  'upay',                 // Upay
  'tapnpay',              // Tap N Pay Gateway

  // Group Gateways
  'internetbank',         // For all internet banking
  'mobilebank',           // For all mobile banking
  'othercard',            // For all cards except Visa, Master, and Amex
  'visacard',             // For all Visa cards
  'mastercard',           // For all Master cards
  'amexcard',             // For Amex Card
] as const;


/**
 * Initiate Payment Request Parameters
 * 
 * The parameters in where this text Required For `SSLCOMMERZ_LOGISTIC` is mentioned, 
 * it must be required for the new logistic support provided by **SSLCOMMERZ** from **_1st October 2022_**.
 */
export interface InitiatePaymentRequestParams {
  // Integration Required Parameters

  /**
   * Your **SSLCOMMERZ** Store ID is the integration credential which can be collected through our managers
   * 
   * Max-length: 30
   */
  store_id: string;
  /**
   * Your **SSLCOMMERZ** Store Password is the integration credential which can be collected through our managers
   * 
   * Max-length: 30
   */
  store_passwd: string;
  /**
   * The amount which will be processed by **SSLCOMMERZ**. It should be a decimal value (10,2).
   * Example: 55.40
   * 
   * The transaction amount **must be from 10.00 BDT to 500000.00 BDT**
   */
  total_amount: number;
  /**
   * _The currency type must be mentioned_. It should be three characters.
   * Example: **BDT, USD, EUR, SGD, INR, MYR, etc**.
   * 
   * If the transaction currency is not **BDT**, then it will be converted to BDT based on the current exchange rate.
   * Example : 1 USD = 105.22 BDT at this moment (28/06/2023).
   */
  currency: string;
  /**
   * Unique transaction ID to identify your order in both your end and **SSLCOMMERZ**
   * 
   * Max-length: 30
   */
  tran_id: string;
  /**
   * Mention the product category. It is an open field.
   * Example: clothing, shoes, watches, gift, healthcare, jewellery, top up, toys, baby care, pants, laptop, donation, etc.
   * 
   * Max-length: 50
   */
  product_category: string;
  /**
   * It is the callback URL of your website where the user will be redirected after successful payment
   * 
   * Max-length: 255
   */
  success_url: string;
  /**
   * It is the callback URL of your website where the user will be redirected after any failure occurs during payment
   * 
   * Max-length: 255
   */
  fail_url: string;
  /**
   * It is the callback URL of your website where the user will be redirected if the user cancels the transaction
   * 
   * Max-length: 255
   */
  cancel_url: string;
  /**
   * **_Not mandatory! but better to use to avoid missing any payment notification._**
   * 
   * It is the **Instant Payment Notification (IPN) URL** of your website where **SSLCOMMERZ** will send the transaction's status (Length: 255).
   * The data will be communicated as SSLCOMMERZ Server to your Server. So, customer session will not work.
   * IPN is a very important feature to integrate with your site(s) to update your backend office.
   * 
   * Max-length: 255
   */
  ipn_url?: string;
  /**
   * **_Do not Use! If you do not customize the gateway list_**
   *
   * You can control to display the gateway list at **SSLCOMMERZ** gateway selection page by providing this parameter.
   * 
   * Max-length: 30
   */
  multi_card_name?: typeof PAYMENT_TYPES[number] | string;
  /**
   * **_Do not Use! If you do not control on transaction_**
   * 
   * You can provide the BIN of card to allow the transaction **must be completed by this BIN**.
   * You can declare by comma ',' separate of these BIN.
   * Example: 371598,371599,376947,376948,376949
   */
  allowed_bin?: string;



  // Parameters to Handle EMI Transaction ======================================================================

  /**
   * **This is mandatory if the transaction is EMI enabled and Value must be 1/0.**
   * Here, 1 means the customer will get EMI facility for this transaction.
   */
  emi_option: 0 | 1;
  /**
   * Max installment Option, Here the customer will get 3, 6, 9 installment at the gateway page.
   * 
   * Max-length: 2
   */
  emi_max_inst_option?: number;
  /**
   * Customer has selected from your Site, So no installment option will be displayed at the gateway page.
   * 
   * Max-length: 2
   */
  emi_selected_inst?: number;
  /**
   * Value is 1/0, if the value is 1 then only EMI transaction is possible, in the payment page.
   * No Mobile banking and internet banking channel will not display.
   * This parameter depends on `emi_option` and `emi_selected_inst`.
   */
  emi_allow_only?: 0 | 1;



  // Customer Information ======================================================================

  /**
   * Your customer name to address the customer in the payment receipt email.
   * Max-length: 50
   */
  cus_name: string;
  /**
   * Valid email address of your customer to send the payment receipt from SSLCOMMERZ end.
   * Max-length: 50
   */
  cus_email: string;
  /**
   * Mandatory - Address of your customer.
   *
   * Max-length: 50
   */
  cus_add1: string;
  /**
   * Address line 2 of your customer.
   * Not mandatory but useful if provided.
   * Max-length: 50
   */
  cus_add2?: string;
  /**
   * City of your customer.
   * 
   * Max-length: 50
   */
  cus_city: string;
  /**
   * State of your customer.
   * Not mandatory but useful if provided.
   * Max-length: 50
   */
  cus_state?: string;
  /**
   * Postcode of your customer.
   *
   * Max-length: 30
   */
  cus_postcode: string;
  /**
   * Country of your customer.
   *
   * Max-length: 50
   */
  cus_country: string;
  /**
   * The phone / mobile number of your customer to contact if any issue arises.
   * **Required For SSLCOMMERZ_LOGISTIC**
   * 
   * Max-length: 20
   */
  cus_phone: string;
  /**
   * Fax number of your customer.
   * Not mandatory but useful if provided.
   * 
   * Max-length: 20
   */
  cus_fax?: string;



  // Shipment Information ======================================================================

  /**
   * Shipping method of the order. Example: YES or NO or Courier or SSLCOMMERZ_LOGISTIC.
   * 
   * **Required For SSLCOMMERZ_LOGISTIC**
   * 
   * Max-length: 50
   */
  shipping_method?: string;
  /**
   * No of product will be shipped. Example: 1 or 2 or 
   * 
   * **Required For SSLCOMMERZ_LOGISTIC**
   */
  num_of_item: number;
  /**
   * Weight of products will be shipped. Should be in decimal (10,2)
   * Example: 0.5 or 2.00 or etc in kg
   * 
   * **Required For SSLCOMMERZ_LOGISTIC**
   */
  weight_of_items: number;
  /**
   * This is an id from where the SSLCOMMERZ logistic partners will come to receive your product for shipment.
   * You will set and get this pickup information from your merchant portal provided by SSLCOMMERZ.
   * 
   * **Required For SSLCOMMERZ_LOGISTIC**
   * 
   * Max-length: 50
   */
  logistic_pickup_id: string;
  /**
   * Mandatory - This information is required by SSLCOMMERZ logistic partners before receiving your product for shipment.
   * **Required For SSLCOMMERZ_LOGISTIC**
   * 
   * Max-length: 50
   */
  logistic_delivery_type?: string;

  /**
   * Required For SSLCOMMERZ_LOGISTIC
   */

  /**
   * Mandatory, if shipping_method is YES - Shipping Address of your order.
   * Not mandatory but useful if provided.
   * Max-length: 50
   */
  ship_name?: string;

  /**
   * Mandatory, if shipping_method is YES - Additional Shipping Address of your order.
   * Not mandatory but useful if provided.
   * Max-length: 50
   */
  ship_add1?: string;

  /**
   * Additional Shipping Address of your order.
   * Not mandatory but useful if provided.
   * Max-length: 50
   */
  ship_add2?: string;

  /**
   * Mandatory, if shipping_method is YES - Shipping area of your order.
   * Not mandatory but useful if provided.
   * Max-length: 50
   */
  ship_area?: string;

  /**
   * Mandatory, if shipping_method is YES - Shipping city of your order.
   * Not mandatory but useful if provided.
   * Max-length: 50
   */
  ship_city?: string;

  /**
   * Mandatory, if shipping_method is YES - Shipping sub city or sub-district or thana of your order.
   * Not mandatory but useful if provided.
   * Max-length: 50
   */
  ship_sub_city?: string;

  /**
   * Shipping state of your order.
   * Not mandatory but useful if provided.
   * Max-length: 50
   */
  ship_state?: string;

  /**
   * Mandatory, if shipping_method is YES - Shipping postcode of your order.
   * Not mandatory but useful if provided.
   * Max-length: 30
   */
  ship_postcode?: string;

  /**
   * Mandatory, if shipping_method is YES - Shipping country of your order.
   * Not mandatory but useful if provided.
   * Max-length: 50
   */
  ship_country?: string;

  /**
   * Mandatory, if shipping_method is YES - Shipping phone number of your order.
   * Not mandatory but useful if provided.
   * Max-length: 20
   */
  ship_phone?: string;


  // Customized or Additional Parameters

  /**
    * Extra parameter to pass your meta data if it is needed.
    * Not mandatory.
    * Max-length: 255
    */
  value_a?: string;

  /**
   * Extra parameter to pass your meta data if it is needed.
   * Not mandatory.
   * Max-length: 255
   */
  value_b?: string;

  /**
   * Extra parameter to pass your meta data if it is needed.
   * Not mandatory.
   * Max-length: 255
   */
  value_c?: string;

  /**
   * Extra parameter to pass your meta data if it is needed.
   * Not mandatory.
   * Max-length: 255
   */
  value_d?: string;
}
