import { render, screen } from '@testing-library/react';
import React from 'react';
import Contact from '../pages/Contact'; // Adjust the path if necessary

describe('Contact Component', () => {
  it('should render the Contact page with heading and message', () => {
    // Render the Contact component
    render(<Contact />);

    // Check if the heading is present
    expect(screen.getByText('Contact')).toBeInTheDocument();

    // Check if the message paragraph is present
    expect(screen.getByText('Send us a message!')).toBeInTheDocument();
  });
});
