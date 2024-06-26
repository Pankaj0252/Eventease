import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SuccessModal=({setShowSuccessModal,showSuccessModal})=> {
  const handleClose = () => setShowSuccessModal(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showSuccessModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showSuccessModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" style={{color:'green'}}>
            ✔ Account Created Successfully
            </Typography>
            {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             Welcome to Alam's family
            </Typography> */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SuccessModal;