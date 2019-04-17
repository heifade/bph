import React, { PureComponent, Fragment } from 'react';
import { IHashList } from '../../../interface/iHashList';
import { PaginationConfig, SorterResult, TableCurrentDataSource } from 'antd/es/table';
import { Table, Button, Pagination } from 'antd';
import { IHash } from '../../../interface/iHash';
import debounce from 'lodash/debounce';
import { Condition } from '../condition';
import { ITableCardBaseProps, ITableCardBaseConfig } from './interface';
import { ActionBar } from '../actionBar';
import './styles.less';

export { ITableCardBaseProps, ITableCardBaseConfig };

interface IState {
  tableScrollY: number;
}

export class TableCardBase<T extends ITableCardBaseProps> extends PureComponent<T, IState> {
  private divTable = React.createRef<HTMLDivElement>();
  state = {
    tableScrollY: 300,
  };
  onSearch = (condition?: IHash) => {
    const {
      dispatch,
      tableCardConfig: { namespace, crossPageSelect },
    } = this.props;
    dispatch({
      type: `${namespace}/onSearchBase`,
      payload: {
        condition,
        pageIndex: 1,
        pageSize: 10,
        crossPageSelect,
      },
    });
  };
  onRefresh = () => {
    const {
      dispatch,
      tableCardConfig: { namespace, crossPageSelect },
    } = this.props;
    dispatch({
      type: `${namespace}/onRefreshBase`,
      payload: {
        crossPageSelect,
      },
    });
  };

  onDeletes = () => {
    const {
      dispatch,
      tableCardConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onDeletesBase`,
      payload: {},
    });
  };

  onDelete = (records: IHashList) => {
    const {
      dispatch,
      tableCardConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onDeleteBase`,
      payload: records,
    });
  };

  onEdit = (record: IHash) => {
    const {
      dispatch,
      tableCardConfig: { namespace },
    } = this.props;

    dispatch({
      type: `${namespace}/onOpenDetailBase`,
      payload: {
        record,
        type: 'edit',
      },
    });
  };

  /**
   * 复制一行
   */
  onCopy = (record: IHash) => {
    const {
      dispatch,
      tableCardConfig: { namespace },
    } = this.props;

    dispatch({
      type: `${namespace}/onOpenDetailBase`,
      payload: {
        record,
        type: 'add',
      },
    });
  };

  onAdd = () => {
    const {
      dispatch,
      tableCardConfig: { namespace },
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

  onDownload = (condition: IHash) => {
    const {
      dispatch,
      tableCardConfig: { namespace },
    } = this.props;
    return dispatch({
      type: `${namespace}/onDownloadBase`,
      payload: condition,
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();

    const {
      renderCondition,
      tableCardConfig: { autoSearch },
    } = this.props;
    if (!renderCondition && autoSearch !== false) {
      this.onRefresh();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onTableChange = (
    pars: PaginationConfig,
    filters: Record<React.ReactText, string[]>,
    sorter: SorterResult<IHash>,
    extra: TableCurrentDataSource<IHash>,
  ) => {
    const {
      dispatch,
      tableCardConfig: { namespace, crossPageSelect },
    } = this.props;
    dispatch({
      type: `${namespace}/onFetchListBase`,
      payload: {
        sorter,
        pageIndex: pars.current,
        pageSize: pars.pageSize,
        crossPageSelect,
      },
    });
  };
  onPaginationChange = (current: number, pageSize?: number | undefined) => {
    const {
      dispatch,
      tableCardConfig: { namespace, crossPageSelect },
    } = this.props;
    dispatch({
      type: `${namespace}/onFetchListBase`,
      payload: {
        pageIndex: current,
        pageSize,
        crossPageSelect,
      },
    });
  };

  onSelectAllRows = (selected: boolean, selectedRows: IHashList, changeRows: any) => {
    const {
      dispatch,
      tableCardConfig: { namespace, crossPageSelect, rowKey },
    } = this.props;
    dispatch({
      type: `${namespace}/onSelectAllRowsBase`,
      payload: {
        selected,
        rowKey,
        selectedRows,
        crossPageSelect,
        changeRows,
      },
    });
  };

  onSelectRow = (record: any, selected: boolean, selectedRows: IHashList, nativeEvent: any) => {
    const {
      dispatch,
      tableCardConfig: { namespace, crossPageSelect, rowKey },
    } = this.props;
    dispatch({
      type: `${namespace}/onSelectRowBase`,
      payload: {
        record,
        selected,
        rowKey,
        selectedRows,
        crossPageSelect,
      },
    });
  };

  onResize = debounce(() => {
    this.onCondigionCollapsed();
  }, 300);

  onCondigionCollapsed = () => {
    const {
      tableCardConfig: { filledParentNode },
    } = this.props;
    if (filledParentNode) {
      const header: any = document.querySelector('.bph_tablecardbase_frame .ant-table-thead');
      this.setState({
        tableScrollY: this.divTable.current!.offsetHeight - (header ? header.offsetHeight : 0) - 10,
      });
    }
  };

  renderCondition() {
    const {
      renderCondition,
      tableCardConfig: { downloadButtonState, autoSearch },
    } = this.props;
    if (renderCondition) {
      return (
        <Condition
          onRefresh={this.onRefresh}
          onSearch={this.onSearch}
          onDownload={this.onDownload}
          downloadButtonState={downloadButtonState}
          autoSearch={autoSearch}
          conditionItems={renderCondition()}
          onCollapsed={this.onCondigionCollapsed}
        />
      );
    }
    return null;
  }

  renderActionBar() {
    const {
      renderActionBar,
      tableCardConfig: { addButtonState, deleteButtonState },
      tableCardState: { selectedRows },
    } = this.props;
    return (
      <ActionBar>
        {addButtonState && addButtonState.visible && (
          <Button icon="plus" onClick={this.onAdd}>
            新增
          </Button>
        )}
        {deleteButtonState && deleteButtonState.visible && (
          <Button icon="delete" disabled={deleteButtonState.disabled} onClick={this.onDeletes}>
            删除
          </Button>
        )}
        {renderActionBar && renderActionBar()}
        {selectedRows.length > 0 && (
          <div className={'bph_selected_info'}>共选中{selectedRows.length}条</div>
        )}
      </ActionBar>
    );
  }

  render() {
    const {
      tableCardState: { rows, rowCount, pageIndex, pageSize, selectedRows, editorVisible },
      fetchListLoading,
      fetchDetailLoading,
      tableCardConfig: { columns, rowKey, scroll, pagination, filledParentNode, onRow },
      renderEditor,
    } = this.props;

    const rowSelection = {
      selectedRowKeys: selectedRows.map(h => h[rowKey]),
      onSelect: this.onSelectRow,
      onSelectAll: this.onSelectAllRows,
      getCheckboxProps: (record: IHash) => ({
        disabled: record.disabled,
      }),
    };

    let nScroll = scroll;

    if (filledParentNode) {
      if (scroll) {
        nScroll!.y = this.state.tableScrollY;
      } else {
        nScroll = {
          y: this.state.tableScrollY,
        };
      }
    }

    const tableComponent = (
      <Table
        columns={columns}
        dataSource={rows}
        pagination={false}
        onChange={this.onTableChange}
        loading={fetchListLoading || fetchDetailLoading}
        rowKey={rowKey}
        rowSelection={rowSelection}
        scroll={nScroll}
        onRow={onRow}
      />
    );

    const paginationComponent = (
      <Pagination
        total={rowCount}
        current={pageIndex}
        showSizeChanger={true}
        pageSize={pageSize}
        hideOnSinglePage={pagination ? pagination.hideOnSinglePage : true}
        onChange={this.onPaginationChange}
        onShowSizeChange={this.onPaginationChange}
      />
    );

    if (filledParentNode) {
      return (
        <div className={'bph_tablecardbase_frame'}>
          {this.renderCondition()}
          {this.renderActionBar()}
          <div ref={this.divTable} className={'bph_tablecardbase_frame_table'}>
            {tableComponent}
          </div>
          {pagination !== false && rowCount > 0 && (
            <div
              className={'bph_tablecardbase_frame_pagination'}
              style={{ justifyContent: pagination ? pagination.position : 'flex-end' }}
            >
              {paginationComponent}
            </div>
          )}

          {renderEditor && editorVisible && renderEditor()}
        </div>
      );
    } else {
      return (
        <Fragment>
          {this.renderCondition()}
          {this.renderActionBar()}
          {tableComponent}
          {pagination !== false && rowCount > 0 && (
            <div
              className="bph_tablecardbase_frame_pagination"
              style={{ justifyContent: pagination ? pagination.position : 'flex-end' }}
            >
              {paginationComponent}
            </div>
          )}
          {renderEditor && editorVisible && renderEditor()}
        </Fragment>
      );
    }
  }
}
