import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profile';

const Navbar = ({
    getCurrentProfile,
    profile,
    auth: { isAuthenticated, loading },
    logout
}) => {
    const authLinkNoProfile = (
        <ul>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user' />{' '}
                    <span className='hide-sm'> Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt' />
                    <span className='hide-sm'> Logout</span>
                </a>
            </li>
        </ul>
    );

    const authLinks = (
        <ul>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user' />{' '}
                    <span className='hide-sm'> Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to='/quotes'>
                    <i className='fas fa-water' />{' '}
                    <span className='hide-sm'> Quotes</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt' />
                    <span className='hide-sm'> Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    {' '}
                    <i className='fas fa-car' /> Fuel Picker{' '}
                </Link>
            </h1>
            {!loading && isAuthenticated && (
                <Fragment>
                    {profile !== null ? authLinkNoProfile : authLinks}
                </Fragment>
            )}
            {!loading && !isAuthenticated && <Fragment>{guestLinks}</Fragment>}
        </nav>
    );
};

Navbar.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getCurrentProfile, logout }
)(Navbar);
