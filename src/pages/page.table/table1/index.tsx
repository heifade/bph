import React from 'react';
import { connect } from 'dva';
import { NAMESPACE_TABLE1 } from '../models/table1';
import {
  TableCardBase,
  ITableCardBaseConfig,
  IConditionItem,
  Condition,
  ConditionItem,
} from '@/components/index';
import { Button } from 'antd';

const pageConfig: ITableCardBaseConfig = {
  namespace: NAMESPACE_TABLE1,
  pageTitle: '组态管理',
  rowKey: 'diagramConfigurationId',
  showAddButton: true,
  showDeleteButton: true,
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
      width: 90,
      render: record => (
        <React.Fragment>
          <a href="javascript: void">编辑</a>
        </React.Fragment>
      ),
    },
  ],
};

@connect((pars, h) => {
  return {
    tableCardState: pars[NAMESPACE_TABLE1],
    loading: pars.loading,
    location: h.location,
  };
})
export class Table1 extends React.PureComponent {
  renderCondition = () => {
    const conditionItems: IConditionItem[] = [
      ConditionItem({ title: '组态名称', field: 'keyword' }),
    ];
    return conditionItems;
  };
  render() {
    const { tableCardState, loading, dispatch } = this.props;

    return (
      <TableCardBase
        tableCardState={tableCardState}
        loading={loading}
        pageConfig={pageConfig}
        dispatch={dispatch}
        renderCondition={this.renderCondition}
      />
    );
  }
}
