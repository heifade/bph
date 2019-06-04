import React from 'react';
import { IFormItemInputProps, FormItemInput } from '../formItemInput';
import { IHashList } from '@/interface';
import { Select } from 'antd';

export interface IFormItemSelectProps extends IFormItemInputProps {
  /**
   * 选项数据列表
   */
  list: IHashList;
  /**
   * 是否显示全部选择
   */
  haveAllOption?: boolean;
  /**
   * value 字段名
   */
  valueField?: string;
  /**
   * text 字段名
   */
  textField?: string;
  /**
   * 是否在下拉列表里显示value字段
   */
  showValueField?: boolean;
  /**
   * 是否允许清除
   */
  allowClear?: boolean;
  /**
   * 是否允许多选
   */
  multiple?: boolean;

  /**
   * 透传给 Select 的属性
   */
  componentProps?: any;
}

export class FormItemSelect extends React.PureComponent<IFormItemSelectProps> {
  render() {
    const {
      list,
      label,
      haveAllOption = false,
      valueField = 'value',
      textField = 'label',
      showValueField,
      allowClear = false,
      multiple = false,
      initialValue,
      record,
      fieldName,
      disabled,
      componentProps,
    } = this.props;

    let initValue;
    if (initialValue !== undefined) {
      initValue = initialValue;
    } else {
      initValue = record ? record[fieldName] : [];
    }

    return (
      <FormItemInput
        {...this.props}
        initialValue={initValue}
        component={
          <Select
            placeholder={`请选择${label}`}
            allowClear={allowClear}
            mode={multiple ? 'multiple' : undefined}
            disabled={disabled}
            {...componentProps}
          >
            {haveAllOption && (
              <Select.Option key="all" value="">
                全部
              </Select.Option>
            )}
            {list.map(item => (
              <Select.Option key={item[valueField]} value={item[valueField]}>
                {showValueField ? `${item[valueField]} - ${item[textField]}` : `${item[textField]}`}
              </Select.Option>
            ))}
          </Select>
        }
      />
    );
  }
}
