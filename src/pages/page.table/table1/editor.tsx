import React from 'react';
import { connect } from 'dva';
import { NAMESPACE_TABLE1 } from '../models/table1';
import { Form } from 'antd';
import { FormItemInput, EditorBase, IEditorBaseProps, editorBaseMapStateToProps } from '@/index';

interface IProps extends IEditorBaseProps {}

@connect((pars: any) => {
  return {
    ...editorBaseMapStateToProps(pars, NAMESPACE_TABLE1),
  };
})
@Form.create()
export class Editor extends React.PureComponent<IProps> {
  render() {
    const { tableCardState, form } = this.props;
    const hash = tableCardState.editorData || {};
    const editorConfig = {
      title: '组态',
      namespace: NAMESPACE_TABLE1,
    };
    return (
      <EditorBase width={500} editorConfig={editorConfig} {...this.props}>
        <Form layout="vertical" hideRequiredMark={true}>
          <FormItemInput
            label="编号"
            fieldName="diagramConfigurationId"
            value={hash.diagramConfigurationId}
            form={form}
            required={true}
          />
          <FormItemInput
            label="名称"
            fieldName="name"
            value={hash.name}
            form={form}
            required={true}
          />
        </Form>
      </EditorBase>
    );
  }
}
