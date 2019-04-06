import React, { PureComponent, Fragment } from 'react';
import { IHashList } from '../../interface/iHashList';
import { PaginationConfig } from 'antd/es/table';
import { Table } from 'antd';
import { IHash } from '../../interface/iHash';
import debounce from 'lodash/debounce';
import { Condition } from '../condition';
import { ITableCardBaseProps } from './interface';

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
      tableCardConfig: { columns, rowKey, namespace, scroll },
      renderEditor,
    } = this.props;

    const rowSelection = {
      selectedRowKeys: selectedRows.map(h => h[rowKey]),
      onChange: this.onSelectRows,
    };

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
          rowSelection={rowSelection}
          scroll={scroll}
        />
        {renderEditor && renderEditor()}
      </Fragment>
    );
  }
}
