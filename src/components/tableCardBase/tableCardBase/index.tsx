import React, { PureComponent, Fragment } from 'react';
import { IHashList } from '../../../interface/iHashList';
import { PaginationConfig, SorterResult, TableCurrentDataSource } from 'antd/es/table';
import { Table, Button } from 'antd';
import { IHash } from '../../../interface/iHash';
import debounce from 'lodash/debounce';
import { Condition } from '../condition';
import { ITableCardBaseProps, ITableCardBaseConfig } from './interface';
import { ActionBar } from '../actionBar';

export { ITableCardBaseProps, ITableCardBaseConfig };

export class TableCardBase<T extends ITableCardBaseProps> extends PureComponent<T> {
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
      payload: record,
    });
  };

  // /**
  //  * 打开编辑框，进行编辑。
  //  */
  // onEdit = (editorData: IHash) => {
  //   const {
  //     dispatch,
  //     tableCardConfig: { namespace },
  //   } = this.props;
  //   dispatch({
  //     type: `${namespace}/onEditorVisibleChangedBase`,
  //     payload: {
  //       editorVisible: true,
  //       editorData,
  //       editorDoType: 'edit',
  //     },
  //   });
  // };

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
    // window.addEventListener('resize', this.onResize);
    // this.onResize();

    const {
      renderCondition,
      tableCardConfig: { autoSearch },
    } = this.props;
    if (!renderCondition && autoSearch !== false) {
      this.onSearch(undefined);
    }
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.onResize);
  }

  onPaginationChange = (
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
    const {
      dispatch,
      tableCardConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onResizeBase`,
      payload: {
        clientWidth: document.body.clientWidth,
        clientHeight: document.body.clientHeight,
      },
    });
  }, 300);

  renderCondition() {
    const {
      renderCondition,
      tableCardConfig: { downloadButtonState, autoSearch },
    } = this.props;
    if (renderCondition) {
      return (
        <Condition
          onSearch={this.onSearch}
          onDownload={this.onDownload}
          downloadButtonState={downloadButtonState}
          autoSearch={autoSearch}
          conditionItems={renderCondition()}
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
      tableCardState: { rows, rowCount, pageIndex, pageSize, selectedRows },
      fetchListLoading,
      fetchDetailLoading,
      tableCardConfig: { columns, rowKey, scroll, pagination },
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

    let tablePagination: PaginationConfig | boolean = {};
    if (pagination === false) {
      tablePagination = false;
    } else {
      tablePagination = {
        current: pageIndex,
        total: rowCount,
        showSizeChanger: true,
        pageSize,
        hideOnSinglePage: pagination ? pagination.hideOnSinglePage : true,
      };
    }

    return (
      <Fragment>
        {this.renderCondition()}
        {this.renderActionBar()}
        <Table
          columns={columns}
          dataSource={rows}
          pagination={tablePagination}
          onChange={this.onPaginationChange}
          loading={fetchListLoading || fetchDetailLoading}
          rowKey={rowKey}
          rowSelection={rowSelection}
          scroll={scroll}
        />
        {renderEditor && renderEditor()}
      </Fragment>
    );
  }
}
