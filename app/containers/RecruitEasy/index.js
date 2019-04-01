/*
 * HomePage
 *
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import _get from 'lodash/get';
import Text from 'components/Text';
import DashBoard from 'containers/DashBoard';
import Job from 'containers/Job';
import Interview from 'containers/Interview';
import {compose} from 'recompose';
import { logOut } from './reacruit-easy.actions';
import './recruitEasy.scss';
import Login from './Login';
import SignUp from './SignUp';
const iconStyle = {
  paddingRight: 10,
  fontSize: 30,
  color: '#036',
};

/* eslint-disable react/prefer-stateless-function */
class RecruitEasy extends React.PureComponent {
  renderHomeRoutes = () => (
    <div className="loginBody">
      <Route path="/signup" component={SignUp} />
      <Route path="/" exact component={Login} />
    </div>
  );

  renderRecruiterRoutes = () => (
    <React.Fragment>
      <Route path="/" exact component={DashBoard} />
      <Route path="/job/:id" component={Job} />
      <Route path="/interview/:id" component={Interview} />
    </React.Fragment>
  );

  handleLogout = () => {
    const { logOut } = this.props;
    logOut();
  };

  changeRoute = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { token } = this.props;
    return (
      <div>
        <div className="header-container">
          <div>
            <Text onClick={this.changeRoute} className="brand" size={1}>
              <Icon
                spin={false}
                rotate={90}
                style={iconStyle}
                theme="filled"
                type="up-circle"
              />
              Recruit Easy
            </Text>
          </div>
          <div className="right-container">
            <Button type="primary refer-your-friend" size="large">
              Refer Your Friend!
            </Button>
            {!token && (
              <>
                <Link to="/">
                  <Button type="primary" size="large">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button type="primary" size="large">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            {token && (
              <Button type="primary" size="large" onClick={this.handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>
        <div className="body-container">
          {token ? this.renderRecruiterRoutes() : this.renderHomeRoutes()}
        </div>
        <div />
      </div>
    );
  }
}

RecruitEasy.protoTypes = {
  token: PropTypes.string,
  history: PropTypes.object,
};

RecruitEasy.defaultProps = {
  token: null,
  history: {},
};

export default compose(
  withRouter,
  connect(
    state => ({ token: _get(state.get('auth'), 'token') }),
    { logOut },
  ),
)(RecruitEasy);
