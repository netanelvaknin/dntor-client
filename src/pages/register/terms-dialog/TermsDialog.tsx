import React from 'react';
import {Dialog} from '@material-ui/core';

interface TermsDialogProps {
    setTermsDialogOpen: (open: boolean) => void;
    termsDialogOpen: boolean;
};

const TermsDialog = ({setTermsDialogOpen, termsDialogOpen}: TermsDialogProps) => {
    return (
        <Dialog
            open={termsDialogOpen}
            onClose={() => setTermsDialogOpen(false)}
        >טקסט</Dialog>
    );
};

export default TermsDialog;