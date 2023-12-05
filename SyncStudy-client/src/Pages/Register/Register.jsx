import Lottie from "lottie-react";
import { AiOutlineMail } from "react-icons/ai";
import { BsKey, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { HiCamera } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import registerlogo from '../../../public/registrationAnimation.json'
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
const Register = () => {
  const { signUp, updateUser, googleLogin, githubLogin } =
  useContext(AuthContext);
  const location = useLocation();

const navigate = useNavigate();

const passwordRegExCapital = /^(?=.*[A-Z]).+$/;
const passwordRegExSpecial = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]).+$/;

    //email password registration
    const handleRegistration = (event) => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      const image = form.image.value;
      const name = form.name.value;

      if(!passwordRegExCapital.test(password)){
        toast.error("Password must contain one capital letter",{
          autoClose: 2000
        })
        return;
      }
      else if(!passwordRegExSpecial.test(password)){
        toast.error("Password must contain one special character",{
          autoClose: 2000
        })
        return;
      }

      signUp(email, password)
        .then(() => {
          updateUser(name, image).then(() => {
            toast.success("Registration Successful");
            navigate(location.state? location.state:"/")
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };

    //google
    const handleGoogleLogin = () => {
      googleLogin()
        .then(() => {
          toast.success("Registration successful", {
            autoClose: 2000,
          });
          navigate(location.state? location.state:"/")
        })
        .catch(() => {
          toast.error("Registration Unsuccessful", {
            autoClose: 2000,
          });
        });
    };
    //github
    const handleGithubLogin = () => {
      githubLogin()
        .then(() => {
          toast.success("Registration successful", {
            autoClose: 2000,
          });
          navigate(location.state? location.state:"/")
        })
        .catch((error) => {
          toast.error(error.message, {
            autoClose: 2000,
          });
        });
    };
    return (
        <div className="flex flex-row-reverse items-center justify-between lg:gap-52  bg-[#dbf5fb] px-5 rounded-xl pb-11 pt-8">
        <div className="flex-1 ml-8 md:ml-16">
          <h1 className="text-3xl text-white text-center bg-gradient-to-r from-[#11bfef] via-[#3cecfc] to-[#a7e4f4] mb-7 py-9 rounded-3xl font-bold w-80">
            Registration
          </h1>
          <form onSubmit={handleRegistration}>
            <div className="form-control mb-6 w-80">
              <label className="input-group">
                <span className="text-3xl bg-[#bee8f6]">
                  <RxAvatar />
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  className="input input-bordered w-80 bg-[#bee8f6]"
                />
              </label>
            </div>
            <div className="form-control mb-6 w-80">
              <label className="input-group">
                <span className="text-3xl bg-[#bee8f6]">
                  <HiCamera />
                </span>
                <input
                  type="text"
                  name="image"
                  required
                  placeholder="Image URL"
                  className="input input-bordered w-80 bg-[#bee8f6]"
                />
              </label>
            </div>
            <div className="form-control mb-6 w-80">
              <label className="input-group">
                <span className="text-3xl bg-[#bee8f6]">
                  <AiOutlineMail />
                </span>
                <input
                  type="text"
                  name="email"
                  required
                  placeholder="Email"
                  className="input input-bordered w-80 bg-[#bee8f6]"
                />
              </label>
            </div>
            <div className="form-control w-80">
              <label className="input-group">
                <span className="text-3xl bg-[#bee8f6]">
                  <BsKey />
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  className="input input-bordered w-80 bg-[#bee8f6]"
                />
              </label>
            </div>
            <div className="form-control flex flex-row items-center mt-4 gap-3">
              <input
                type="checkbox"
                name="checkbox"
                className="checkbox"
                required
              />
              <span className="block">Accept our terms & policies</span>
            </div>
            <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }}
              type="submit"
              className="btn btn-block bg-gradient-to-br from-[#11bfef] to-[#8ff7d1] text-xl font-bold text-white w-80 mt-5"
            >
              Register
            </motion.button>
            <p className="mt-3">
              Already Have An Account?{" "}
              <Link className="text-[#11bfef] font-semibold" to={"/login"}>
                Login
              </Link>{" "}
            </p>
          </form>
          <div className="flex flex-col items-center ml-20 lg:flex-row">
            <div className="grid place-items-center text-3xl">
              <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} onClick={handleGoogleLogin} className="mr-28 md:mr-20 lg:mr-0">
                <FcGoogle />
              </motion.button>
            </div>
            <div className="divider lg:divider-horizontal mr-28 md:mr-20 lg:mr-0">OR</div>
            <div className="grid place-items-center text-3xl">
              <motion.button whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.8 }} onClick={handleGithubLogin}  className="mr-28 md:mr-20 lg:mr-0 lg:ml-4">
                <BsGithub />
              </motion.button>
            </div>
          </div>
        </div>
        <div className="max-h-[100vh] mb-32 lg:mb-0 flex-1 hidden md:block">
          <Lottie animationData={registerlogo}></Lottie>
        </div>
      </div>
    );
};

export default Register;