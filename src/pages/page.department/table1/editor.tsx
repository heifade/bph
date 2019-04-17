import React from 'react';
import { connect } from 'dva';
import { NAMESPACE_TABLE1 } from '../models/table1';
import { Form } from 'antd';
import { FormItemInput, EditorBase, IEditorBaseProps, editorBaseMapStateToProps } from '@/index';
import { FormItemSelect } from '@/components/formItemSelect';

interface IProps extends IEditorBaseProps {}

const typeList = [
  {
    value: 1,
    label: '类型1',
  },
  {
    value: 2,
    label: '类型2',
  },
];

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
        <Form layout="vertical">
          <FormItemInput
            label="编号"
            fieldName="diagramConfigurationId"
            record={hash}
            form={form}
            required={true}
            visible={false}
          />
          <FormItemInput label="名称" fieldName="name" record={hash} form={form} required={true} />
          <FormItemSelect
            label="类型"
            fieldName="type"
            list={typeList}
            record={hash}
            form={form}
            required={true}
            // multiple={true}
          />
          <FormItemSelect
            label="类型2"
            fieldName="type2"
            list={typeList}
            record={hash}
            form={form}
            required={true}
            // multiple={true}
          />
        </Form>
      </EditorBase>
    );
  }
}
