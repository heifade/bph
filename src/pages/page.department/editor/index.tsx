import React from 'react';
import { connect } from 'dva';
import { NAMESPACE } from '../model';
import { Form } from 'antd';
import { IEditorBaseProps, editorBaseMapStateToProps, EditorBase, FormItemInput } from '@/index';

interface IProps extends IEditorBaseProps {}
@connect((pars: any) => {
  return {
    ...editorBaseMapStateToProps(pars, NAMESPACE),
  };
})
@Form.create()
export class Editor extends React.PureComponent<IProps> {
  render() {
    const { tableCardState, form } = this.props;
    const hash = tableCardState.editorData || {};
    const editorConfig = {
      title: '部门',
      namespace: NAMESPACE,
    };
    return (
      <EditorBase width={500} editorConfig={editorConfig} {...this.props}>
        <Form layout="vertical" hideRequiredMark={false}>
          <FormItemInput
            label="编号"
            fieldName="id"
            record={hash}
            form={form}
            required={true}
            // disabled={tableCardState.editorDoType === 'add' ? false : true}
          />
          <FormItemInput label="名称" fieldName="name" record={hash} form={form} required={true} />
        </Form>
      </EditorBase>
    );
  }
}
