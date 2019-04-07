import { mergeModel, createBaseModel } from '@/index';
import { IAction } from '@/interface/iAction';
import mockdata from '../mockdata/mockdata';
import { delay } from 'q';

export const NAMESPACE_TABLE1 = 'page.table.card.test.table1';

const model = mergeModel(createBaseModel(NAMESPACE_TABLE1), {
  namespace: NAMESPACE_TABLE1,
  state: {},
  effects: {
    *onFetchList(action: IAction, { call, put }) {
      yield call(delay, 500);
      return mockdata;
    },
    *onFetchDetail(action: IAction, { call, put }) {
      yield call(delay, 500);
      return mockdata.rows[0];
    }
  },
  reducers: {},
});

export default model;
