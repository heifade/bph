import React from 'react';
import { connect } from 'dva';
import { NAMESPACE_TABLE1 } from '../models/table1';
import { Form } from 'antd';
import { FormItemInput, EditorBase, IEditorBaseProps } from '@/index';

interface IProps extends IEditorBaseProps {}

@connect((pars: any) => {
  return {
    tableCardState: pars[NAMESPACE_TABLE1],
    loading: pars.loading,
  };
})
@Form.create()
export class Editor extends React.PureComponent<IProps> {
  render() {
    const { tableCardState, loading, dispatch, form } = this.props;
    const hash = tableCardState.editorData || {};
    const editorConfig = {
      title: '组态',
      namespace: NAMESPACE_TABLE1,
    };
    return (
      <EditorBase
        tableCardState={tableCardState}
        width={500}
        loading={loading}
        dispatch={dispatch}
        editorConfig={editorConfig}
        form={form}
      >
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
