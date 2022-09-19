import { ExitToApp } from '@mui/icons-material';
import { Avatar, Button, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JwtService from 'services/jwtService';

const UserMenu = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.userReducer.user);

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			<Button className="focus:outline-none min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
				<div className="hidden md:flex flex-col mx-4 items-end">
					<Typography component="span" className="text-black font-semibold flex capitalize">
						{user.displayname}
					</Typography>

					<Typography className="text-11 font-medium lowercase" color="textSecondary" variant="h15">
						{user.username.toString()}
					</Typography>
				</div>
				<Avatar className="md:mx-4" sx={{ background: 'teal' }}>
					{user.displayname && user.displayname[0]}
				</Avatar>
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-2'
				}}
			>
				<>
					<MenuItem
						onClick={() => {
							// dispatch(setUserLoggedOut());
							JwtService.setSession(null);
							userMenuClose();
						}}
					>
						<ListItemIcon className="min-w-40">
							<ExitToApp></ExitToApp>
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</MenuItem>
				</>
			</Popover>
		</>
	);
};

export default UserMenu;
