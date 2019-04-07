import { IDispatch } from '../../../interface/iDispatch';
import { ColumnProps } from 'antd/es/table';
import { ITableCardBaseState } from '../modelFactory/interface';
import { IConditionItem } from '../conditionItem/index';
import { IActionButtonState } from '../actionBar/interface';

export interface ITableCardBaseProps {
  fetchListLoading: boolean;
  fetchDetailLoading: boolean;
  dispatch: IDispatch;
  tableCardState: ITableCardBaseState;
  location: any;
  tableCardConfig: ITableCardBaseConfig;
  renderCondition?: () => IConditionItem[];
  renderActionBar?: () => React.ReactNode | React.ReactNodeArray;
  renderEditor?: () => React.ReactNode | React.ReactNodeArray;
}

export interface ITableCardBaseConfig {
  namespace: string;
  columns: Array<ColumnProps<any>>;
  rowKey: string;
  addButtonState?: IActionButtonState;
  deleteButtonState?: IActionButtonState;
  downloadButtonState?: IActionButtonState;
  checkBox?: boolean;
  scroll?: { x: number };
}
