import { IDispatch } from '../../../interface/iDispatch';
import { ColumnProps } from 'antd/es/table';
import { ITableCardBaseState } from '../modelFactory/interface';
import { IConditionItem } from '../conditionItem/index';

export interface ITableCardBaseProps {
  loading: any;
  dispatch: IDispatch;
  tableCardState: ITableCardBaseState;
  location: any;
  tableCardConfig: ITableCardBaseConfig;
  renderCondition?: () => IConditionItem[];
  renderEditor?: () => React.ReactNode | React.ReactNodeArray;
}

export interface ITableCardBaseConfig {
  namespace: string;
  columns: Array<ColumnProps<any>>;
  rowKey: string;
  addButton?: IActionButtonState;
  deleteButton?: IActionButtonState;
  checkBox?: boolean;
  scroll?: { x: number };
}


interface IActionButtonState {
  visible?: boolean;
  disabled?: boolean;
}
