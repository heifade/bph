import { FormComponentProps } from 'antd/lib/form';
import { IDispatch } from '../../../interface/iDispatch';
import { ITableCardBaseState } from '../modelFactory/interface';

export interface IEditorBaseProps extends FormComponentProps {
  tableCardState: ITableCardBaseState;
  saveLoading: boolean;
  dispatch: IDispatch;
  width?: number;
  padding?: number;
  editorConfig: IEditorBaseConfig;
}

export interface IEditorBaseConfig {
  namespace: string;
  title: string;
}
