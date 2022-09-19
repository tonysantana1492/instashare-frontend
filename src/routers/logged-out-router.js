import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const LoggedOutRouter = () => {
	return (
		<>
			<Routes>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</>
	);
};
