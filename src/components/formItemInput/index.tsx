import React from 'react';
import { Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { IHash } from '../../interface';

export interface IFormItemInputProps {
  form: WrappedFormUtils;
  value?: any;
  record?: IHash;
  fieldName: string;
  label: string;
  required?: boolean;
  component?: any;
  disabled?: boolean;
  visible?: boolean;
  inputProps?: any;
  colon?: boolean;
  layout?: 'vertical' | 'horizontal';
}

export class FormItemInput extends React.PureComponent<IFormItemInputProps> {
  render() {
    const {
      form: { getFieldDecorator },
      value,
      record,
      label,
      fieldName,
      required,
      component,
      disabled,
      visible = true,
      inputProps,
      colon = true,
      layout = 'horizontal',
    } = this.props;

    let formItemLayout = {};

    if (layout === 'horizontal') {
      formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
      };
    }

    let initialValue = record ? record[fieldName] : '';
    if (value !== undefined) {
      initialValue = value;
    }

    return (
      <Form.Item
        label={label}
        {...formItemLayout}
        style={{ display: visible ? undefined : 'none' }}
        colon={colon}
      >
        {getFieldDecorator(fieldName, {
          initialValue,
          rules: [
            {
              required,
              message: `请输入${label}`,
            },
          ],
        })(
          component || <Input placeholder={`请输入${label}`} disabled={disabled} {...inputProps} />,
        )}
      </Form.Item>
    );
  }
}
