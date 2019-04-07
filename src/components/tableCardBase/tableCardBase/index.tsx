import React, { PureComponent, Fragment } from 'react';
import { IHashList } from '../../../interface/iHashList';
import { PaginationConfig } from 'antd/es/table';
import { Table } from 'antd';
import { IHash } from '../../../interface/iHash';
import debounce from 'lodash/debounce';
import { Condition } from '../condition';
import { ITableCardBaseProps, ITableCardBaseConfig } from './interface';
import { ActionBar } from '../actionBar';
import { Button } from 'antd';

export { ITableCardBaseProps, ITableCardBaseConfig };

export class TableCardBase<T extends ITableCardBaseProps> extends PureComponent<T> {
  onSearch = (condition: IHash) => {
    const {
      dispatch,
      tableCardConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onSearchBase`,
      payload: {
        condition,
        pageIndex: 1,
        pageSize: 10,
      },
    });
  };

  onDelete = (record: IHash) => {
    const {
      dispatch,
      tableCardConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onDeleteBase`,
      payload: record,
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
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.onResize);
  }

  onPaginationChange = (pars: PaginationConfig) => {
    const {
      dispatch,
      tableCardConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onFetchListBase`,
      payload: {
        pageIndex: pars.current,
        pageSize: pars.pageSize,
      },
    });
  };

  onSelectRows = (selectedRowKeys: string[] | number[], selectedRows: IHashList) => {
    const {
      dispatch,
      tableCardConfig: { namespace },
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
      tableCardConfig: { namespace },
    } = this.props;
    dispatch({
      type: `${namespace}/onResize`,
      payload: {
        clientWidth: document.body.clientWidth,
        clientHeight: document.body.clientHeight,
      },
    });
  }, 300);

  renderCondition() {
    const {
      renderCondition,
      tableCardConfig: { downloadButtonState },
    } = this.props;
    if (renderCondition) {
      return (
        <Condition
          onSearch={this.onSearch}
          onDownload={this.onDownload}
          downloadButtonState={downloadButtonState}
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
    } = this.props;
    return (
      <ActionBar>
        {addButtonState && addButtonState.visible && (
          <Button icon="plus" onClick={this.onAdd}>
            新增
          </Button>
        )}
        {deleteButtonState && deleteButtonState.visible && (
          <Button icon="delete" disabled={deleteButtonState.disabled}>
            删除
          </Button>
        )}
        {renderActionBar && renderActionBar()}
      </ActionBar>
    );
  }

  render() {
    const {
      tableCardState: { rows, rowCount, pageIndex, pageSize, selectedRows },
      fetchListLoading,
      fetchDetailLoading,
      tableCardConfig: { columns, rowKey, scroll },
      renderEditor,
    } = this.props;

    const rowSelection = {
      selectedRowKeys: selectedRows.map(h => h[rowKey]),
      onChange: this.onSelectRows,
      getCheckboxProps: (record: IHash) => ({
        disabled: record.disabled,
      }),
    };

    return (
      <Fragment>
        {this.renderCondition()}
        {this.renderActionBar()}
        <Table
          columns={columns}
          dataSource={rows}
          pagination={{ current: pageIndex, total: rowCount, showSizeChanger: true, pageSize }}
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
