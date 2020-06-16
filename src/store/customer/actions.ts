import { ADD_CUSTOMER, EDIT_CUSTOMER, REMOVE_CUSTOMER, Customer } from './action-types';

export function addCustomer(data: Customer) {
  return {
    type: ADD_CUSTOMER,
    payload: data,
  };
}

export function editCustomer(data: Customer) {
  return {
    type: EDIT_CUSTOMER,
    payload: data,
  };
}

export function removeCustomer(id: number) {
  return {
    type: REMOVE_CUSTOMER,
    payload: { id },
  };
}
