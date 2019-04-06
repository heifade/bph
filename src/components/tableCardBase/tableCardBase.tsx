import React, { PureComponent, Fragment } from 'react';
import { IDispatch } from '../interface/iDispatch';
import { ITableCardBaseState } from './modelFactory';
import { IHashList } from '../interface/iHashList';
import { ColumnProps } from 'antd/es/table';
import { Modal, Table } from 'antd';
import { IHash } from '../interface/iHash';
import debounce from 'lodash/debounce';
import { Condition } from './condition';
import { IConditionItem } from './conditionItem';

export interface ITableCardBaseProps {
  loading: any;
  dispatch: IDispatch;
  tableCardState: ITableCardBaseState;
  location: any;
  pageConfig: ITableCardBaseConfig;

  renderCondition?: () => IConditionItem[];
}

export interface ITableCardBaseConfig {
  namespace: string;
  columns: Array<ColumnProps<any>>;
  pageTitle: string;
  rowKey: string;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  showPrintButton?: boolean;
  showPayCheckButton?: boolean;
  haveCheckBox?: boolean;
  scroll?: { x: number };
}

export class TableCardBase<T extends ITableCardBaseProps> extends PureComponent<T> {
  onSearch = (condition: IHash) => {
    const {
      dispatch,
      pageConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onSearchBase`,
      payload: {
        condition,
        pageIndex: 0,
        pageSize: 10,
      },
    });
  };

  /**
   * 打开编辑框，进行编辑。
   */
  onEdit = editorData => {
    const {
      dispatch,
      pageConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onEditorVisibleChangedBase`,
      payload: {
        editorVisible: true,
        editorData,
        editorDoType: 'edit',
      },
    });
  };

  onAdd = () => {
    const {
      dispatch,
      pageConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onEditorVisibleChangedBase`,
      payload: {
        editorVisible: true,
        editorData: {},
        editorDoType: 'add',
      },
    });
    dispatch({
      type: `${namespace}/onOpenEditorForAdd`,
      payload: {},
    });
  };

  onDeleteConfirmed = (list: IHash) => {
    const {
      dispatch,
      pageConfig: { namespace },
    } = this.props;
    return dispatch({
      type: `${namespace}/onDeleteBase`,
      payload: list,
    });
  };

  onDelete = (list: IHashList) => {
    Modal.confirm({
      title: '提醒',
      content: `是否确认删除？`,
      okText: '确定',
      cancelText: '取消',
      maskClosable: true,
      centered: true,
      onOk: () => this.onDeleteConfirmed(list),
    });
  };

  onPrintConfirmed = (list: IHash) => {
    const {
      dispatch,
      pageConfig: { namespace },
    } = this.props;
    return dispatch({
      type: `${namespace}/onPrint`,
      payload: list,
    });
  };

  onPrint = (list: IHashList) => {
    // Modal.confirm({
    //   title: '提醒',
    //   content: `是否确认打印？`,
    //   okText: '确定',
    //   cancelText: '取消',
    //   maskClosable: true,
    //   centered: true,
    //   onOk: () => this.onPrintConfirmed(list),
    // });
    this.onPrintConfirmed(list);
  };

  onPayCheckConfirmed = (list: IHash) => {
    const {
      dispatch,
      pageConfig: { namespace },
    } = this.props;
    return dispatch({
      type: `${namespace}/onPayCheck`,
      payload: list,
    });
  };

  onPayCheck = (list: IHashList) => {
    Modal.confirm({
      title: '提醒',
      content: `是否确认付款？`,
      okText: '确定',
      cancelText: '取消',
      maskClosable: true,
      centered: true,
      onOk: () => this.onPayCheckConfirmed(list),
    });
  };

  onDownload = (condition: IHash) => {
    const { dispatch, pageConfig } = this.props;
    return dispatch({
      type: `${pageConfig.namespace}/onDownloadBase`,
      payload: condition,
    });
  };

  componentDidMount() {
    // window.addEventListener('resize', this.onResize);
    // this.onResize();
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.onResize);
  }

  onPaginationChange = pars => {
    const {
      dispatch,
      pageConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onFetchListBase`,
      payload: pars,
    });
  };

  onSelectRows = (selectedRowKeys: string[] | number[], selectedRows: IHashList) => {
    const {
      dispatch,
      pageConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onSelectRowsBase`,
      payload: {
        selectedRows,
        selectedRowKeys,
      },
    });
  };

  onResize = debounce(() => {
    const {
      dispatch,
      pageConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onResize`,
      payload: {
        clientWidth: document.body.clientWidth,
        clientHeight: document.body.clientHeight,
      },
    });
  }, 300);

  renderEditor() {
    return null;
  }
  renderDetail() {
    return null;
  }

  renderCondition() {
    const { renderCondition } = this.props;
    if (renderCondition) {
      return <Condition onSearch={this.onSearch} conditionItems={renderCondition()} />;
    }
    return null;
  }

  render() {
    const {
      tableCardState: { rows, rowCount, pageIndex, pageSize, selectedRows },
      loading: { effects },
      pageConfig,
    } = this.props;

    const {
      pageTitle,
      columns,
      rowKey,
      showAddButton,
      showDeleteButton,
      showPrintButton,
      showPayCheckButton,
      haveCheckBox,
      namespace,
      scroll,
    } = pageConfig;

    return (
      <Fragment>
        {this.renderCondition()}
        <Table
          columns={columns}
          dataSource={rows}
          pagination={{ current: pageIndex, total: rowCount, showSizeChanger: true, pageSize }}
          onChange={this.onPaginationChange}
          loading={effects[`${namespace}/onFetchListBase`]}
          rowKey={rowKey}
          rowSelection={{
            selectedRowKeys: selectedRows.map(h => h[rowKey]),
            onChange: this.onSelectRows,
          }}
          scroll={scroll}
        />
        {this.renderEditor()}
        {this.renderDetail()}
      </Fragment>
    );
  }
}
