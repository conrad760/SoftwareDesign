import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div>
            <div className='dash-buttons'>
                <Link to='/edit-profile' className='btn btn-light'>
                    <i className='fas fa-user-circle text-primary' />
                    Edit Profile
                </Link>
                <Link to='/create-quote' className='btn btn-light'>
                    <i className='fas fa-water text-primary' />
                    Create a quote
                </Link>
            </div>
        </div>
    );
};

export default DashboardActions;
