import { List, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectFiles } from '_store/files.slice';
import FileListItem from './components/FileListItem';

const FileList = ({searchString}) => {
	const files = useSelector(selectFiles);

	const filteredFiles = files.filter(s => s.name.startsWith(searchString));


	return (
		<Fragment>
			{filteredFiles.length === 0 ? (
				<Typography className=' mt-12 flex items-center justify-center' sx={{ fontWeight: '600' }} >No Items Founds</Typography>
			) : (
				<List className="w-full bg-white">
					{filteredFiles.map(item => {
						return <FileListItem key={item.id} item={item}></FileListItem>;
					})}
				</List>
			)}
		</Fragment>
	);
}

export default FileList;
