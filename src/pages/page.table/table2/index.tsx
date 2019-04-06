import React from 'react';
import { connect } from 'dva';
import { NAMESPACE_TABLE2 } from '../models/table2';
import { TableCardBase, IConditionItem, ConditionItem } from '@/components/index';
import { Button } from 'antd';

const pageConfig = {
  namespace: NAMESPACE_TABLE2,
  pageTitle: '组态管理',
  rowKey: 'diagramConfigurationId',
  showAddButton: true,
  showDeleteButton: true,
  scroll: { x: 2400 },
  columns: [
    {
      title: '组态名称',
      dataIndex: 'name',
      width: 105,
    },
    {
      title: '组态描述',
      dataIndex: 'desc',
      width: 105,
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      width: 150,
    },
    {
      title: '修改时间',
      dataIndex: 'gmtModified',
      width: 150,
    },
  ],
};

@connect((pars, h) => {
  return {
    tableCardState: pars[NAMESPACE_TABLE2],
    loading: pars.loading,
    location: h.location,
  };
})
export class Table2 extends React.PureComponent {
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
