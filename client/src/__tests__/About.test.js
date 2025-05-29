import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About'; // Adjust the path if necessary

describe('About Component', () => {
  it('should render the About page with heading and paragraph', () => {
    // Render the About component
    render(<About />);

    // Check if the heading is present
    expect(screen.getByText('About')).toBeInTheDocument();

    // Check if the paragraph is present
    expect(screen.getByText('This is the about page')).toBeInTheDocument();
  });
});
