import { Refresh } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { IconButton, Paper, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '_store/files.slice';
import { useEffect, useState } from 'react';
import Buscador from 'pages/FileManager/components/Buscador';
import Loading from 'pages/Loading/Loading';
import CircularIntegration from './components/UploadFileButton';
import FileList from './FileList';

const FileManager = () => {
	const [searchString, setSearchString] = useState('');

	const dispatch = useDispatch();

	const isLoading = useSelector(state => {
		return state.filesReducer.isLoading;
	});

	// const errorsFile = useSelector(state => {
	// return state.filesReducer.errors;
	// });

	useEffect(() => {
		dispatch(getFiles());
	}, [dispatch]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<motion.div initial={{ y: 0, opacity: 0.1 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
			<Paper className="max-h-screen h-screen pt-44 px-10 overflow-hidden">
				<Toolbar className="flex justify-between">
					<Buscador searchString={searchString} setSearchString={setSearchString}></Buscador>
					<div className="flex">
						<CircularIntegration></CircularIntegration>
						<IconButton variant="extended" onClick={() => dispatch(getFiles())}>
							<Refresh />
						</IconButton>
					</div>
				</Toolbar>

				<Paper className=" h-9/6 overflow-auto mx-12">
					<FileList searchString={searchString}></FileList>
				</Paper>
			</Paper>
		</motion.div>
	);
};

export default FileManager;
