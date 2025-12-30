import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Link } from '@mui/material';

export type Fact = {
  text: string;
  image?: string;
  source?: string;
};

type Props = {
  open: boolean;
  fact: Fact | null;
  onClose: () => void;
  onNext: () => void;
};

const ScienceModal: React.FC<Props> = ({ open, fact, onClose, onNext }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth aria-labelledby="science-dialog-title">
      <DialogTitle id="science-dialog-title">What does science say?</DialogTitle>
      <DialogContent>
        {fact ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1">{fact.text}</Typography>
            {fact.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={fact.image} alt="science illustration" style={{ width: '100%', borderRadius: 8 }} />
            )}
            {fact.source && (
              <Typography variant="caption" color="text.secondary">
                Source: <Link href={fact.source} target="_blank" rel="noopener noreferrer">{fact.source}</Link>
              </Typography>
            )}
          </Box>
        ) : (
          <Typography>No fact available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onNext} color="primary">Next Fact</Button>
        <Button onClick={onClose} color="inherit">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScienceModal;
