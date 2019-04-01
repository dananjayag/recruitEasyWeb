import React from 'react';
import { Input, Button, Form, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import './recruitEasy.scss';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const iconStyle = {
  paddingRight: 10,
  fontSize: 30,
  color: '#036',
};
/* eslint-disable react/prefer-stateless-function */
class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      formValues: {},
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { formValues } = this.state;
    const { form } = this.props;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = form;

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
          Register to Recruit Easy
        </Text>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your Email!' }],
            })(<Input placeholder="Email" />)}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(<Input type="password" placeholder="Password" />)}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('confirmPassword', {
              rules: [
                { required: true, message: 'Please cofirm your Password!' },
              ],
            })(<Input type="password" placeholder="Confirm Password" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'horizontal_signup' })(Signup);
