import React from 'react';
import Banner from '../Banner/Banner';
import FAQ from '../FAQ/FAQ';
import Notes from '../Notes/Notes';
import Feature from '../Feature/Feature';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Feature></Feature>
            <Notes></Notes>  
            <FAQ></FAQ> 
        </div>
    );
};

export default Home;