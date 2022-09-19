import { Check, Save, UploadFile } from '@mui/icons-material';
import { CircularProgress, Fab, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '_store';

const UploadFileButton = () => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const dispatch = useDispatch();

	const handleButtonClick = async e => {
		/*function readFileAsync() {
				return new Promise((resolve, reject) => {
					const file = e.target.files[0];
					if (!file) {
						return;
					}
					
					const reader = new FileReader();

					reader.onload = () => {
						console.log(file);
						resolve({
							// url: `data:${file.type};base64,${btoa(reader.result)}`,
							name: file.name,
							type: file.type,
							size: file.size
						});
					};

					reader.onerror = reject;

					reader.readAsBinaryString(file);
				});
			}

			const newFile = await readFileAsync();
			*/

		const file = e.target.files[0];

		if (!file) {
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		setLoading(true);

		try {
			await dispatch(uploadFile(formData));
			setSuccess(true);
		} catch (e) {
			console.log('errr');
			setSuccess(false);
		}
		
		setLoading(false);
	};

	return (
		<div className="flex items-center">
			<input accept="*" className=" hidden" id="icon-button-file" type="file" onChange={handleButtonClick} />
			<label className="m-1 relative" htmlFor="icon-button-file">
				<IconButton aria-label="upload picture" component="span">
					{success ? <Check /> : <UploadFile />}
				</IconButton>
				{loading && (
					<CircularProgress
						size={40}
						sx={{ color: 'teal', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
					/>
				)}
			</label>
		</div>
	);
};

export default UploadFileButton;
