import React from 'react';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import {allBooksSelector} from '../../reducers/books';
import AddBookCtA from '../ctas/AddBookCtA';

const DashBoardPage = ({isConfirmed, books}) => {
    return (
        <div>
            {!isConfirmed && <ConfirmEmailMessage/>}
            {books.length === 0 && <AddBookCtA/>}
        </div>
    );
};

DashBoardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    books: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,).isRequired,
};

function mapStateToProps(state){
    return{
        isConfirmed: !!state.user.confirmed,
        books: allBooksSelector(state)
    }
}
export default connect(mapStateToProps,{})(DashBoardPage);