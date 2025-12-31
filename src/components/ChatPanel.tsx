import React, { useState } from 'react';
import { Box, Paper, IconButton, Typography, Fab, FormControlLabel, Switch } from '@mui/material';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import useChat from '../lib/useChat';
type ChatRole = 'user' | 'assistant' | 'system';
interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}
import { loadChatUploadOptIn, saveChatUploadOptIn } from '../lib/storage';
import { formatFullDate } from '../lib/date';

const ChatPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { messages, sendMessage, clearHistory, isLoading } = useChat();
  const [uploadOptIn, setUploadOptIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    setUploadOptIn(loadChatUploadOptIn());
  }, []);

  const toggleOptIn = (v: boolean) => {
    setUploadOptIn(v);
    saveChatUploadOptIn(v);
  };

  return (
    <>
      <Fab color="secondary" aria-label="open chat" onClick={() => setOpen(true)} sx={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1400 }}>
        <ChatIcon />
      </Fab>

      {open && (
        <Paper elevation={8} sx={{ position: 'fixed', right: 24, bottom: 90, width: 360, maxHeight: '60vh', display: 'flex', flexDirection: 'column', zIndex: 1400 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" p={1}>
            <Typography variant="subtitle1">Social Battery Chat Bot</Typography>
            <Box>
              <FormControlLabel control={<Switch checked={uploadOptIn} onChange={(e) => toggleOptIn(e.target.checked)} />} label="Send history" />
              <IconButton onClick={() => { clearHistory(); }} title="Clear history">Clear</IconButton>
              <IconButton onClick={() => setOpen(false)} aria-label="close chat"><CloseIcon /></IconButton>
            </Box>
          </Box>
          <Box sx={{ px: 1, flex: 1, overflowY: 'auto' }}>
            {(() => {
              let lastDate = '';
              return messages.map((m) => {
                const ts = m.createdAt ? new Date(m.createdAt) : new Date();
                const dateLabel = formatFullDate(ts);
                const showHeader = dateLabel !== lastDate;
                lastDate = dateLabel;
                return (
                  <React.Fragment key={m.id}>
                    {showHeader && (
                      <Box display="flex" justifyContent="center" sx={{ my: 1 }}>
                        <Typography variant="caption" sx={{ bgcolor: 'rgba(255,255,255,0.04)', px: 1, borderRadius: 1 }}>{dateLabel}</Typography>
                      </Box>
                    )}
                    <ChatBubble role={m.role} text={m.text} />
                  </React.Fragment>
                );
              });
            })()}
          </Box>
          <ChatInput onSend={(t) => sendMessage(t)} disabled={isLoading} />
        </Paper>
      )}
    </>
  );
};

export default ChatPanel;
