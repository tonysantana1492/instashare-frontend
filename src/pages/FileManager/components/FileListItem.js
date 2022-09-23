import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, MoreVert, Download } from '@mui/icons-material';
import {
	IconButton,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Menu,
	ListItem,
	Avatar,
	Typography,
	Divider,
	ListItemSecondaryAction
} from '@mui/material';
import { downloadFile } from '_store';
import BoardTitle from './NameEditable';

const FileListItem = ({ item }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userReducer.user);

	const formatSize = size => {
		const i = Math.floor(Math.log(size) / Math.log(1024));

		return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
	};

	const [formOpen, setFormOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const alloEdit = item.userId === userLogin.id;

	const handleOpenForm = ev => {
		ev.stopPropagation();

		if (alloEdit) {
			setFormOpen(true);
		}
	};

	const handleCloseForm = () => {
		setFormOpen(false);
	};

	useEffect(() => {
		if (formOpen && anchorEl) {
			setAnchorEl(null);
		}
	}, [anchorEl, formOpen]);

	function handleMenuClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	return (
		<Fragment>
			<ListItem className="flex w-full items-center justify-center" alignItems="flex-start">
				<div className="flex items-center justify-center w-full">
					<Avatar sx={{ background: '#1b1b66', alignContent: 'center', alignItems: 'center' }}>
						{item.name && item.name[0].toUpperCase()}
					</Avatar>
					<div className="flex flex-col md:flex-row items-center justify-center w-full">
						<BoardTitle
							name={item.name}
							id={item.id}
							userId={item.userId}
							formOpen={formOpen}
							handleOpenForm={handleOpenForm}
							handleCloseForm={handleCloseForm}
						></BoardTitle>
						<div className="flex pl-12 w-full md:w-1/2 items-center justify-start md:justify-start">
							<span className=" text-grey-500 ">{item.ext}</span>
							<Typography
								component="span"
								variant="body2"
								sx={{ display: 'inline', marginRight: 1, marginLeft: 1, color: 'gray' }}
								color="textPrimary"
							>
								|
							</Typography>
							<span className=" text-grey-500  ">
								{item.size === '' ? '-' : formatSize(item.size)}
							</span>
							
							{item.status ? (
								<Typography
									className="font-normal hover:underline cursor-pointer"
									component="span"
									sx={{
										color: 'green',
										backgroundColor: '#c2f9db',
										paddingLeft: '6px',
										paddingRight: '6px',
										marginLeft: '12px',
										marginRight: '8px',
										borderRadius: '10rem'
									}}
									onClick={() => dispatch(downloadFile(item.id, item.name))}
								>
									downloadable
								</Typography>
							) : (
								<Typography
									component="span"
									sx={{
										color: 'red',
										backgroundColor: '#efe5e5',
										paddingLeft: '6px',
										paddingRight: '6px',
										marginLeft: '12px',
										marginRight: '8px',
										borderRadius: '10rem'
									}}
								>
									undownloadable
								</Typography>
							)}
							{alloEdit && (
								
									<Typography
										component="span"
										sx={{
											color: 'black',
											backgroundColor: '#fbed8d',
											paddingLeft: '6px',
											paddingRight: '6px',
											borderRadius: '10rem'
										}}
									>
										owner
									</Typography>
								
							)}
						</div>
					</div>
				</div>

				<ListItemSecondaryAction>
					<IconButton
						aria-owns={anchorEl ? 'actions-menu' : null}
						data-testid="buttonsetting-id"
						aria-haspopup="true"
						onClick={handleMenuClick}
						variant="outlined"
						size="small"
					>
						<MoreVert className="text-20"></MoreVert>
					</IconButton>
					<Menu id="actions-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
						<MenuItem onClick={handleOpenForm} disabled={!alloEdit}>
							<ListItemIcon className="min-w-40">
								<Edit></Edit>
							</ListItemIcon>
							<ListItemText primary="Rename File" />
						</MenuItem>
						<MenuItem onClick={() => dispatch(downloadFile(item.id, item.name))} disabled={!item.status}>
							<ListItemIcon className="min-w-40">
								<Download></Download>
							</ListItemIcon>
							<ListItemText primary="Download" />
						</MenuItem>
					</Menu>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider variant="inset" component="li" />
		</Fragment>
	);
};

export default FileListItem;
