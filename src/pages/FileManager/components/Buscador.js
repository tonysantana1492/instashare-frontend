import { Search } from '@mui/icons-material';
import { IconButton, InputBase, Paper } from '@mui/material';

const Buscador = ({searchString, setSearchString }) => {
	return (
		<Paper className='flex items-center justify-center' component="form" variant="outlined">
			<InputBase
				value={searchString}
				sx={{ marginLeft: '10px' }}
				placeholder="Search..."
				inputProps={{ 'aria-label': 'search file' }}
				onChange={event => setSearchString(event.target.value)}
			/>
			<IconButton type="submit" aria-label="search">
				<Search />
			</IconButton>
		</Paper>
	);
};

export default Buscador;
