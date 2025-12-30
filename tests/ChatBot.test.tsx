import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatPanel from '../src/components/ChatPanel';

describe('ChatPanel', () => {
  beforeEach(() => {
    // mock fetch used by chatApi
    (global as any).fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ reply: 'Thanks for sharing — rest if you need to.' }) });
  });

  test('opens, sends message and shows assistant reply', async () => {
    const user = userEvent.setup();
    render(<ChatPanel />);

    // open chat
    await user.click(screen.getByRole('button', { name: /open chat/i }));

    // type message
    const input = screen.getByPlaceholderText(/Say something to your Social Battery Chat Bot/i);
    await user.type(input, 'I am tired');
    await user.keyboard('{Enter}');

    // expect user message to appear
    expect(await screen.findByText(/I am tired/i)).toBeInTheDocument();

    // expect assistant reply
    await waitFor(() => expect(screen.getByText(/Thanks for sharing/i)).toBeInTheDocument());
  });
});
