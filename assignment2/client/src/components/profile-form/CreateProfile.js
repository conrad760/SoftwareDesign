import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        Address_1: '',
        Address_2: '',
        City: '',
        State: '',
        Zipcode: ''
    });

    const { Address_1, Address_2, City, State, Zipcode } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };

    return (
        <Fragment>
            <h1 className='large text-primary'>Create Your Profile</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Let's get started!
            </p>
            <form action='/' className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        name='name'
                        placeholder='name'
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Address 1'
                        name='Address_1'
                        value={Address_1}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Address 2'
                        name='Address_2'
                        value={Address_2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='State'
                        name='State'
                        value={State}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='City'
                        name='City'
                        value={City}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Zip'
                        name='Zipcode'
                        value={Zipcode}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        minlength='8'
                    />
                </div>
                <input
                    type='submit'
                    value='Update'
                    className='btn btn-primary'
                />
            </form>
            <p className='my-1'>
                Want to change your Password or Primary email?{' '}
                <a href='Update_Profile.html'>Change Account information</a>
            </p>
        </Fragment>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};

export default connect(
    null,
    { createProfile }
)(withRouter(CreateProfile));
