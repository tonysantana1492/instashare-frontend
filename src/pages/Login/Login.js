import { Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '_components/Logo';
import FormularioLogin from './FormularioLogin';

const LoginPage = () => {

	return (
		<div className="flex h-screen items-center justify-center p-16 md:p-24">
			
				<motion.div
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					className="flex w-full max-w-400 md:max-w-3xl overflow-hidden items-center justify-center"
				>
					<Card variant="hiden" className="flex flex-col w-full max-w-320 items-center justify-center">
						<CardContent className="flex flex-col items-center justify-center w-full max-w-320">
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
								<div className="flex items-center mb-10 mt-17">
									<Logo></Logo>
								</div>
							</motion.div>
							<FormularioLogin />
						</CardContent>

						<div className="flex flex-col items-center justify-center mb-10 mt-5">
							<span data-cy='ask-account' className="font-normal">Don't have an account?</span>
							<Link className="font-normal text-blue-500 hover:underline" to="/register">
								Register
							</Link>
						</div>
					</Card>
				</motion.div>
			
		</div>
	);
};

export default LoginPage;
