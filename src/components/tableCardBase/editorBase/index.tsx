import React, { PureComponent } from 'react';
import { EditModal } from '../../EditModal';
import { IEditorBaseProps, IEditorBaseConfig } from './interface';

export { IEditorBaseProps, IEditorBaseConfig };

export class EditorBase<T extends IEditorBaseProps> extends PureComponent<T> {
  onClose = () => {
    const {
      dispatch,
      editorConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onEditorVisibleChangedBase`,
      payload: {
        editorVisible: false,
      },
    });
  };
  onSave = () => {
    const {
      form,
      tableCardState: { editorDoType, editorData },
      editorConfig: { namespace },
      dispatch,
      onCheckBeforeSubmit,
    } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      if (onCheckBeforeSubmit) {
        if (!onCheckBeforeSubmit(fieldsValue)) {
          return;
        }
      }
      dispatch({
        type: `${namespace}/onSaveBase`,
        payload: {
          fieldsValue,
          editorData,
          doType: editorDoType,
        },
      });
    });
  };

  render() {
    const {
      tableCardState: { editorVisible, editorDoType },
      editorConfig: { namespace, title },
      saveLoading,
      width,
      padding,
      children,
    } = this.props;

    return (
      <EditModal
        title={`${editorDoType === 'add' ? '新增' : '修改'}${title}`}
        onClose={this.onClose}
        onSave={this.onSave}
        visible={editorVisible}
        saveLoading={saveLoading}
        width={width}
        padding={padding}
      >
        {children}
      </EditModal>
    );
  }
}
