import { mergeModel, createBaseModel } from '@/index';
import { IAction } from '@/interface/iAction';
import { delay } from 'q';
import { fetchDepartment } from './service';

export const NAMESPACE = 'department';

const model = mergeModel(createBaseModel(NAMESPACE), {
  namespace: NAMESPACE,
  state: {
    sorts: [{ field: 'createDate', type: 'DESC' }],
  },
  effects: {
    *onFetchList(action: IAction, { call, put }) {
      console.log('fetchDepartment', action.payload);
      const res = yield call(fetchDepartment, action.payload);
      return res;
    },
    *onFetchDetail(action: IAction, { call, put }) {
      yield call(delay, 200);
      return action.payload;
    },
    *onSave(action: IAction, { call, put }) {
      console.log(111, action.payload);
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
