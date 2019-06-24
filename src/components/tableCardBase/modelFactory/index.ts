import { IAction, IHash } from '../../../interface';
import { Config } from '../../../config';
import { modalConfirm } from '../../modal/modalConfirm';
import { IModel, ITableCardBaseState } from './interface';

export { IModel, ITableCardBaseState };

export function createBaseModel(namespace: string) {
  return {
    namespace,
    state: {
      editorVisible: false, // 编辑框是否显示
      editorData: null, // 编辑框数据
      pageIndex: Config.pagination.startPageIndex, // 当前页号
      pageSize: Config.pagination.pageSize, // 页大小
      selectedRows: [], // 选中的行数据数组
      condition: {}, // 条件
      conditionExtend: {}, // 条件扩展
      bodyClientWidth: 0,
      bodyClientHeight: 0,
      sorts: [], // 排序
      rows: [], // 当页数据
      rowCount: 0, // 总数据行数
      selectType: 'checkbox',
    },

    effects: {
      *onSearchBase(action: IAction, { call, put, take }) {
        yield put({
          type: 'onSaveConditionBase', // 记录条件
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
          selectType: selectTypeInState,
          match: matchInState,
          pagination: paginationInState,
        } = yield select(state => state[namespace]);
        const {
          pageIndex = pageIndexInState,
          pageSize = pageSizeInState,
          sorter,
          selectType = selectTypeInState,
          pagination = paginationInState,
          match = matchInState,
          clear = false, // 是否清空选中的数据
        } = action.payload;

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

        const fetchListPayload: IHash = {
          ...condition,
          ...conditionExtend,
          match,
        };
        if (pagination !== false) {
          fetchListPayload[Config.pagination.pageIndexFieldName] =
            pageIndex + Config.pagination.startPageIndex - 1;
          fetchListPayload[Config.pagination.pageSizeFieldName] = pageSize;
        }

        if (sorts && sorts.length) {
          fetchListPayload.sorts = sorts;
        }

        // 调用子类的查询方法
        const res = yield yield put({
          type: 'onFetchList',
          payload: fetchListPayload,
        }) || {
          rows: [],
          rowCount: 0,
        };

        yield put({
          type: 'onFetchListDoneBase',
          payload: {
            rows: res.rows,
            rowCount: res.rowCount,
            pageIndex,
            pageSize,
            sorts,
            selectType,
            match,
            pagination,
          },
        });

        if (clear || selectType !== 'crossPageSelect') {
          yield put({
            type: 'onUnSelectedRows', // 将选中的数据清空
            payload: {},
          });
        }
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
          // 刷新数据
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
          // 将选中的数据清空
          yield put({
            type: 'onUnSelectedRows',
            payload: {},
          });
        }
      },
      *onDownloadBase(action: IAction, { call, put, select }) {
        const { match } = yield select(state => state[namespace]);
        yield put({
          type: 'onDownload',
          payload: { ...action.payload, match },
        });
      },
      *onSaveBase(action: IAction, { call, put, select }) {
        const { match } = yield select(state => state[namespace]);
        const res = yield yield put({
          type: 'onSave',
          payload: { ...action.payload, match },
        });

        // 关闭编辑框
        yield put({
          type: 'onEditorVisibleChangedBase',
          payload: {
            editorVisible: false,
          },
        });

        // 刷新数据
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

      // 刷新数据，一般是删除，修改数据时调用。这里会用原来的数据来调用查询
      *onRefreshBase(action: IAction, { call, put, select }) {
        const {
          pageIndex,
          pageSize,
          sorts,
          pagination: paginationInState,
          selectType: selectTypeInState,
          match: matchInState,
        } = yield select(s => s[namespace]);

        const {
          pagination = paginationInState,
          selectType = selectTypeInState,
          match = matchInState,
        } = action.payload;

        yield put({
          type: 'onFetchListBase',
          payload: {
            pageIndex,
            pageSize,
            sorts,
            pagination,
            selectType,
            match,
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
        const {
          rowCount,
          rows,
          pageIndex,
          pageSize,
          sorts,
          selectType,
          match,
          pagination,
        } = action.payload;

        state.rows = rows;
        state.rowCount = rowCount;
        state.pageIndex = pageIndex;
        state.pageSize = pageSize;
        state.sorts = sorts;
        state.match = match;
        state.selectType = selectType;
        state.pagination = pagination;
      },

      onUnSelectedRows(state: ITableCardBaseState, action: IAction) {
        state.selectedRows = [];
      },

      onSelectAllRowsBase(state: ITableCardBaseState, action: IAction) {
        const { rowKey, selected, selectedRows, selectType, changeRows } = action.payload;
        if (!selectType) {
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
        const { record, rowKey, selected, selectedRows, selectType } = action.payload;
        if (selectType === 'crossPageSelect') {
          // 如果是跨页选择
          if (selected) {
            state.selectedRows.push(record);
          } else {
            const index = state.selectedRows.findIndex(h => h[rowKey] === record[rowKey]);
            if (index > -1) {
              state.selectedRows.splice(index, 1);
            }
          }
        } else {
          // 如果不是跨页
          state.selectedRows = selectedRows;
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
        state.sorts = [...state.initSorts];
      },
    },
  };
}

export function mergeModel(baseModel: IModel, model: IModel) {
  const state: any = { ...baseModel.state, ...model.state };
  state.initCondition = { ...state.condition };
  state.initSorts = [...state.sorts];
  const effects = { ...baseModel.effects, ...model.effects };
  const reducers = { ...baseModel.reducers, ...model.reducers };
  return {
    namespace: model.namespace,
    state,
    effects,
    reducers,
  };
}
