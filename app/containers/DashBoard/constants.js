import React from 'react';
export const jobColumns = [
  {
    Header: 'No.',
    id: 'row',
    maxWidth: 50,
    filterable: false,
    Cell: row => <div>{row.index + 1}</div>,
  },
  {
    Header: 'Title',
    accessor: 'title', // String-based value accessors!
  },
  {
    Header: 'Organization',
    accessor: 'hiring_organization',
  },
  {
    Header: 'Location',
    accessor: 'job_location',
  },
  {
    Header: "Minimum Salary(Lakh's)",
    accessor: 'min_salary',
  },
  {
    Header: "Maximun Salary(Lakh's)",
    accessor: 'max_salary',
    // eslint-disable-next-line indent
  },
];
