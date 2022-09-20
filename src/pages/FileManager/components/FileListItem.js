import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Edit, MoreVert, Download } = require('@mui/icons-material');
const {
	IconButton,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Menu,
	ListItem,
	ListItemAvatar,
	Avatar,
	Typography,
	Divider,
	ListItemSecondaryAction
} = require('@mui/material');
const { downloadFile } = require('_store');
const { default: BoardTitle } = require('./NameEditable');

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
					<Avatar sx={{ background: '#1b1b66', alignContent: 'center', alignItems: 'center' }}>{item.name && item.name[0].toUpperCase()}</Avatar>
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
							<span className=' text-grey-500 '>{item.ext}</span>
							<Typography
								component="span"
								variant="body2"
								sx={{ display: 'inline', marginRight: 1, marginLeft: 1, color: 'gray' }}
								color="textPrimary"
							>
								|
							</Typography>
							<span className=' text-grey-500 '>{item.size === '' ? '-' : formatSize(item.size)}</span>
							<Typography
								component="span"
								variant="body2"
								sx={{ display: 'inline', marginRight: 1, marginLeft: 1 }}
								color="textPrimary"
							>
								|
							</Typography>
							{item.status ? (
								<Typography
									className="font-normal hover:underline cursor-pointer"
									component="span"
									sx={{ color: 'green' }}
									onClick={() => dispatch(downloadFile(item.id, item.name))}
								>
									downloadable
								</Typography>
							) : (
								<Typography component="span" sx={{ color: 'red' }}>
									undownloadable
								</Typography>
							)}
							
						</div>
					</div>
				</div>

				<ListItemSecondaryAction>
					<IconButton
						aria-owns={anchorEl ? 'actions-menu' : null}
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

	/*return (
		<TableRow
			hover
			onClick={() => dispatch(setSelectedItem(item.id))}
			selected={item.id === selectedItemId}
			className="cursor-pointer"
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell className="font-medium">
				<BoardTitle
					name={item.name}
					id={item.id}
					userId={item.userId}
					formOpen={formOpen}
					handleOpenForm={handleOpenForm}
					handleCloseForm={handleCloseForm}
				></BoardTitle>
			</TableCell>
			<TableCell className="hidden sm:table-cell">{item.type}</TableCell>
			<TableCell className="hidden sm:table-cell">{item.userId === userLogin.id ? 'SI' : 'NO'}</TableCell>
			<TableCell className="text-center hidden sm:table-cell">
				{item.size === '' ? '-' : formatSize(item.size)}
			</TableCell>
			<TableCell className="hidden sm:table-cell">{item.updateAt}</TableCell>

			<TableCell>				

				<div className="">
					<IconButton
						aria-owns={anchorEl ? 'actions-menu' : null}
						aria-haspopup="true"
						onClick={handleMenuClick}
						variant="outlined"
						size="small"
					>
						<MoreVert className="text-20"></MoreVert>
					</IconButton>
					<Menu id="actions-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
						<MenuItem onClick={handleOpenForm}>
							<ListItemIcon className="min-w-40">
								<Edit></Edit>
							</ListItemIcon>
							<ListItemText primary="Rename List" />
						</MenuItem>
						<MenuItem onClick={() => dispatch(downloadFile(item.id, item.name))}>
							<ListItemIcon className="min-w-40">
								<Download></Download>
							</ListItemIcon>
							<ListItemText primary="Download" />
						</MenuItem>
					</Menu>
				</div>
			</TableCell>
		</TableRow>
	);*/
};

export default FileListItem;
