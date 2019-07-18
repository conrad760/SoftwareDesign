import React from 'react';

const Landing = () => {
    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>Fuel Picker</h1>
                    <p className='lead'>
                        Create Fuel Quotes and Save money now, Get a quote
                        today.
                    </p>
                    <div className='buttons'>
                        <a href='register.html' className='btn btn-primary'>
                            Sign Up
                        </a>
                        <a href='login.html' className='btn'>
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Landing;
