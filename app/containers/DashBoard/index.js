/* eslint-disable no-shadow */
/*
 * HomePage
 *
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { withRouter } from 'react-router';
import { Button, Modal, Form, Input, InputNumber, Row, Col } from 'antd';
import { compose } from 'recompose';
import Text from 'components/Text';
import _get from 'lodash/get';
import _noop from 'lodash/noop';
import { getJobs, createJob } from './actions';
import { jobColumns } from './constants';
import 'react-table/react-table.css';
import './style.scss';

const INTIAL_STATE = {
  isShowModal: false,
};

/* eslint-disable react/prefer-stateless-function */
class RecruiterDashBoard extends React.PureComponent {
  state = INTIAL_STATE;

  componentDidMount() {
    const { getJobs } = this.props;
    getJobs();
  }

  toggleModal = () => {
    const { form } = this.props;
    this.setState(prevState => ({
      isShowModal: !prevState.isShowModal,
    }));
    form.resetFields();
  };

  handleSubmit = () => {
    const { form, createJob } = this.props;
    const { validateFields } = form;
    validateFields((err, values) => {
      if (!err) {
        console.log('job_values', values);
        createJob(values, this.toggleModal);
      }
    });
  };

  renderModal = () => {
    const { isShowModal } = this.state;
    const { form } = this.props;
    const { getFieldDecorator, getFieldError } = form;
    const titleError = getFieldError('title');
    const hiringOrganizationError = getFieldError('hiring_organization');
    return (
      <Modal
        title="Create a Job"
        width="80%"
        top="0"
        visible={isShowModal}
        onOk={this.handleSubmit}
        onCancel={this.toggleModal}
        className="no-overFlow"
      >
        <Form onSubmit={this.handleSubmit} className="login-form  job-form">
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                label="Title"
                validateStatus={titleError ? 'error' : ''}
                help={titleError || ''}
              >
                {getFieldDecorator('title', {
                  rules: [
                    { required: true, message: 'Please Enter Job Title !' },
                  ],
                })(<Input placeholder="Title" onChange={this.onChange} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                label="Hiring For"
                validateStatus={hiringOrganizationError ? 'error' : ''}
                help={hiringOrganizationError || ''}
              >
                {getFieldDecorator('hiring_organization', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter the Hiring Organization!',
                    },
                  ],
                })(
                  <Input
                    placeholder="Hiring Organization"
                    onChange={this.onChange}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('company_url')(
                  <Input placeholder="Company Url" onChange={this.onChange} />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('job_location')(
                  <Input
                    placeholder="Job Location"
                    setFieldsValue=""
                    onChange={this.onChange}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={6}>
              <Form.Item label="Min Salary">
                {getFieldDecorator('min_salary')(
                  <InputNumber
                    placeholder="In Lakh's"
                    step={0.1}
                    onChange={this.onChange}
                    setFieldsValue={1}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Max Salary">
                {getFieldDecorator('max_salary')(
                  <InputNumber
                    placeholder="In Lakh's"
                    step={0.1}
                    onChange={this.onChange}
                    setFieldsValue={1}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col>
              <Form.Item>
                {getFieldDecorator('job_description')(
                  <Input.TextArea
                    placeholder="Job Description"
                    onChange={this.onChange}
                    setFieldsValue=""
                    rows={10}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  };

  onRowClick = (state, rowInfo, column) => {
    const { history } = this.props;
    const {
      original: { _id },
    } = rowInfo;
    history.push(`/job/${_id}`);
  };

  renderJobs = (jobs, numberOfjobs) => (
    <div className="jobHolder">
      <ReactTable
        data={jobs}
        columns={jobColumns}
        showPagination
        pageSizeOptions={[numberOfjobs]}
        pageSize={numberOfjobs}
        sortable
        multiSort
        resizable={false}
        filterable
        className="-striped -highlight"
        getTrProps={(state, rowInfo, column) => ({
          onClick: () => {
            this.onRowClick(state, rowInfo, column);
          },
          style: {
            cursor: 'pointer',
          },
        })}
      />
    </div>
  );

  render() {
    const { jobs } = this.props;
    const { isShowModal } = this.state;
    // eslint-disable-next-line radix
    const numberOfjobs = parseInt((window.innerHeight - 307) / 40);
    return (
      <div className="jobsContainer">
        <div className="table-header">
          <Text size={1}>Recent Jobs</Text>
          <Button type="primary" onClick={this.toggleModal}>
            Create Job
          </Button>
        </div>
        {this.renderJobs(jobs, numberOfjobs)}
        {this.renderModal()}
      </div>
    );
  }
}

RecruiterDashBoard.propTypes = {
  jobs: PropTypes.array,
  getJobs: PropTypes.func,
  createJob: PropTypes.func,
  history: PropTypes.object,
};

RecruiterDashBoard.defaultProps = {
  jobs: [],
  getJobs: _noop,
  createJob: _noop,
  history: {},
};

export default compose(
  withRouter,
  connect(
    state => ({ jobs: _get(state.get('dashboard'), 'jobs') }),
    { getJobs, createJob },
  ),
  Form.create({ name: 'job_creation' }),
)(RecruiterDashBoard);
