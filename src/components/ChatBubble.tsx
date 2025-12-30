import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

type Props = {
  role: 'user' | 'assistant';
  text: string;
};

const ChatBubble: React.FC<Props> = ({ role, text }) => {
  const isUser = role === 'user';
  return (
    <Box display="flex" justifyContent={isUser ? 'flex-end' : 'flex-start'} my={0.5}>
      <Paper elevation={1} sx={{ p: 1, maxWidth: '80%', bgcolor: isUser ? 'primary.main' : 'background.paper', color: isUser ? 'primary.contrastText' : 'text.primary' }}>
        <Typography variant="body2">{text}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatBubble;
