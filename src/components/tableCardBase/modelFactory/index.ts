import { IAction } from '../../../interface';
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
      pageIndex: 0,
      pageSize: 10,
      totalCount: 0,
      selectedRows: [],
      condition: {},
      bodyClientWidth: 0,
      bodyClientHeight: 0,
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
        const { condition, pageSize: pageSizeInState } = yield select(state => state[namespace]);
        const { pageIndex, pageSize } = action.payload;

        // 调用子类的查询方法
        const res = yield yield put({
          type: 'onFetchList',
          payload: {
            [Config.pagination.pageIndexFieldName]:
              pageIndex + Config.pagination.startPageIndex - 1,
            [Config.pagination.pageSizeFieldName]: pageSize || pageSizeInState,
            ...condition,
          },
        });

        yield put({
          type: 'onFetchListDoneBase',
          payload: {
            rows: res.rows,
            rowCount: res.rowCount,
            pageIndex,
            pageSize,
          },
        });
      },

      *onOpenDetailBase(action: IAction, { call, put, take, select }) {
        // 调用子类的查询方法
        const data = yield yield put({
          type: 'onFetchDetail',
          payload: action.payload,
        });
        yield put({
          type: 'onEditorVisibleChangedBase',
          payload: {
            editorVisible: true,
            editorData: data, // 从服务端获取到的明细
            editorDataFromList: action.payload, // 从列表里获取到的数据
            editorDoType: 'edit',
          },
        });
        yield put({
          type: 'onFetchDetailDone',
          payload: {
            editorData: data, // 从服务端获取到的明细
            editorDataFromList: action.payload, // 从列表里获取到的数据
          },
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
      },

      *onRefreshBase(action: IAction, { call, put, select }) {
        const { pageIndex, pageSize } = yield select(state => state[namespace]);
        yield put({
          type: 'onFetchListBase',
          payload: {
            pageIndex,
            pageSize,
          },
        });
      },
    },

    reducers: {
      onSaveConditionBase(state: ITableCardBaseState, action: IAction) {
        state.condition = action.payload;
      },
      onFetchListDoneBase(state: ITableCardBaseState, action: IAction) {
        const { rowCount, rows, pageIndex, pageSize } = action.payload;

        state.rows = rows;
        state.rowCount = rowCount;
        state.pageIndex = pageIndex;
        state.pageSize = pageSize;
        state.selectedRows = [];
      },

      onSelectRowsBase(state: ITableCardBaseState, action: IAction) {
        const { selectedRows, selectedRowKeys } = action.payload;
        state.selectedRows = selectedRows;
      },

      onEditorVisibleChangedBase(state: ITableCardBaseState, action: IAction) {
        const { editorVisible, editorData, editorDoType } = action.payload;
        state.editorVisible = editorVisible;
        state.editorData = editorData;
        state.editorDoType = editorDoType;
      },

      onResize(state: ITableCardBaseState, action: IAction) {
        const { clientWidth, clientHeight } = action.payload;
        state.bodyClientWidth = clientWidth;
        state.bodyClientHeight = clientHeight;
      },
    },
  };
}

export function mergeModel(baseModel: IModel, model: IModel) {
  const state = { ...baseModel.state, ...model.state };
  const effects = { ...baseModel.effects, ...model.effects };
  const reducers = { ...baseModel.reducers, ...model.reducers };
  return {
    namespace: model.namespace,
    state,
    effects,
    reducers,
  };
}
