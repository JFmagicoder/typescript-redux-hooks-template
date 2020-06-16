import React, { useState, useCallback, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import './Root.scss';
import FormInput from '../../CoreUI/FormInput/FormInput';
import Button from '../../CoreUI/Button/Button';
import { addCustomer, editCustomer, removeCustomer } from '../../../../store/customer/actions';
import { AppState } from '../../../../store';
import { Customer } from '../../../../store/customer/action-types';

const Wrapper = styled.section`
  padding: 1em;
  background: papayawhip;
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Root: React.FC = () => {
  const customers = useSelector((state: AppState) => state.customerModule.customers);
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [editId, setEditId] = useState(-1);

  const clearState = () => {
    setEditId(-1);
    setFirstname('');
    setLastname('');
    setPhone('');
    setBirthdate('');
  };

  const onAdd = useCallback(
    (data: Customer) => {
      dispatch(addCustomer(data));
      clearState();
    },
    [dispatch],
  );

  const onEdit = useCallback(
    (data: Customer) => {
      dispatch(editCustomer(data));
      clearState();
    },
    [dispatch],
  );

  const onDelete = useCallback(
    (id: number) => {
      dispatch(removeCustomer(id));
      clearState();
    },
    [dispatch],
  );

  const onSelectCustomer = (customer: Customer) => {
    setEditId(customer.id);
    setFirstname(customer.firstname);
    setLastname(customer.lastname);
    setPhone(customer.phone);
    setBirthdate(customer.birthdate);
  };

  const onSubmit = (data: any) => {
    if (editId === -1) {
      // Add
      onAdd(data);
    } else {
      // Edit
      onEdit({
        id: editId,
        ...data,
      });
    }
  };
  const { register, handleSubmit, errors } = useForm();

  return (
    <div className='container mt-5'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          fillWidth
          label='Firstname *'
          name='firstname'
          value={firstname}
          onChange={(event: FormEvent<HTMLInputElement>) => setFirstname(event.currentTarget.value)}
          ref={register({ required: true })}
          error={errors.firstname && 'First name is required.'}
        />
        <FormInput
          fillWidth
          label='Lastname *'
          name='lastname'
          value={lastname}
          onChange={(event: FormEvent<HTMLInputElement>) => setLastname(event.currentTarget.value)}
          ref={register({ required: true })}
          error={errors.lastname && 'Last name is required.'}
        />
        <FormInput
          fillWidth
          label='Phone Number'
          name='phone'
          type='number'
          value={phone}
          onChange={(event: FormEvent<HTMLInputElement>) => setPhone(event.currentTarget.value)}
          ref={register({ required: true })}
          error={errors.phone && 'Phone Number is required.'}
        />
        <FormInput
          fillWidth
          label='Birth Date *'
          name='birthdate'
          type='date'
          value={birthdate}
          onChange={(event: FormEvent<HTMLInputElement>) => setBirthdate(event.currentTarget.value)}
          ref={register({ required: true })}
          error={errors.birthdate && 'Birth Date is required.'}
        />
        <Button size='normal' type='submit'>
          {editId === -1 ? 'Add' : 'Edit'}
        </Button>
      </form>
      {customers.map((customer) => (
        <Wrapper key={customer.id}>
          <span>{customer.firstname}</span>
          <span>{customer.lastname}</span>
          <span>{customer.phone}</span>
          <span>{customer.birthdate}</span>
          <Button size='small' inverse type='button' onClick={() => onSelectCustomer(customer)}>Edit</Button>
          <Button size='small' inverse type='button' onClick={() => onDelete(customer.id)}>Remove</Button>
        </Wrapper>
      ))}
    </div>
  );
};

export default Root;
