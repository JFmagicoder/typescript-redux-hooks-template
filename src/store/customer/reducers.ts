/* eslint-disable import/prefer-default-export */
import { CustomerState, CustomerActionTypes, ADD_CUSTOMER, EDIT_CUSTOMER, REMOVE_CUSTOMER } from './action-types';

const initialState: CustomerState = { customers: [] };

export function customerReducer(state = initialState, action: CustomerActionTypes): CustomerState {
  switch (action.type) {
    case ADD_CUSTOMER: {
      const { firstname, lastname, phone, birthdate } = action.payload;
      const newTodos = [
        {
          firstname,
          lastname,
          phone,
          birthdate,
          id: new Date().getUTCMilliseconds(),
        },
        ...state.customers,
      ];
      return { customers: newTodos };
    }
    case EDIT_CUSTOMER: {
      const { id, firstname, lastname, phone, birthdate } = action.payload;
      const customerIndex = state.customers.findIndex((customer) => customer.id === id);
      if (customerIndex !== -1) {
        const customers = [...state.customers];
        customers[customerIndex] = {
          id,
          firstname,
          lastname,
          phone,
          birthdate,
        };
        return { customers };
      }
      return { ...state };
    }
    case REMOVE_CUSTOMER: {
      const { id } = action.payload;
      const customerIndex = state.customers.findIndex((customer) => customer.id === id);
      if (customerIndex !== -1) {
        const customers = [...state.customers];
        customers.splice(customerIndex, 1);
        return { customers };
      }
      return { ...state };
    }
    default:
      return { ...state };
  }
}
