import React from 'react';
import { connect } from 'dva';
import { NAMESPACE_TABLE1 } from '../models/table1';
import {
  TableCardBase,
  ITableCardBaseConfig,
  IConditionItem,
  ConditionItem,
  ITableCardBaseProps,
} from '@/index';
import { Divider } from 'antd';
import { Editor } from './editor';

interface IProps extends ITableCardBaseProps {
  location: any;
}

@connect((pars, h) => {
  return {
    tableCardState: pars[NAMESPACE_TABLE1],
    loading: pars.loading,
    location: h.location,
  };
})
export class Table1 extends React.PureComponent<IProps> {
  private tableCardBaseRef = React.createRef<TableCardBase<any>>();

  renderCondition = () => {
    const conditionItems: IConditionItem[] = [
      ConditionItem({ title: '条件1', field: 'keyword' }),
      ConditionItem({ title: '条件2', field: 'keyword2' }),
      ConditionItem({ title: '条件3', field: 'keyword3' }),
      ConditionItem({ title: '条件4', field: 'keyword4' }),
      undefined,
    ];
    return conditionItems;
  };

  renderEditor() {
    return <Editor />;
  }

  render() {
    const { tableCardState, loading, dispatch } = this.props;

    const tableCardConfig: ITableCardBaseConfig = {
      namespace: NAMESPACE_TABLE1,
      rowKey: 'diagramConfigurationId',
      // showAddButton: true,
      // showDeleteButton: true,
      scroll: { x: 1500 },
      columns: [
        {
          title: '组态名称',
          dataIndex: 'name',
          width: 105,
          fixed: 'left',
        },
        {
          title: '组态描述',
          dataIndex: 'desc',
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate',
          width: 185,
        },
        {
          title: '修改时间',
          dataIndex: 'gmtModified',
          width: 185,
        },
        {
          title: '操作',
          width: 120,
          render: record => (
            <React.Fragment>
              <a
                href="javascript: void"
                onClick={() => this.tableCardBaseRef.current!.onEdit(record)}
              >
                编辑
              </a>
              <Divider type="vertical" />
              <a
                href="javascript: void"
                onClick={() => this.tableCardBaseRef.current!.onDelete(record)}
              >
                删除
              </a>
            </React.Fragment>
          ),
        },
      ],
    };

    return (
      <TableCardBase
        ref={this.tableCardBaseRef}
        tableCardState={tableCardState}
        loading={loading}
        tableCardConfig={tableCardConfig}
        dispatch={dispatch}
        renderCondition={this.renderCondition}
        renderEditor={this.renderEditor}
      />
    );
  }
}
