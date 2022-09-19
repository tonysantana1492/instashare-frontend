import LoginPage from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const LoggedOutRouter = () => {
	return (
		<>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/" exact element={<LoginPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</>
	);
};
