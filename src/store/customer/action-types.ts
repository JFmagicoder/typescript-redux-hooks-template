export interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  birthdate: string;
}

export interface CustomerState {
  customers: Customer[];
}

export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const EDIT_CUSTOMER = 'EDIT_CUSTOMER';
export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';

interface AddCustomer {
  type: typeof ADD_CUSTOMER;
  payload: Customer;
}

interface EditCustomer {
  type: typeof EDIT_CUSTOMER;
  payload: Customer;
}

interface RemoveCustomer {
  type: typeof REMOVE_CUSTOMER;
  payload: {
    id: number;
  };
}

export type CustomerActionTypes = AddCustomer | EditCustomer | RemoveCustomer;
