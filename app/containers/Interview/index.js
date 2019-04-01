/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _debounce from 'lodash/debounce';
import _omit from 'lodash/omit';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import moment from 'moment';
import {
  Card,
  Form,
  Select,
  Steps,
  Icon,
  DatePicker,
  Input,
  Button,
} from 'antd';
import _get from 'lodash/get';
import _values from 'lodash/values';
import _noop from 'lodash/noop';
import { getInterview, updateInterview, scheduleInterview } from './actions';
import { interviewStatus } from './constants';
import 'react-table/react-table.css';
import './style.scss';

const { Step } = Steps;
const { Meta } = Card;
const { Option } = Select;

const INTIAL_STATE = {
  formValues: {
    scheduleAt: moment().add(1, 'day'),
    link: '',
  },
  isScheduling: false,
};

const disableDate = current => current && current.valueOf() < Date.now();
const transformData = (data, key) => ({
  ...data,
  ..._omit(data[key], '_id'),
});

/* eslint-disable react/prefer-stateless-function */
class InterviewView extends React.PureComponent {
  state = INTIAL_STATE;

  componentDidMount() {
    const {
      getInterview,
      match: {
        params: { id },
      },
    } = this.props;
    getInterview(id);
  }

  handleChange = value => {
    const { updateInterview } = this.props;
    const {
      getInterview,
      match: {
        params: { id },
      },
    } = this.props;
    const {
      interview: { expectedSalary, currentSalary },
    } = this.props;
    updateInterview({
      status: value,
      expectedSalary,
      currentSalary,
      id,
    });
  };

  handleBack = () => {
    const { history } = this.props;
    const {
      interview: { job = '' },
    } = this.props;
    history.push(`/job/${job}`);
  };

  toggleScheduling = () => {
    this.setState(prevState => ({
      isScheduling: !prevState.isScheduling,
    }));
  };

  onFormChange = ({ id, value }) => {
    this.setState(prevState => ({
      formValues: { ...prevState.formValues, [id]: value },
    }));
  };

  handleScheduleInterview = () => {
    const {
      scheduleInterview,
      match: {
        params: { id },
      },
    } = this.props;
    const {
      formValues: { scheduleAt, link },
    } = this.state;
    scheduleInterview({
      interviewId: id,
      scheduledAt: moment(scheduleAt).format(),
      link,
    });
  };

  render() {
    const { interview } = this.props;
    const {
      isScheduling,
      formValues: { scheduleAt, link },
    } = this.state;
    const transformedinterview = transformData(interview, 'candidate');
    const {
      name,
      email,
      currentSalary,
      expectedSalary,
      status,
      phone,
    } = transformedinterview;
    const options = _values(interviewStatus).map(option => (
      <Option key={option.value}> {option.label} </Option>
    ));

    return (
      <div className="interviewContainer">
        <div className="interviewDetails">Interview Details</div>
        <div className="interview-holder">
          <div className="back" onClick={this.handleBack}>
            <Icon type="left" /> Back
          </div>
          <div>
            <div className="interviewHeader">Name Of The Candidate</div>
            <div>{name}</div>
          </div>
          <div>
            <div className="interviewHeader">Email</div>
            <div>{email}</div>
          </div>
          <div>
            <div className="interviewHeader">Phone</div>
            <div>
              +91-
              {phone}
            </div>
          </div>
          <div>
            <div className="interviewHeader"> Current Salary</div>
            <div>{currentSalary} Lakh's</div>
          </div>
          <div>
            <div className="interviewHeader"> Expected Salary</div>
            <div>{expectedSalary} Lakh's</div>
          </div>
        </div>
        <div className="interviewBody">
          <Card style={{ width: 340, margin: '1rem' }}>
            <Meta
              title="Schedule An Interview"
              description=" It Will Send Calender Request to Candidate as well as the Recruiter"
            />
            <div className="scheduleHolder">
              <DatePicker
                showTime
                allowClear={false}
                format="MM/DD/YYYY HH:mm"
                id="dateTime"
                value={scheduleAt}
                disabledDate={disableDate}
                showTime={{ format: 'HH:mm' }}
                style={{ width: 300 }}
                onChange={value => {
                  this.onFormChange({ id: 'scheduleAt', value });
                }}
              />
              <Input
                style={{ width: 300 }}
                type="text"
                id="link"
                value={link}
                onChange={e => {
                  this.onFormChange({ id: 'link', value: e.target.value });
                }}
                placeholder="Skype or Google Map Link (Optional)"
              />
              <Button
                className="button"
                disabled={isScheduling}
                onClick={this.handleScheduleInterview}
                type="primary"
              >
                Schedule Interview
              </Button>
            </div>
          </Card>
          <Card style={{ width: 340, margin: '1rem' }}>
            <Meta
              title="Change The Interview Status"
              description="Interview Status Also Helps"
            />
            <div className="scheduleHolder">
              <Select
                className="statusBox"
                value={status}
                style={{ width: 300 }}
                onChange={this.handleChange}
              >
                {options}
              </Select>
            </div>
          </Card>
          <Card style={{ width: 340, margin: '1rem' }}>
            <Meta
              title="Interviewer Comments"
              description="Under Development"
            />
            <div className="scheduleHolder">
              <div>
                No Ready Yet <Icon type="smile" rotate={180} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

InterviewView.propTypes = {
  getInterview: PropTypes.func,
  updateInterview: PropTypes.func,
  match: PropTypes.object,
  interview: PropTypes.object,
};

InterviewView.defaultProps = {
  getInterview: _noop,
  updateInterview: _noop,
  history: {},
  match: {},
  interview: {},
};

export default compose(
  withRouter,
  connect(
    state => ({
      interview: _get(state.get('interviewView'), 'interview'),
    }),
    { getInterview, updateInterview, scheduleInterview },
  ),
  Form.create({ name: 'interview_creation' }),
)(InterviewView);
