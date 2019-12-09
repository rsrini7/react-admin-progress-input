import React from 'react';
import PropTypes from 'prop-types';
import { addField, FieldTitle } from 'ra-core';
import TextField from '@material-ui/core/TextField';
import * as ReactColor from 'react-color';
import get from 'lodash.get';
import pure from 'recompose/pure';

require('./ProgressInput.css');

const ProgressFieldComponent = ({ source, record = {}, className }) =>
  (
    <div style={{ display: 'flex' }}>
      <div style={{
        width: '20px',
        height: '20px',
        background: get(record, source),
        marginRight: '5px',
      }}
      />
      <span className={className}>{get(record, source)}</span>
    </div>
  );

ProgressFieldComponent.propTypes = {
  addLabel: PropTypes.bool,
  className: PropTypes.string,
  elStyle: PropTypes.object,
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

const PureTextField = pure(ProgressFieldComponent);

PureTextField.defaultProps = {
  addLabel: true,
};

class ProgressInputComponent extends React.Component {
  state = {
    show: false
  };

  handleOpen = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });
  handleChange = ({ hex }) => {
    this.props.input.onChange(hex);
    this.forceUpdate();
  };

  render() {
    const {
      label,
      source,
      meta,
      className,
      options,
      picker,
      input,
      resource,
      helperText,
      isRequired,
    } = this.props;

    const {
      touched,
      error,
    } = meta;

    const Picker = ReactColor[`${picker}Picker`];

    return (
      <div>
        <TextField
          {...input}
          margin="normal"
          onFocus={this.handleOpen}
          label={
            <FieldTitle
                label={label}
                source={source}
                resource={resource}
                isRequired={isRequired}
            />
          }
          error={!!(touched && error)}
          helperText={touched && error || helperText}
          className={className}
        />
        {
          this.state.show?
            <div className="ProgressInput-popup">
              <div
                className="ProgressInput-cover"
                onClick={this.handleClose}
              />
              <Picker
                {...options}
                color={input.value}
                onChange={this.handleChange}
              />
            </div>
            : null
        }
      </div>
    )
  }
};

ProgressInputComponent.propTypes = {
  label: PropTypes.string,
  options: PropTypes.object,
  source: PropTypes.string,
  input: PropTypes.object,
  helperText: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  className: PropTypes.string,
  picker: (props, propName, componentName) =>
    !ReactColor[`${props[propName]}Picker`] &&
    new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`.`)
};

ProgressInputComponent.defaultProps = {
  picker: 'Chrome',
  options: {
    disableAlpha: true
  },
};

export const ProgressField = PureTextField;
export const ProgressInput = addField(ProgressInputComponent);