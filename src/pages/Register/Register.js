import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@mui/material';
import JWTRegister from './FormularioRegister';
import Logo from '_components/Logo';
import { useSelector } from 'react-redux';
import Loading from 'pages/Loading/Loading';

const Register = () => {
	
	return (
		<div className="flex h-screen items-center justify-center p-16 md:p-24 bg-grey-200">
			
				<motion.div
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					className="flex w-full max-w-400 md:max-w-3xl overflow-hidden items-center justify-center"
				>
					<Card variant="outlined" className="flex flex-col w-full max-w-320 items-center justify-center">
						<CardContent className="flex flex-col items-center justify-center w-full max-w-320">
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
								<div className="flex items-center mb-10">
									<Logo></Logo>
								</div>
							</motion.div>
							<JWTRegister />
						</CardContent>

						<div className="flex flex-col items-center justify-center mb-10 mt-5">
							<span className="font-normal">Already have an account?</span>
							<Link className="font-normal text-blue-500 hover:underline" to="/">
								Login
							</Link>
						</div>
					</Card>
				</motion.div>
			
		</div>
	);
};

export default Register;
