import React, { useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

const ChatInput: React.FC<Props> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <Box display="flex" gap={1} alignItems="center" p={1}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Say something to your Social Battery Chat Bot..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        fullWidth
        disabled={disabled}
      />
      <IconButton color="primary" onClick={submit} disabled={disabled} aria-label="send">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
