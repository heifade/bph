import { IHash } from '../../../interface/iHash';

export interface ITableCardBaseState {
  /**
   * 编辑框是否显示
   */
  editorVisible: boolean;
  /**
   * 编辑框数据
   */
  editorData: IHash;
  /**
   * 编辑框打开操作方式：添加，修改
   */
  editorDoType: 'add' | 'edit';
  /**
   * 当前页号
   */
  pageIndex: number;
  /**
   * 每页数据行数
   */
  pageSize: number;
  /**
   * 排序
   */
  sorts: { field: ''; type: 'ASC' | 'DESC' }[];
  /**
   * 排序默认值
   */
  initSorts: { field: ''; type: 'ASC' | 'DESC' }[];
  /**
   * 当前页数据
   */
  rows: IHash[];
  /**
   * 数据总行数
   */
  rowCount: number;
  /**
   * 选中的数据
   */
  selectedRows: IHash[];
  /**
   * 条件
   */
  condition: any;
  /**
   * 条件默认值
   */
  initCondition: any;
  /**
   * 额外的条件
   */
  conditionExtend: any;
  bodyClientWidth: number;
  bodyClientHeight: number;

  /**
   * 单选/多选/跨页选
   */
  selectType?: 'radio' | 'checkbox' | 'crossPageSelect';

  /**
   * url match
   */
  match: any;

  /**
   * 分页
   */
  pagination: any;
}

export interface IModel {
  namespace: string;
  state: {};
  effects: {};
  reducers: {};
}
