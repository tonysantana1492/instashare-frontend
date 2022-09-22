import { ExitToApp } from '@mui/icons-material';
import { Avatar, Button, Divider, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';
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
			<Button data-testid="usermenu-id" className="focus:outline-none min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
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
					<div className="hidden md:flex flex-col items-center justify-center p-10">
						<Typography component="span" className="text-black font-600 flex capitalize">
							{user.displayname}
						</Typography>

						<Typography className="text-4 font-medium lowercase" color="textSecondary" variant="h15">
							{user.username.toString()}
						</Typography>
					</div>
					<Divider></Divider>
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
