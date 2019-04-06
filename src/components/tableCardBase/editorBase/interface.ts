import { FormComponentProps } from 'antd/lib/form';
import { IDispatch, ITableCardBaseState } from '../../../components';

export interface IEditorBaseProps extends FormComponentProps {
  tableCardState: ITableCardBaseState;
  // saveLoading: boolean;
  loading: any;
  dispatch: IDispatch;
  width: number;
  editorConfig: IEditorBaseConfig;
}

export interface IEditorBaseConfig {
  namespace: string;
  title: string;
}
