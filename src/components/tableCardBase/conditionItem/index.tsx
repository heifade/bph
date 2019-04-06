import React from 'react';
import { Input } from 'antd';

interface IProps {
  title: string;
  field: string;
  component?: any;
  initialValue?: any;
  visible?: boolean;
}

export interface IConditionItem {
  title: string;
  field: string;
  initialValue: any;
  component: any;
  visible: boolean;
}

export function ConditionItem(props: IProps): IConditionItem {
  const { title, field, initialValue = '', component, visible = true } = props;

  return {
    title,
    field,
    initialValue,
    visible,
    component: component || <Input placeholder={`请输入${title}`} />,
  };
}
