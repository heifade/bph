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
  /**
   * 数据主键字段
   */
  rowKey: string;
  /**
   * 添加按钮
   */
  addButtonState?: IActionButtonState;
  /**
   * 删除按钮
   */
  deleteButtonState?: IActionButtonState;
  /**
   * 下载按钮
   */
  downloadButtonState?: IActionButtonState;
  /**
   * 是否显示复选框
   */
  checkBox?: boolean;
  /**
   * 是否跨页选择
   */
  crossPageSelect?: boolean;
  /**
   * 表格滚动
   */
  scroll?: { x: number; y: number };
}
