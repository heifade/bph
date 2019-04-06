import React, { PureComponent } from 'react';
import { EditModal } from '../../EditModal';
import { IEditorBaseProps } from './interface';

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
      tableCardState: { editorDoType },
      editorConfig: { namespace },
      dispatch,
    } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      dispatch({
        type: `${namespace}/onSaveBase`,
        payload: {
          data: fieldsValue,
          doType: editorDoType,
        },
      });
    });
  };

  render() {
    const {
      tableCardState: { editorVisible, editorDoType },
      editorConfig: { namespace, title },
      loading,
      width,
      children,
    } = this.props;

    return (
      <EditModal
        title={`${editorDoType === 'add' ? '新增' : '修改'}${title}`}
        onClose={this.onClose}
        onSave={this.onSave}
        visible={editorVisible}
        saveLoading={loading.effects[`${namespace}/onSave`]}
        width={width}
      >
        {children}
      </EditModal>
    );
  }
}
