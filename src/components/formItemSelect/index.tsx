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
      value,
      record,
      fieldName,
    } = this.props;

    let initialValue = record ? record[fieldName] : [];
    if (value !== undefined) {
      initialValue = value || [];
    }

    return (
      <FormItemInput
        {...this.props}
        value={initialValue}
        component={
          <Select
            placeholder={`请选择${label}`}
            allowClear={allowClear}
            mode={multiple ? 'multiple' : undefined}
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
