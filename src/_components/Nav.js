import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';
import Logo from './Logo';
import { AppBar, Toolbar } from '@mui/material';

const Nav = () => {
	const isLogin = useSelector(state => state.userReducer.isLogin);

	// only show nav when logged in
	if (!isLogin) return null;

	return (
		<AppBar elevation={0} variant='outlined' sx={{backgroundColor: 'white'}} position="fixed">
			<Toolbar className="flex w-full justify-between place-items-center">
				<Logo></Logo>
				<UserMenu></UserMenu>
			</Toolbar>			
		</AppBar>
	);
};

export default Nav;
