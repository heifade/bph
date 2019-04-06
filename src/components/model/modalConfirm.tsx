/**
 * 弹框
 * @author djd
 */

import { Modal } from 'antd';

/**
 * Modal 确认框
 * @param content 内容
 * 适合在 model effects 方法里用，
 * @example
 * if (yield call(modalConfirm, '是否确认删除？')) {
 *    yield call(onDelete, { id: typeData.id });
 * }
 */
export function modalConfirm(content: string): Promise<any> {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: '请确认',
      content,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        resolve(true);
      },
      onCancel: () => {
        resolve(false);
      },
    });
  });
}
