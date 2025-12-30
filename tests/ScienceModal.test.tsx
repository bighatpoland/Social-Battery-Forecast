import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScienceModal from '../src/components/ScienceModal';

describe('ScienceModal', () => {
  const fact = {
    text: 'Test fact about social battery.',
    source: 'https://naplab.com/'
  };

  test('renders fact text and image when open', async () => {
    render(<ScienceModal open={true} fact={fact} onClose={() => {}} onNext={() => {}} />);
    expect(screen.getByText(/Test fact about social battery/i)).toBeInTheDocument();
    // Since images were removed, ensure source link is present
    const link = screen.getByRole('link', { name: /https:\/\/naplab.com\//i }) as HTMLAnchorElement;
    expect(link).toBeInTheDocument();
    expect(link.href).toContain('naplab.com');
  });

  test('calls onNext when Next Fact is clicked', async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();
    render(<ScienceModal open={true} fact={fact} onClose={() => {}} onNext={onNext} />);
    await user.click(screen.getByRole('button', { name: /next fact/i }));
    expect(onNext).toHaveBeenCalled();
  });
});
