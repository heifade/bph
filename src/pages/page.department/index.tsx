import React from 'react';
import { connect } from 'dva';
import { NAMESPACE } from './model';
import {
  TableCardBase,
  ITableCardBaseConfig,
  IConditionItem,
  ConditionItem,
  ITableCardBaseProps,
  tableCardBaseMapStateToProps,
  TextButton,
  OptionContainer,
} from '@/index';
import { Editor } from './editor';
import { Button } from 'antd';
import { IHash } from '@/interface';
import { router } from 'umi';

interface IProps extends ITableCardBaseProps {}

@connect((pars, h) => {
  return {
    ...tableCardBaseMapStateToProps(pars, NAMESPACE),
  };
})
export default class Table1 extends React.PureComponent<IProps> {
  private tableCardBaseRef = React.createRef<TableCardBase<any>>();

  renderCondition = () => {
    const {
      tableCardState: { condition },
    } = this.props;
    const conditionItems: IConditionItem[] = [
      ConditionItem({ title: '部门名称', field: 'name', initialValue: '' }),
      undefined,
    ];
    return conditionItems;
  };
  renderActionBar() {
    return [
      <Button key="check" onClick={() => console.log('审核')}>
        审核
      </Button>,
    ];
  }

  renderEditor() {
    return <Editor />;
  }

  onOpenUser = (record: IHash) => {
    router.push(`/department/user/${record.id}`);
  };

  render() {
    const tableCardConfig: ITableCardBaseConfig = {
      namespace: NAMESPACE,
      rowKey: 'id',
      addButtonState: { visible: true, disabled: false },
      downloadButtonState: { visible: true, disabled: false },
      deleteButtonState: { visible: true, disabled: false },
      // scroll: { x:  },
      crossPageSelect: true,
      pagination: {
        position: 'flex-start',
      },
      filledParentNode: true,
      autoSearch: true,
      checkBox: true,
      // onRow: (record: IHash, index: number) => {
      //   return {
      //     style: {
      //       color: record.achievement < 60 ? '#ff0000' : 'unset',
      //     },
      //   };
      // },
      columns: [
        {
          title: '编号',
          dataIndex: 'id',
          width: 340,
          // fixed: 'left',
          sorter: true,
        },
        {
          title: '名称',
          dataIndex: 'name',
          width: 200,
          // fixed: 'left',
          sorter: true,
        },
        {
          title: '创建时间',
          dataIndex: 'createDate',
          sorter: true,
        },
        {
          title: '操作',
          width: 180,
          render: (text, record, index) => {
            if (!this.tableCardBaseRef.current) {
              return null;
            }
            const { onEdit, onDelete, onCopy } = this.tableCardBaseRef.current;
            return (
              <OptionContainer splitLine={false}>
                <TextButton data={record} onClick={onEdit}>
                  编辑
                </TextButton>
                <TextButton data={record} onClick={this.onOpenUser}>
                  员工
                </TextButton>
                <TextButton data={record} onClick={onDelete}>
                  删除
                </TextButton>
              </OptionContainer>
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
