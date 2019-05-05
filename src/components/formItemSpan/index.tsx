import React from 'react';
import { IFormItemInputProps, FormItemInput } from '../formItemInput';

export interface IFormItemSelectProps extends IFormItemInputProps {}

export class FormItemSpan extends React.PureComponent<IFormItemSelectProps> {
  render() {
    const { initialValue, record, fieldName } = this.props;

    let initValue;
    if (initialValue !== undefined) {
      initValue = initialValue;
    } else {
      initValue = record ? record[fieldName] : '';
    }

    return (
      <FormItemInput
        {...this.props}
        initialValue={initValue}
        component={<span>{initValue}</span>}
      />
    );
  }
}
