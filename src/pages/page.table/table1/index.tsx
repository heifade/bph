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
  OptionContainer,
} from '@/index';
import { Divider } from 'antd';
import { Editor } from './editor';
import { Button } from 'antd';
import { IHash } from '@/interface';
import { NAMESPACE_TABLE2 } from '../models/table2';
import { IconButton } from '@/components/iconButton';
import { LinkButton } from '@/components/linkButton';

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
      ConditionItem({ title: '条件名称1', field: 'keyword' }),
      ConditionItem({ title: '条件名称2', field: 'keyword2' }),
      ConditionItem({ title: '条件名称3', field: 'keyword3' }),
      ConditionItem({ title: '条件名称4', field: 'keyword4' }),
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

  onOpenNextTable = (record: IHash) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${NAMESPACE_TABLE2}/onShowTable`,
      payload: record,
    });
  };

  render() {
    const tableCardConfig: ITableCardBaseConfig = {
      namespace: NAMESPACE_TABLE1,
      rowKey: 'diagramConfigurationId',
      addButtonState: { visible: true, disabled: false },
      downloadButtonState: { visible: true, disabled: false },
      deleteButtonState: { visible: true, disabled: false },
      scroll: { y: 200 },
      crossPageSelect: true,
      pagination: {
        position: 'flex-start',
      },
      filledParentNode: true,
      autoSearch: true,
      columns: [
        {
          title: '组态编号',
          dataIndex: 'diagramConfigurationId',
          width: 300,
          // fixed: 'left',
          sorter: true,
        },
        {
          title: '组态名称',
          dataIndex: 'name',
          width: 300,
          // fixed: 'left',
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
          width: 350,
          render: (text, record, index) => {
            if (!this.tableCardBaseRef.current) {
              return null;
            }
            const { onEdit, onDelete, onCopy } = this.tableCardBaseRef.current;
            return (
              <OptionContainer>
                <OptionContainer splitLine={false}>
                  <TextButton data={record} onClick={onEdit} disabled={index === 0}>
                    编辑
                  </TextButton>
                  <TextButton data={record} onClick={onCopy} disabled={index === 0}>
                    复制
                  </TextButton>
                  <TextButton data={record} onClick={this.onOpenNextTable}>
                    打开关联表格
                  </TextButton>
                </OptionContainer>
                <OptionContainer splitLine={true}>
                  <TextButton data={[record]} onClick={onDelete}>
                    删除
                  </TextButton>
                  <IconButton data={record} icon="edit" disabled={index === 0} />
                  <LinkButton url="/" disabled={index === 0}>
                    首页
                  </LinkButton>
                </OptionContainer>
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
