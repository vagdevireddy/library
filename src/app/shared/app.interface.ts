export interface Book {
  'book_id': string,
  'title': string,
  'book_summary': string,
  'url': string,
  'keywords': [string],
  'number_of_pages': number,
  'author': string,
  'lease_price': number,
  'availability': boolean,
  'delivery_time': string,
  'book_image': string,
  'material_group': string,
  'language': string,
  'publisher': string,
  'year': string,
  'isbn': string,
  'ibcn': string,
  'book_author_desc': string
}

export interface Category {
  category_id: string,
  category_name: string
}

export interface Author {
  author_id: string
}

export interface User {
  'user_id': string,
  'user_name': string,
  'is_active': boolean,
  'picture': string,
  'age': number,
  'first_name': string,
  'last_name': string,
  'gender': string,
  'company': string,
  'email': string,
  'phone': string,
  'address': string,
  'about': string,
  'shipping_address': Array<any>
}

export interface NewAddress {
  name: string,
  address: string,
  city: string,
  state: string,
  pin_code: string,
  status: boolean,
  phone: string
}

export interface Membership {
  membership_type: string;
  status: boolean;
  account_balance: number;
  plan_balance: number;
  issue_pending: number;
  return_pending: number;
  return_ready: number;
}


export interface ICart {
  bId: string,
  bType: string
}
