import { CircularProgress, Typography } from '@mui/material';



const Loading = () => {
	return (

		<div data-cy='loading-component' className="h-screen flex w-full flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24">
			<Typography className="text-13 sm:text-20 mb-16" color="textSecondary">
				Loading...
			</Typography>			
			<CircularProgress sx={{ color: 'blue' }} />
		</div>
	);
};

export default Loading;
