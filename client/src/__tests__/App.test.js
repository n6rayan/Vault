import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import axios from 'axios';

import '@testing-library/jest-dom/extend-expect';

import App from '../App';

jest.mock('axios');

axios.get.mockResolvedValue({
  data: {
    user: {
      username: 'username'
    }
  },
});

test('loads and displays welcome page', async () => {
  const { getByText, getByRole } = render(<App />);

  expect(getByText('Already registered?'));
  expect(getByText('Welcome to Vault, your centralised banking application!'));
  expect(getByRole('heading')).toHaveTextContent('Vault');


});