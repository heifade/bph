import { mergeModel, createBaseModel } from '@/index';
import { IAction } from '@/interface/iAction';
import { delay } from 'q';
import { fetchList } from './service';

export const NAMESPACE = 'list1';

const model = mergeModel(createBaseModel(NAMESPACE), {
  namespace: NAMESPACE,
  state: {
    sorts: [{ field: 'gmtCreate', type: 'DESC' }],
  },
  effects: {
    *onFetchList(action: IAction, { call, put }) {
      console.log('onFetchList', action.payload);
      const res = yield call(fetchList, action.payload);
      return res;
    },
    *onFetchDetail(action: IAction, { call, put }) {
      yield call(delay, 200);
      return action.payload;
    },
    *onSave(action: IAction, { call, put }) {
      yield console.log('onSave', action.payload);
    },
    *onDelete(action: IAction, { call, put }) {
      yield console.log('onDelete', action.payload);
    },
    *onDownload(action: IAction, { call, put }) {
      yield console.log('onDownload', action.payload);
    },
  },
  reducers: {},
});

export default model;
