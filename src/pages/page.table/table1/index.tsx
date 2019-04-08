import React from 'react';
import { connect } from 'dva';
import { NAMESPACE_TABLE1 } from '../models/table1';
import {
  TableCardBase,
  ITableCardBaseConfig,
  IConditionItem,
  ConditionItem,
  ITableCardBaseProps,
  tableCardBaseMapStateToProps,
  TextButton,
} from '@/index';
import { Divider } from 'antd';
import { Editor } from './editor';
import { Button } from 'antd';

interface IProps extends ITableCardBaseProps {}

@connect((pars, h) => {
  return {
    ...tableCardBaseMapStateToProps(pars, NAMESPACE_TABLE1),
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
  renderActionBar() {
    return [<Button key="check">审核</Button>];
  }

  renderEditor() {
    return <Editor />;
  }

  render() {
    const tableCardConfig: ITableCardBaseConfig = {
      namespace: NAMESPACE_TABLE1,
      rowKey: 'diagramConfigurationId',
      addButtonState: { visible: true, disabled: false },
      downloadButtonState: { visible: true, disabled: false },
      deleteButtonState: { visible: true, disabled: false },
      scroll: { x: 1500, y: 500 },
      columns: [
        {
          title: '组态名称',
          dataIndex: 'name',
          width: 300,
          fixed: 'left',
          sorter: true,
        },
        {
          title: '组态描述',
          dataIndex: 'desc',
          sorter: true,
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreate',
          width: 185,
          sorter: true,
          defaultSortOrder: 'descend',
        },
        {
          title: '修改时间',
          dataIndex: 'gmtModified',
          sorter: true,
          width: 185,
        },
        {
          title: '操作',
          width: 120,
          render: record => {
            if (!this.tableCardBaseRef.current) {
              return null;
            }
            const { onEdit, onDelete } = this.tableCardBaseRef.current;
            return (
              <React.Fragment>
                <TextButton data={record} onClick={onEdit}>
                  编辑
                </TextButton>
                <Divider type="vertical" />
                <TextButton data={[record]} onClick={onDelete}>
                  删除
                </TextButton>
              </React.Fragment>
            );
          },
        },
      ],
    };

    return (
      <TableCardBase
        ref={this.tableCardBaseRef}
        tableCardConfig={tableCardConfig}
        renderCondition={this.renderCondition}
        renderActionBar={this.renderActionBar}
        renderEditor={this.renderEditor}
        {...this.props}
      />
    );
  }
}
