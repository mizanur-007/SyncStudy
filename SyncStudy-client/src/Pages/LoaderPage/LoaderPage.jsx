import Lottie from 'lottie-react';
import loaderAnime from "../../../public/loading.json"

const LoaderPage = () => {
    return (
        <div>
            <Lottie animationData={loaderAnime}></Lottie>
        </div>
    );
};

export default LoaderPage;