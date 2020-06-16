import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import '../../App/Root/Root.scss';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';

export default { title: 'Form' };

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

const Form: FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const mapSubmitHandler = useCallback((data) => onSubmit(data), [onSubmit]);

  return (
    <form onSubmit={handleSubmit(mapSubmitHandler)}>
      <FormInput
        fillWidth
        label='Firstname *'
        name='firstname'
        ref={register({ required: true })}
        error={errors.firstname && 'First name is required.'}
      />
      <FormInput
        fillWidth
        label='Lastname *'
        name='lastname'
        ref={register({ required: true })}
        error={errors.lastname && 'Last name is required.'}
      />
      <FormInput
        fillWidth
        label='Phone Number'
        name='phone'
        ref={register({})}
      />
      <FormInput
        fillWidth
        label='E-Mail *'
        name='email'
        type='email'
        ref={register({ required: true })}
        error={errors.email && 'E-Mail is required.'}
      />
      <Button size='big' type='submit'>Submit</Button>
    </form>
  );
};

export const normal = () => (
  <Form onSubmit={action('submit')} />
);
