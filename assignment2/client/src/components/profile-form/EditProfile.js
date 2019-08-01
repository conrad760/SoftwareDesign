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

    const { Address_1, Address_2, City, State, Zipcode } = formData;

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            Address_1: loading || !profile.Address_1 ? '' : profile.Address_1,
            Address_2: loading || !profile.Address_2 ? '' : profile.Address_2,
            City: loading || !profile.City ? '' : profile.City,
            State: loading || !profile.State ? '' : profile.State,
            Zipcode: loading || !profile.Zipcode ? '' : profile.Zipcode
        });
    }, [loading, getCurrentProfile]);

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
                            placeholder='City'
                            name='City'
                            value={City}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <select
                            name='State'
                            value={State}
                            defaultValue='State'
                            required
                            onChange={e => onChange(e)}
                        >
                            <option value='AL'>Alabama</option>
                            <option value='AK'>Alaska</option>
                            <option value='AZ'>Arizona</option>
                            <option value='AR'>Arkansas</option>
                            <option value='CA'>California</option>
                            <option value='CO'>Colorado</option>
                            <option value='CT'>Connecticut</option>
                            <option value='DE'>Delaware</option>
                            <option value='DC'>District Of Columbia</option>
                            <option value='FL'>Florida</option>
                            <option value='GA'>Georgia</option>
                            <option value='HI'>Hawaii</option>
                            <option value='ID'>Idaho</option>
                            <option value='IL'>Illinois</option>
                            <option value='IN'>Indiana</option>
                            <option value='IA'>Iowa</option>
                            <option value='KS'>Kansas</option>
                            <option value='KY'>Kentucky</option>
                            <option value='LA'>Louisiana</option>
                            <option value='ME'>Maine</option>
                            <option value='MD'>Maryland</option>
                            <option value='MA'>Massachusetts</option>
                            <option value='MI'>Michigan</option>
                            <option value='MN'>Minnesota</option>
                            <option value='MS'>Mississippi</option>
                            <option value='MO'>Missouri</option>
                            <option value='MT'>Montana</option>
                            <option value='NE'>Nebraska</option>
                            <option value='NV'>Nevada</option>
                            <option value='NH'>New Hampshire</option>
                            <option value='NJ'>New Jersey</option>
                            <option value='NM'>New Mexico</option>
                            <option value='NY'>New York</option>
                            <option value='NC'>North Carolina</option>
                            <option value='ND'>North Dakota</option>
                            <option value='OH'>Ohio</option>
                            <option value='OK'>Oklahoma</option>
                            <option value='OR'>Oregon</option>
                            <option value='PA'>Pennsylvania</option>
                            <option value='RI'>Rhode Island</option>
                            <option value='SC'>South Carolina</option>
                            <option value='SD'>South Dakota</option>
                            <option value='TN'>Tennessee</option>
                            <option value='TX'>Texas</option>
                            <option value='UT'>Utah</option>
                            <option value='VT'>Vermont</option>
                            <option value='VA'>Virginia</option>
                            <option value='WA'>Washington</option>
                            <option value='WV'>West Virginia</option>
                            <option value='WI'>Wisconsin</option>
                            <option value='WY'>Wyoming</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Zip'
                            name='Zipcode'
                            value={Zipcode}
                            onChange={e => onChange(e)}
                            minlength='5'
                            maxlength='9'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            minlength='8'
                            required
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
