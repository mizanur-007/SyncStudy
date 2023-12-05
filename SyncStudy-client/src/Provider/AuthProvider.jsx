import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../Config/Firebase/firebase.config'
import axios from 'axios';

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    //signup with email pass
    const signUp = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
      }

              //set users name and image 

  const updateUser = (name,image)=>{
    return updateProfile(auth.currentUser, {
         displayName: name, photoURL: image
       })
   }

        //signIn a user
  const signIn = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

    //googlelogin
    const googleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
      }

        //githublogin
  const githubLogin = ()=>{
    setLoading(true)
    return signInWithPopup(auth, githubProvider)
  }

      // observer 
      useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        const loggedUser = {email: user?.email}

        // jwt 
        if(user){
          axios.post("https://sync-study-server.vercel.app/jwt",loggedUser, {withCredentials:true})
          .then((res)=>{
            console.log(res.data)
          })
          .catch((error)=>{
            console.log(error.message)
          })
        }
       else{
        axios.post("https://sync-study-server.vercel.app/logout",loggedUser, {withCredentials:true})
        .then((res)=>{
          console.log(res.data)
        })
        .catch((error)=>{
          console.log(error.message)
        })
        }

        });

        return () => {
          unSubscribe();
        };
      }, []);

            //logout
            const logOut =()=>{
                return signOut(auth)
              }

    const authInfo ={
        user,
        loading,
        signUp,
        signIn,
        googleLogin,
        githubLogin,
        updateUser,
        logOut
      };

    return (
        <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;