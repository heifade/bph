import { IAction, IHash } from '../../../interface';
import { Config } from '../../../config';
import { modalConfirm } from '../../modal/modalConfirm';
import { IModel, ITableCardBaseState } from './interface';

export { IModel, ITableCardBaseState };

export function createBaseModel(namespace: string) {
  return {
    namespace,
    state: {
      editorVisible: false,
      editorData: null,
      pageDataList: [],
      pageIndex: Config.pagination.startPageIndex,
      pageSize: 10,
      totalCount: 0,
      selectedRows: [],
      condition: {},
      conditionExtend: {},
      bodyClientWidth: 0,
      bodyClientHeight: 0,
      sorts: [],
      rows: [],
      rowCount: 0,
    },

    effects: {
      *onSearchBase(action: IAction, { call, put, take }) {
        yield put({
          type: 'onSaveConditionBase',
          payload: action.payload.condition,
        });

        yield put({
          type: 'onFetchListBase',
          payload: action.payload,
        });
      },
      *onFetchListBase(action: IAction, { call, put, take, select }) {
        const {
          condition,
          conditionExtend,
          pageIndex: pageIndexInState,
          pageSize: pageSizeInState,
          sorts: sortsInState,
        } = yield select(state => state[namespace]);
        const {
          pageIndex: pageIndexInPayload,
          pageSize: pageSizeInPayload,
          sorter,
          crossPageSelect,
        } = action.payload;

        let pageSize = pageSizeInState;
        if (pageSizeInPayload !== undefined && pageSizeInPayload !== null) {
          pageSize = pageSizeInPayload;
        }
        let pageIndex = pageIndexInState;
        if (pageIndexInPayload !== undefined && pageIndexInPayload !== null) {
          pageIndex = pageIndexInPayload;
        }

        let sorts = sortsInState || [];
        if (sorter) {
          sorts = sorter.field
            ? [
                {
                  field: sorter.field,
                  type: sorter.order === 'ascend' ? 'ASC' : 'DESC',
                },
              ]
            : [];
        }

        // 调用子类的查询方法
        const res = yield yield put({
          type: 'onFetchList',
          payload: {
            [Config.pagination.pageIndexFieldName]:
              pageIndex + Config.pagination.startPageIndex - 1,
            [Config.pagination.pageSizeFieldName]: pageSize,
            sorts,
            ...condition,
            ...conditionExtend,
          },
        });

        yield put({
          type: 'onFetchListDoneBase',
          payload: {
            rows: res.rows,
            rowCount: res.rowCount,
            pageIndex,
            pageSize,
            sorts,
            crossPageSelect,
          },
        });
      },

      *onOpenDetailBase(action: IAction, { call, put, take, select }) {
        const { record, type } = action.payload;
        // 调用子类的查询方法
        const data = yield yield put({
          type: 'onFetchDetail',
          payload: record,
        });
        yield put({
          type: 'onEditorVisibleChangedBase',
          payload: {
            editorVisible: true,
            editorData: data, // 从服务端获取到的明细
            editorDataFromList: record, // 从列表里获取到的数据
            editorDoType: type,
          },
        });
        yield put({
          type: 'onFetchDetailDone',
          payload: {
            editorData: data, // 从服务端获取到的明细
            editorDataFromList: record, // 从列表里获取到的数据
          },
        });
        yield yield put({
          type: 'onAfterOpenDetail',
          payload: {
            editorData: data, // 从服务端获取到的明细
            editorDataFromList: record, // 从列表里获取到的数据
          },
        });
      },
      *onDeletesBase(action: IAction, { call, put, select }) {
        const selectedRows = yield select(state => state[namespace].selectedRows);
        yield yield put({
          type: 'onDeleteBase',
          payload: selectedRows,
        });
      },
      *onDeleteBase(action: IAction, { call, put, select }) {
        if (yield call(modalConfirm, '是否确认删除？')) {
          yield yield put({
            type: 'onDelete',
            payload: action.payload,
          });

          yield yield put({
            type: 'onRefreshBase',
            payload: {},
          });

          yield yield put({
            type: 'onAfterDelete',
            payload: {
              data: action.payload,
            },
          });
        }
      },
      *onDownloadBase(action: IAction, { call, put, select }) {
        yield put({
          type: 'onDownload',
          payload: action.payload,
        });
      },
      *onSaveBase(action: IAction, { call, put, select }) {
        const res = yield yield put({
          type: 'onSave',
          payload: action.payload,
        });

        yield put({
          type: 'onEditorVisibleChangedBase',
          payload: {
            editorVisible: false,
          },
        });

        yield yield put({
          type: 'onRefreshBase',
          payload: {},
        });

        // 调用子类方法
        yield yield put({
          type: 'onAfterSave',
          payload: {
            data: action.payload,
          },
        });
      },

      *onRefreshBase(action: IAction, { call, put, select }) {
        const { pageIndex, pageSize, sorts } = yield select(state => state[namespace]);
        yield put({
          type: 'onFetchListBase',
          payload: {
            pageIndex,
            pageSize,
            sorts,
          },
        });
      },
    },

    reducers: {
      // 设置额外的条件
      onSetConditionExtend(state: ITableCardBaseState, action: IAction) {
        state.conditionExtend = action.payload;
      },
      onSaveConditionBase(state: ITableCardBaseState, action: IAction) {
        state.condition = action.payload;
      },
      onFetchListDoneBase(state: ITableCardBaseState, action: IAction) {
        const { rowCount, rows, pageIndex, pageSize, sorts, crossPageSelect } = action.payload;

        state.rows = rows;
        state.rowCount = rowCount;
        state.pageIndex = pageIndex;
        state.pageSize = pageSize;
        if (!crossPageSelect) {
          // 不跨页选择时，清空已选数据
          state.selectedRows = [];
        }
        state.sorts = sorts;
      },

      onSelectAllRowsBase(state: ITableCardBaseState, action: IAction) {
        const { rowKey, selected, selectedRows, crossPageSelect, changeRows } = action.payload;
        if (!crossPageSelect) {
          // 如果不是跨页
          state.selectedRows = selectedRows;
        } else {
          // 如果是跨页选择
          if (selected) {
            const addRows = selectedRows.filter(
              (h: IHash) => !state.selectedRows.find(h1 => h[rowKey] === h1[rowKey]),
            );
            state.selectedRows = state.selectedRows.concat(addRows);
          } else {
            state.selectedRows = state.selectedRows.filter(
              h => !changeRows.find((h1: IHash) => h[rowKey] === h1[rowKey]),
            );
          }
        }
      },

      onSelectRowBase(state: ITableCardBaseState, action: IAction) {
        const { record, rowKey, selected, selectedRows, crossPageSelect } = action.payload;
        if (!crossPageSelect) {
          // 如果不是跨页
          state.selectedRows = selectedRows;
        } else {
          // 如果是跨页选择
          if (selected) {
            state.selectedRows.push(record);
          } else {
            const index = state.selectedRows.findIndex(h => h[rowKey] === record[rowKey]);
            if (index > -1) {
              state.selectedRows.splice(index, 1);
            }
          }
        }
      },

      onEditorVisibleChangedBase(state: ITableCardBaseState, action: IAction) {
        const { editorVisible, editorData, editorDoType } = action.payload;
        state.editorVisible = editorVisible;
        state.editorData = editorData;
        state.editorDoType = editorDoType;
      },

      onResizeBase(state: ITableCardBaseState, action: IAction) {
        const { clientWidth, clientHeight } = action.payload;
        state.bodyClientWidth = clientWidth;
        state.bodyClientHeight = clientHeight;
      },
      onResetBase(state: ITableCardBaseState, action: IAction) {
        state.pageIndex = Config.pagination.startPageIndex;
        state.condition = { ...state.initCondition };
      },
    },
  };
}

export function mergeModel(baseModel: IModel, model: IModel) {
  const state: any = { ...baseModel.state, ...model.state };
  state.initCondition = { ...state.condition };
  const effects = { ...baseModel.effects, ...model.effects };
  const reducers = { ...baseModel.reducers, ...model.reducers };
  return {
    namespace: model.namespace,
    state,
    effects,
    reducers,
  };
}
