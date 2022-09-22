import { Refresh } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { IconButton, Paper, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, selectFiles } from '_store/files.slice';
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

	const files = useSelector(selectFiles);

	const filteredFiles = files.filter(s => s.name.toLowerCase().startsWith(searchString.toLowerCase()));


	useEffect(() => {
		dispatch(getFiles());
	}, [dispatch]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<motion.div initial={{ y: 0, opacity: 0.1 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
			<div className="max-h-screen h-screen pt-44 overflow-hidden bg-grey-200">
				<Toolbar className="flex justify-between">
					<Buscador searchString={searchString} setSearchString={setSearchString}></Buscador>
					<div className="flex">
						<CircularIntegration></CircularIntegration>
						<IconButton variant="extended" onClick={() => dispatch(getFiles())}>
							<Refresh />
						</IconButton>
					</div>
				</Toolbar>

				<Paper variant='outlined' className="h-9/6 overflow-auto mx-14">
					<FileList filteredFiles={filteredFiles}></FileList>
				</Paper>
			</div>
		</motion.div>
	);
};

export default FileManager;
