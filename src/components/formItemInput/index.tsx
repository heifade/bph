import React from 'react';
import { Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { IHash } from '../../interface';
import { ColProps } from 'antd/lib/grid/col';

export interface IFormItemInputProps {
  form: WrappedFormUtils;
  initialValue?: any;
  record?: IHash;
  fieldName: string;
  label?: string;
  required?: boolean;
  component?: any;
  disabled?: boolean;
  visible?: boolean;
  colon?: boolean;
  maxLength?: number;
  layout?: {
    labelCol?: ColProps;
    wrapperCol?: ColProps;
  };
  rules?: any[];
  /**
   * 透传给 Input 的属性
   */
  componentProps?: any;
}

export class FormItemInput extends React.PureComponent<IFormItemInputProps> {
  render() {
    const {
      form: { getFieldDecorator },
      initialValue,
      record,
      label,
      fieldName,
      required,
      component,
      disabled,
      visible = true,
      colon = true,
      layout = {
        labelCol: { xs: { span: 24 }, sm: { span: 8 }, lg: { span: 6 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, lg: { span: 18 } },
      },
      rules = [],
      maxLength,
      componentProps
    } = this.props;

    let initValue;
    if (initialValue !== undefined) {
      initValue = initialValue;
    } else {
      initValue = record ? record[fieldName] : '';
    }

    return (
      <Form.Item
        label={label}
        {...layout}
        style={{ display: visible ? undefined : 'none' }}
        colon={colon}
      >
        {getFieldDecorator(fieldName, {
          initialValue: initValue,
          rules: [
            {
              required,
              message: `请输入${label || ''}`,
            },
            ...rules,
          ],
        })(
          component || (
            <Input
              placeholder={`请输入${label || ''}`}
              disabled={disabled}
              {...componentProps}
              maxLength={maxLength}
            />
          ),
        )}
      </Form.Item>
    );
  }
}
