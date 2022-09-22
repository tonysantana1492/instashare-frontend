import { Check, UploadFile } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '_store';

const UploadFileButton = () => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const dispatch = useDispatch();

	const handleButtonClick = async e => {
		
		const file = e.target.files[0];

		if (!file) {
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		setLoading(true);
		setSuccess(false);

		try {
			await dispatch(uploadFile(formData));
			setSuccess(true);
		} catch (e) {
			setSuccess(false);
		}
		
		setLoading(false);
	};

	return (
		<div className="flex items-center">
			<input accept="*" className=" hidden" id="icon-button-file" type="file" onChange={handleButtonClick} />
			<label className="m-1 relative" htmlFor="icon-button-file">
				<IconButton data-testid='iconbutton-id' aria-label="upload picture" component="span">
					{success ? <Check /> : <UploadFile />}
				</IconButton>
				{loading && (
					<CircularProgress
						data-testid='circularprogress-id'
						size={40}
						sx={{ color: 'teal', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
					/>
				)}
			</label>
		</div>
	);
};

export default UploadFileButton;
