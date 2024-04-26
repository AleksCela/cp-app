import { Modal, Button } from "@mui/material";

const ConfirmationModal = ({ open, onClose, onConfirm, message }) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<div className='flex items-center justify-center h-screen'>
				<div className='w-96 p-6 bg-white shadow-lg rounded-lg'>
					<p className='text-gray-600 mb-4'>{message}</p>
					<div className='flex justify-end'>
						<Button onClick={onClose} className='mr-2'>
							NO
						</Button>
						<Button
							onClick={onConfirm}
							variant='contained'
							color='error'
						>
							YES
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmationModal;
