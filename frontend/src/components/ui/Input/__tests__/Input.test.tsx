import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input Component', () => {
  it('renders basic input correctly', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input');
  });

  it('renders with label', () => {
    render(<Input label="Email" placeholder="Enter email" />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(<Input label="Password" required />);

    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-error-500');
  });

  it('displays error message', () => {
    render(<Input label="Email" error="Invalid email address" />);

    const input = screen.getByLabelText('Email');
    const errorMessage = screen.getByText('Invalid email address');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('error-text');
    expect(input).toHaveClass('border-error-300');
  });

  it('displays helper text when no error', () => {
    render(<Input label="Password" helperText="Must be at least 8 characters" />);

    const helperText = screen.getByText('Must be at least 8 characters');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass('text-secondary-600');
  });

  it('hides helper text when error is present', () => {
    render(
      <Input
        label="Password"
        error="Password too short"
        helperText="Must be at least 8 characters"
      />
    );

    expect(screen.getByText('Password too short')).toBeInTheDocument();
    expect(screen.queryByText('Must be at least 8 characters')).not.toBeInTheDocument();
  });

  it('handles user input', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} placeholder="Type here" />);

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'Hello World');

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('Hello World');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom className', () => {
    render(<Input className="custom-input" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input', 'custom-input');
  });

  it('generates unique id when not provided', () => {
    render(
      <div>
        <Input label="First Input" />
        <Input label="Second Input" />
      </div>
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveAttribute('id');
    expect(inputs[1]).toHaveAttribute('id');
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });

  it('uses provided id', () => {
    render(<Input id="custom-id" label="Custom Input" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('passes through HTML input attributes', () => {
    render(<Input type="email" disabled data-testid="email-input" maxLength={50} />);

    const input = screen.getByTestId('email-input');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('maxLength', '50');
  });

  it('associates label with input correctly', () => {
    render(<Input label="Username" />);

    const label = screen.getByText('Username');
    const input = screen.getByLabelText('Username');

    expect(label).toHaveAttribute('for', input.id);
  });
});
