import React, { PureComponent } from 'react';
import { Modal, Button } from 'antd';

export interface IEditModalProps {
  width?: number;
  title: string;
  visible: boolean;
  onSave: () => void;
  onClose: () => void;
  saveLoading: boolean;
}

export class EditModal extends PureComponent<IEditModalProps> {
  onSave = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave();
    }
  };

  onClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  renderFooter = () => {
    const { saveLoading } = this.props;
    return [
      <Button key="cancel" onClick={this.onClose}>
        取消
      </Button>,
      <Button key="forward" type="primary" loading={saveLoading} onClick={this.onSave}>
        保存
      </Button>,
    ];
  };

  render() {
    const { width, title, visible, children } = this.props;

    return (
      <Modal
        width={width || 640}
        bodyStyle={{ padding: '30px 40px' }}
        destroyOnClose={true}
        title={title}
        visible={visible}
        footer={this.renderFooter()}
        onCancel={this.onClose}
      >
        {children}
      </Modal>
    );
  }
}
