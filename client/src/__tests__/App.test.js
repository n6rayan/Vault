import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import axios from 'axios';

import '@testing-library/jest-dom/extend-expect';

import App from '../App';

jest.mock('axios');

afterEach(() => {
  cleanup();
});

describe('Main App Homepage - Not Logged In', () => {
  beforeAll(() => {
    axios.get.mockResolvedValue({
      data: {},
    });
  });

  test('loads and displays welcome page', async () => {

    const { getByText, getByRole } = render(<MemoryRouter><App /></MemoryRouter>);

    expect(getByText('Already registered?'));
    expect(getByText('Welcome to Vault, your centralised banking application!'));
    expect(getByRole('heading')).toHaveTextContent('Vault');
  });
});

test('loads and displays account home page', () => {
  const { getByText, getByRole } = render(<MemoryRouter><App /></MemoryRouter>);
});