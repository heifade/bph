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

  // 渲染条件
  renderCondition = () => {
    const {
      tableCardState: { condition },
    } = this.props;
    const conditionItems: IConditionItem[] = [
      ConditionItem({ title: '编号', field: 'id', initialValue: '' }),
      ConditionItem({ title: '部门名称', field: 'name', initialValue: '' }),
      undefined,
    ];
    return conditionItems;
  };
  // 渲染操作按钮
  renderActionBar() {
    return [
      <Button key="check" onClick={() => console.log('审核')}>
        审核
      </Button>,
    ];
  }
  // 渲染编辑弹框
  renderEditor() {
    return <Editor />;
  }
  // 打开用户管理页面
  onOpenUser = (record: IHash) => {
    router.push(`/department/user/${record.id}`);
  };

  render() {
    const tableCardConfig: ITableCardBaseConfig = {
      namespace: NAMESPACE, // 对应 model 的 NAMESPACE
      rowKey: 'id', // 数据主键，必须唯一。
      addButtonState: { visible: true, disabled: false }, // 操作按钮栏上，新增按钮是否可见/可用
      downloadButtonState: { visible: true, disabled: false }, // 条件栏上，下载按钮是否可见/可用
      deleteButtonState: { visible: true, disabled: false }, // 操作按钮栏上，删除按钮是否可见/可用
      // scroll: { x:  }, // 设置横向或纵向滚动，也可用于指定滚动区域的宽和高，可以设置为像素值，百分比，true 和 'max-content'
      crossPageSelect: true, // 是否跨页选择
      pagination: {
        position: 'flex-start',
      },
      filledParentNode: true, // 是否将表格充满整个容器
      autoSearch: true, // 页面加载完时，是否自动调用查询
      checkBox: true, // 数据行前是否显示复选框
      onRow: (record: IHash, index: number) => {
        return {
          style: {
            backgroundColor: index % 2 ? '#ffffff' : '#e1e1e1',
          },
        };
      },
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
