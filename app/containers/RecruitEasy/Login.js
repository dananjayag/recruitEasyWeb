import React from 'react';
import { Input, Button, Form, Icon } from 'antd';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Text from 'components/Text';
import _get from 'lodash/get';
import { login, clearError } from './reacruit-easy.actions';
import './recruitEasy.scss';

const iconStyle = {
  paddingRight: 10,
  fontSize: 30,
  color: '#036',
};

/* eslint-disable react/prefer-stateless-function */
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { login } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values);
      }
    });
  };

  onChange = () => {
    const { loginError, clearError, form } = this.props;
    if (loginError) {
      clearError();
    }
    form.validateFields(() => {});
  };

  render() {
    const { form, loginError } = this.props;
    const { getFieldDecorator, getFieldError, isFieldTouched } = form;

    // Only show error after a field is touched.
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError =
      isFieldTouched('password') && getFieldError('password');
    return (
      <div className="login-container">
        <Icon
          spin={false}
          rotate={90}
          style={iconStyle}
          theme="filled"
          type="up-circle"
        />
        <Text className="label" size={3}>
          Login to Recruit Easy
        </Text>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your Email!' }],
            })(<Input placeholder="Email" onChange={this.onChange} />)}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                type="password"
                placeholder="Password"
                onChange={this.onChange}
              />,
            )}
          </Form.Item>
          {loginError && (
            <Text className="error" size={3}>
              Invalid Email or Password
            </Text>
          )}
          <a className="login-form-forgot" href="/forgotPassword">
            Forgot password
          </a>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      loginError: _get(state.get('auth'), 'loginError'),
    }),
    {
      login,
      clearError,
    },
  ),
  Form.create({ name: 'horizontal_login' }),
)(Login);
