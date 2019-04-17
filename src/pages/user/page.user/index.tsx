import React from 'react';
import { connect } from 'dva';
import { NAMESPACE_TABLE1 } from './model';
import {
  TableCardBase,
  ITableCardBaseConfig,
  IConditionItem,
  ConditionItem,
  ITableCardBaseProps,
  tableCardBaseMapStateToProps,
  TextButton,
} from '@/index';
import { Button } from 'antd';
import { IHash } from '@/interface';
import { router } from 'umi';

interface IProps extends ITableCardBaseProps {}

@connect((pars, h) => {
  return {
    ...tableCardBaseMapStateToProps(pars, NAMESPACE_TABLE1),
  };
})
export default class UserTable extends React.PureComponent<IProps> {
  private tableCardBaseRef = React.createRef<TableCardBase<any>>();

  renderCondition = () => {
    const {
      tableCardState: { condition },
    } = this.props;
    const conditionItems: IConditionItem[] = [
      ConditionItem({ title: '条件名称1', field: 'keyword', initialValue: condition.keyword }),
      ConditionItem({ title: '条件名称2', field: 'keyword2', initialValue: condition.keyword2 }),
      ConditionItem({ title: '条件名称3', field: 'keyword3', initialValue: condition.keyword3 }),
      ConditionItem({ title: '条件名称4', field: 'keyword4', initialValue: condition.keyword4 }),
      undefined,
    ];
    return conditionItems;
  };
  renderActionBar() {
    return [<Button key="check">审核</Button>];
  }

  renderEditor() {
    return null;
  }

  onEdit = (record: any) => {
    router.push('/user/editor');
  };

  render() {
    const tableCardConfig: ITableCardBaseConfig = {
      namespace: NAMESPACE_TABLE1,
      rowKey: 'diagramConfigurationId',
      addButtonState: { visible: true, disabled: false, label: 'add' },
      downloadButtonState: { visible: true, disabled: false },
      deleteButtonState: { visible: true, disabled: false },
      scroll: { y: 200 },
      crossPageSelect: true,
      pagination: {
        position: 'flex-start',
      },
      filledParentNode: true,
      autoSearch: true,
      onRow: (record: IHash, index: number) => {
        return {
          style: {
            color: record.achievement < 60 ? '#ff0000' : 'unset',
          },
        };
      },
      columns: [
        {
          title: '编号',
          dataIndex: 'id',
          width: 300,
          // fixed: 'left',
          sorter: true,
        },
        {
          title: '名称',
          dataIndex: 'name',
          width: 300,
          // fixed: 'left',
          sorter: true,
        },
        {
          title: '成绩',
          dataIndex: 'achievement',
          width: 300,
          // fixed: 'left',
          sorter: true,
        },
        {
          title: '描述',
          dataIndex: 'desc',
          sorter: true,
        },
        {
          title: '创建时间',
          dataIndex: 'createDate',
          width: 185,
          sorter: true,
          defaultSortOrder: 'descend',
        },
        {
          title: '操作',
          width: 350,
          render: (text, record, index) => {
            if (!this.tableCardBaseRef.current) {
              return null;
            }
            return (
              <TextButton data={record} onClick={this.onEdit}>
                编辑
              </TextButton>
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
