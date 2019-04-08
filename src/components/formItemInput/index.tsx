import React from 'react';
import { Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IProps {
  form: WrappedFormUtils;
  value: any;
  fieldName: string;
  label: string;
  required?: boolean;
  component?: any;
  disabled?: boolean;
  visible?: boolean;
  inputProps?: any;
}

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

export class FormItemInput extends React.PureComponent<IProps> {
  render() {
    const {
      form: { getFieldDecorator },
      value,
      label,
      fieldName,
      required,
      component,
      disabled,
      visible = true,
      inputProps,
    } = this.props;

    return (
      <Form.Item
        label={label}
        {...formItemLayout}
        style={{ display: visible ? undefined : 'none' }}
      >
        {getFieldDecorator(fieldName, {
          initialValue: value,
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
