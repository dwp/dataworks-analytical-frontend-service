import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Displays signin button', () => {
  const { getByRole } = render(<App />);
  const btnElement = getByRole('button');
  expect(btnElement).toBeInTheDocument();
  expect(btnElement).toHaveTextContent('Sign In');
});
