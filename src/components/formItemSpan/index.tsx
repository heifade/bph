import React from 'react';
import { IFormItemInputProps, FormItemInput } from '../formItemInput';

export interface IFormItemSelectProps extends IFormItemInputProps {}

export class FormItemSpan extends React.PureComponent<IFormItemSelectProps> {
  render() {
    const { value, record, fieldName } = this.props;

    let initialValue = record ? record[fieldName] : [];
    if (value !== undefined) {
      initialValue = value || [];
    }

    return (
      <FormItemInput {...this.props} value={initialValue} component={<span>{initialValue}</span>} />
    );
  }
}
