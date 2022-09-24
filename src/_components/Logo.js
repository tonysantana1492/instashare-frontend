import { Typography } from "@mui/material";

const Logo = () => {

    return (
		<div data-cy='logo' className="flex">
		<Typography sx={{ color: 'gray' }} component="span" variant="h6">
			insta
		</Typography>
		<Typography sx={{ color: 'teal', fontWeight: '800' }} component="span" variant="h5">
			SHARE
		</Typography>
	</div>
	);
	
};

export default Logo;
