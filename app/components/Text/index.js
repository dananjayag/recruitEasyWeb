import React from 'react';
import PropTypes from 'prop-types';
import './text.scss';

class Text extends React.PureComponent {
  render() {
    const { children, className, size, ...rest } = this.props;
    return (
      <React.Fragment>
        <span {...rest} className={`textSize-${size} ${className}`}>{children}</span>
      </React.Fragment>
    );
  }
}

Text.propTypes = {
  children: PropTypes.element.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

Text.defaultProps = {
  size: 4,
  className: '',
};

export default Text;
