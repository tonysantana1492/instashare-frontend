import { List, Typography } from '@mui/material';
import { Fragment } from 'react';
import FileListItem from './components/FileListItem';

const FileList = ({filteredFiles}) => {
	
	return (
		<Fragment>
			{filteredFiles.length === 0 ? (
				<Typography component="span" className=' mt-12 flex items-center justify-center' sx={{ fontWeight: '600', padding: '50px' }} >No Items Founds</Typography>
			) : (
				<List className="w-full">
					{filteredFiles.map(item => {
						return <FileListItem key={item.id} item={item}></FileListItem>;
					})}
				</List>
			)}
		</Fragment>
	);
}

export default FileList;
