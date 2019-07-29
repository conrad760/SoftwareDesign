import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    history
}) => {
    const [formData, setFormData] = useState({
        Address_1: '',
        Address_2: '',
        City: '',
        State: '',
        Zipcode: ''
    });

    const { name, Address_1, Address_2, City, State, Zipcode } = formData;

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            Address_1: loading || !profile.Address_1 ? '' : profile.Address_1,
            Address_2: loading || !profile.Address_2 ? '' : profile.Address_2,
            City: loading || !profile.City ? '' : profile.City,
            State: loading || !profile.State ? '' : profile.State,
            Zipcode: loading || !profile.Zipcode ? '' : profile.Zipcode
        });
    }, [loading]);

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    };

    return (
        <Fragment>
            <div>
                <h1 className='large text-primary'>Update Profile</h1>
                <p className='lead'>
                    <i className='fas fa-user' /> Let's get started!
                </p>
                <form action='/' className='form' onSubmit={e => onSubmit(e)}>
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
            </div>
        </Fragment>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
