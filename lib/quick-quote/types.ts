export type QuickQuoteInterest = {
  value: string;
  label: string;
  /** Question shown above this interest's product checkboxes */
  productsLabel: string;
  products: string[];
  /** Ask for vehicle make and model */
  vehicle?: boolean;
};

export type QuickQuoteConfig = {
  interests: QuickQuoteInterest[];
  /** Prefix for the store email subject, e.g. "Tint a Car" + the customer's name */
  brandName: string;
};

/** Store details the browser needs; inbox emails stay on the server */
export type QuickQuoteStore = {
  id: string;
  name: string;
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  phone?: string;
};
