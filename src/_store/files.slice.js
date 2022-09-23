import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { TOKEN_ENV } from 'constants';
import { baseUrl } from 'constants';
import { fetchWrapper } from '_helpers';

export const getFiles = () => async dispatch => {
	dispatch(setIsloading(true));
	try {
		const response = await fetchWrapper.get(`${baseUrl}/filemanager`);
		dispatch(setAllFiles(response));
	} catch (error) {
		dispatch(fileOperationError(error));
	}
	dispatch(setIsloading(false));
};

export const uploadFile = data => async dispatch => {
	
	try {
		const token = localStorage.getItem(TOKEN_ENV);

		const response = await axios.post(`${baseUrl}/filemanager/upload`, data, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
		
		dispatch(setAllFiles(response.data));
	} catch (error) {
		dispatch(fileOperationError(error));
	}
	
};

export const downloadFile = (id, name) => async dispatch => {

	dispatch(setIsloading(true));
	try {
		const token = localStorage.getItem(TOKEN_ENV);
		const response = await fetch(`${baseUrl}/filemanager/download/${id}`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token
			}
		});

		const blob = await response.blob();
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = `${name}.zip`;
		document.body.appendChild(link);
		link.click();
		
	} catch (error) {
		dispatch(fileOperationError(error));
	}

	dispatch(setIsloading(false));
	
};

export const editNameFile = data => async dispatch => {
	dispatch(setIsloading(true));
	try {
		const response = await fetchWrapper.patch(`${baseUrl}/filemanager/${data.id}/name`, { name: data.name });
		dispatch(setAllFiles(response));
	} catch (error) {
		dispatch(fileOperationError(error));
	}
	dispatch(setIsloading(false));
};

const filesAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const {
	selectAll: selectFiles,
	selectEntities: selectFilesEntities,
	selectById: selectFileById
} = filesAdapter.getSelectors(state => state.filesReducer);

const filesSlice = createSlice({
	name: 'fileManager',
	initialState: filesAdapter.getInitialState({
		success: true,
		isLoading: false,
		selectedItemId: '1',
		errors: []
	}),
	reducers: {
		setSelectedItem: (state, action) => {			
			state.selectedItemId = action.payload;
		},

		setIsloading: (state, action) => {
			state.isLoading = action.payload;
		},

		fileOperationError: (state, action) => {
			state.success = false;
			state.errors = action.payload;
			state.isLoading = false;
		},
		
		setAllFiles: filesAdapter.setAll
	},
	extraReducers: {}
});

export const { setSelectedItem, setIsloading, setAllFiles, fileOperationError } = filesSlice.actions;

export const filesReducer = filesSlice.reducer;
