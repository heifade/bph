import { IDispatch } from '../../../interface/iDispatch';
import { ColumnProps } from 'antd/es/table';
import { ITableCardBaseState } from '../modelFactory/interface';
import { IConditionItem } from '../conditionItem/index';
import { IActionButtonState } from '../actionBar/interface';
import { IHash } from '../../../interface/iHash';

export interface ITableCardBaseProps {
  fetchListLoading: boolean;
  fetchDetailLoading: boolean;
  dispatch: IDispatch;
  match: any;
  tableCardState: ITableCardBaseState;
  location: any;
  tableCardConfig: ITableCardBaseConfig;
  renderCondition?: () => IConditionItem[];
  renderActionBar?: () => React.ReactNode | React.ReactNodeArray;
  renderEditor?: () => React.ReactNode | React.ReactNodeArray;
}

export interface ITableCardBaseConfig {
  namespace: string;
  /**
   * 列信息，参考antd Tabel中的 columns
   */
  columns: Array<ColumnProps<any>>;
  /**
   * 是否在组件加载完成后自动调用search方法，默认: true
   */
  autoSearch?: boolean;
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
   * 单选/多选/跨页选
   */
  selectType?: 'radio' | 'checkbox' | 'crossPageSelect';

  /**
   * 表格滚动
   */
  scroll?: { x?: number; y?: number };
  /**
   * 分页条
   */
  pagination?:
    | {
        /**
         * 只有一页时是否隐藏分页器
         */
        hideOnSinglePage?: boolean;
        position?: 'flex-start' | 'flex-end';
        size?: 'small' | '';
      }
    | false;

  /**
   * 是否充满父节点
   */
  filledParentNode?: boolean;
  /**
   * 设置行属性
   */
  onRow?: (record: IHash, index: number) => any;
}
