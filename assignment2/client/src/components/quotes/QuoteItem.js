import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moments from 'react-moment';
import { connect } from 'react-redux';

const QuoteItem = ({
    quote: { _id, gallons, delivery_add, delivery_date, price, total, avatar }
}) => (
    <div>
        <div class='quotes bg-white p-1 my-1'>
            <div>
                <a href='profile.html'>
                    <img
                        class='round-img'
                        src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
                        alt=''
                    />
                    <h4>John Doe</h4>
                </a>
            </div>
            <div>
                <p class='my-1'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint possimus corporis sunt necessitatibus! Minus nesciunt
                    soluta suscipit nobis. Amet accusamus distinctio cupiditate
                    blanditiis dolor? Illo perferendis eveniet cum cupiditate
                    aliquam?
                </p>
            </div>
        </div>
    </div>
);

QuoteItem.propTypes = {
    quote: PropTypes.object.isRequired
};

export default connect(
    null,
    {}
)(QuoteItem);
