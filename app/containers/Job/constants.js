import React from 'react';
export const interviewColumns = [
  {
    Header: 'No.',
    id: 'row',
    maxWidth: 50,
    filterable: false,
    Cell: row => <div>{row.index + 1}</div>,
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
    // eslint-disable-next-line indent
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    // eslint-disable-next-line indent
  },
  {
    Header: 'Current Salary (in Lakh)',
    accessor: 'currentSalary',
  },
  {
    Header: 'Expected Salary (in Lakh)',
    accessor: 'expectedSalary',
  },
  {
    Header: 'Status',
    accessor: 'status', // String-based value accessors!
  },
];
