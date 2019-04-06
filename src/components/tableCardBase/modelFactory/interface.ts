import { IHash } from '../../interface/iHash';

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

  bodyClientWidth: number;
  bodyClientHeight: number;
}

export interface IModel {
  namespace: string;
  state: {};
  effects: {};
  reducers: {};
}
