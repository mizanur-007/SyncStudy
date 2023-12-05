import Lottie from 'lottie-react';
import errorLogo from "../../../public/errorAnime.json"
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
    return (
        <div className='max-h-[100vh] text-center mb-11'>
            <div className=' w-[350px] md:w-[550px] lg:w-[640px] mx-auto'>
            <Lottie animationData={errorLogo}></Lottie>
            </div>
            <Link to={'/'}><motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} className='btn btn-secondary text-white font-bold'>Go Back</motion.button></Link>
        </div>
    );
};

export default ErrorPage;