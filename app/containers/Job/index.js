/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import moment from 'moment';
import _debounce from 'lodash/debounce';
import _omit from 'lodash/omit';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Select,
  Spin,
  Icon,
  notification,
} from 'antd';
import _get from 'lodash/get';
import _noop from 'lodash/noop';
import {
  getJob,
  createInterview,
  searchCandidate,
  createCandidate,
} from './actions';
import { interviewColumns } from './constants';
import 'react-table/react-table.css';
import './style.scss';

const INTIAL_STATE = {
  isShowModal: false,
  isSearching: false,
  isShowCandidateModal: false,
};

const transformToTable = (dataList, key) => {
  const list = dataList.map(data => ({
    ...data,
    ..._omit(data[key], '_id'),
  }));
  return list;
};
/* eslint-disable react/prefer-stateless-function */
class JobView extends React.PureComponent {
  state = INTIAL_STATE;

  componentDidMount() {
    const {
      getJob,
      match: {
        params: { id },
      },
    } = this.props;
    getJob(id);
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isShowModal: !prevState.isShowModal,
    }));
  };

  handleSubmit = () => {
    const {
      form,
      createInterview,
      match: {
        params: { id },
      },
    } = this.props;
    const { validateFields } = form;
    validateFields(
      ['candidate', 'currentSalary', 'expectedSalary'],
      (err, values) => {
        if (!err) {
          createInterview({ ...values, job: id }, this.toggleModal);
        }
      },
    );
  };

  toggleCreateCandidate = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState(prevState => ({
      isShowModal: false,
      isShowCandidateModal: !prevState.isShowCandidateModal,
    }));
  };

  toggleIsSearching = value => {
    this.setState(prevState => {
      const newisSearching = value ? false : !prevState.isSearching;
      return {
        isSearching: newisSearching,
      };
    });
  };

  onSearch = _debounce(value => {
    this.toggleIsSearching();
    const { searchCandidate } = this.props;
    searchCandidate(value, this.toggleIsSearching);
  }, 300);

  renderCreateInterViewModal = () => {
    const { isShowModal, isSearching } = this.state;
    const { form, candidates } = this.props;
    const { getFieldDecorator, getFieldError } = form;
    const candidateError = getFieldError('candidate');
    return (
      <Modal
        title="Create a Interview"
        width="50%"
        visible={isShowModal}
        onOk={this.handleSubmit}
        onCancel={this.toggleModal}
        className="no-overFlow"
      >
        <Form onSubmit={this.handleSubmit} className="login-form  job-form">
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Candidate"
                validateStatus={candidateError ? 'error' : ''}
                help={candidateError || ''}
              >
                {getFieldDecorator('candidate', {
                  rules: [
                    {
                      required: true,
                      message: 'Please Select Candidate or Create New One',
                    },
                  ],
                })(
                  <Select
                    mode="tag"
                    allowClear
                    showSearch
                    maxTagCount={1}
                    placeholder="Search Candidates by Email"
                    notFoundContent={
                      isSearching ? (
                        <Spin size="big" />
                      ) : (
                        <Button onClick={this.toggleCreateCandidate}>
                          Create a Candidate
                        </Button>
                      )
                    }
                    filterOption={false}
                    onSearch={this.onSearch}
                    style={{ width: '100%' }}
                  >
                    {candidates.map(candidate => (
                      <Select.Option key={candidate._id}>
                        {candidate.name} - {candidate.email}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={6}>
            <Col span={6}>
              <Form.Item label="Current Salary">
                {getFieldDecorator('currentSalary')(
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
              <Form.Item label="Expected Salary">
                {getFieldDecorator('expectedSalary')(
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
        </Form>
      </Modal>
    );
  };

  onCanidateSubmit = ({ error, success }) => {
    if (!error) {
      notification.success({
        message: 'Success!!',
        description: success.message,
      });
      this.toggleCreateCandidate();
      this.toggleModal();
    } else {
      notification.error({
        message: 'Error!!',
        description: error.message,
      });
    }
  };

  handleCandidateSubmit = () => {
    const { form, createCandidate } = this.props;
    const { validateFields } = form;
    validateFields(['email', 'phone', 'name'], (err, values) => {
      if (!err) {
        console.log('interview_values', values);
        createCandidate(values, this.onCanidateSubmit);
      } else {
        console.log('err', err);
      }
    });
  };

  renderCreateCandidateModal = () => {
    const { isShowCandidateModal, isSearching } = this.state;
    const { form, candidates } = this.props;
    const { getFieldDecorator, getFieldError } = form;
    const candidateNameError = getFieldError('name');
    const emailError = getFieldError('email');
    const phoneError = getFieldError('phone');
    return (
      <Modal
        title="Create a Candidate"
        width="50%"
        top="20%"
        visible={isShowCandidateModal}
        onOk={this.handleCandidateSubmit}
        onCancel={this.toggleCreateCandidate}
        className="no-overFlow"
      >
        <Form
          onSubmit={this.handleCandidateSubmit}
          className="login-form  job-form"
        >
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="Candidate Name">
                {getFieldDecorator('name', {
                  rules: [
                    { required: true, message: 'Please Enter your Candidate!' },
                  ],
                })(<Input placeholder="Candidate Name" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="Phone Number">
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                  ],
                })(
                  <Input
                    addonBefore="+91"
                    style={{ width: '100%' }}
                    minLength={10}
                    size={10}
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
      original: { _id = '' },
    } = rowInfo;
    history.push(`/interview/${_id}`);
  };

  renderInterviews = (interviews, numberOfInterviews) => (
    <div className="jobHolder">
      <ReactTable
        data={transformToTable(interviews, 'candidate')}
        columns={interviewColumns}
        showPagination
        pageSizeOptions={[numberOfInterviews]}
        pageSize={numberOfInterviews}
        sortable
        multiSort
        resizable={false}
        noDataText="No Interviews, Create One !!"
        filterable={interviews.length > 0}
        defaultFilterMethod={(filter, row, column) => {
          const id = filter.pivotId || filter.id;
          return row[id] !== undefined
            ? String(row[id])
              .toLowerCase()
              .startsWith(String(filter.value).toLowerCase())
            : true;
        }}
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

  handleBack = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { job = {}, candidates, interviews = [] } = this.props;
    const numberOfInterviews = parseInt((window.innerHeight - 393) / 37);
    const {
      title,
      job_location,
      hiring_organization,
      date_posted,
      min_salary,
      max_salary,
      job_description,
      company_url,
    } = job;
    return (
      <div className="jobsContainer">
        <div className="fit-right">
          <div className="back" onClick={this.handleBack}>
            <Icon type="left" /> Back
          </div>
          <div className="jobDetails"> Job Details and Interview List </div>
          <Button type="primary" onClick={this.toggleModal}>
            Create Interview
          </Button>
        </div>
        <div className="jobdetails-holder">
          <div>
            <Icon className="jobIcon" type="font-size" />
            <div>{title}</div>
          </div>
          <div>
            <Icon className="jobIcon" type="money-collect" />
            <div>
              {min_salary} - {max_salary} LPA
            </div>
          </div>
          <div>
            <Icon className="jobIcon" type="environment" />
            <div>{job_location || 'Not Updated'}</div>
          </div>
          <div>
            <Icon className="jobIcon" type="home" />
            <div>{hiring_organization} </div>
          </div>
          <div>
            <Icon className="jobIcon" type="calendar" />
            <div>
              {date_posted ? moment(date_posted).fromNow() : date_posted}
            </div>
          </div>
          <div>
            <Icon className="jobIcon" type="link" />
            <div>{company_url ? company_url.toLowerCase() : 'Not Updated'}</div>
          </div>
        </div>
        <div>
          {interviews && this.renderInterviews(interviews, numberOfInterviews)}
        </div>
        {this.renderCreateInterViewModal()}
        {this.renderCreateCandidateModal()}
      </div>
    );
  }
}

JobView.propTypes = {
  job: PropTypes.object,
  getJob: PropTypes.func,
  candidates: PropTypes.array,
  createInterview: PropTypes.func,
  searchCandidate: PropTypes.func,
  history: PropTypes.object,
  createCandidate: PropTypes.func,
  match: PropTypes.object,
};

JobView.defaultProps = {
  job: {},
  getJob: _noop,
  candidates: [],
  searchCandidate: _noop,
  createInterview: _noop,
  createCandidate: _noop,
  history: {},
  match: {},
};

export default compose(
  withRouter,
  connect(
    state => ({
      job: _get(state.get('jobView'), 'job'),
      candidates: _get(state.get('jobView'), 'candidates'),
      interviews: _get(state.get('jobView'), 'interviews'),
    }),
    { getJob, createInterview, searchCandidate, createCandidate },
  ),
  Form.create({ name: 'interview_creation' }),
)(JobView);
