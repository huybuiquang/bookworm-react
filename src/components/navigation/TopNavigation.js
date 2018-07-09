import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Menu, Dropdown, Image} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth'
import {allBooksSelector} from '../../reducers/books';

class TopNavigation extends Component {

    render() {
        const {user, logout, hasBook} = this.props;
        return (
            <Menu secondary pointing>
                <Menu.Item as={Link} to='/dashboard'>Dashboard</Menu.Item>
                {
                    hasBook && <Menu.Item as={Link} to='/books/new'>Add new book</Menu.Item>
                }
                <Menu.Menu position="right">
                    <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)}/>}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>logout()}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        );
    }
}

TopNavigation.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
    hasBook: PropTypes.bool.isRequired,
};

function mapStateToProps(state){
    return{
        user: state.user,
        hasBook: allBooksSelector(state).length>0
    }
}
export default connect(mapStateToProps,{ logout: actions.logout})(TopNavigation);