import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Root from './Root';

describe('Root', () => {
  afterEach(cleanup);

  test('display To-Do App', async () => {
    const { findByText } = await render(<Root />);
    const element = await findByText('To-Do App');
    expect(element).toBeInTheDocument();
  });
});
