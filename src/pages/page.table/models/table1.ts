import { mergeModel, createBaseModel } from '@/components/index';
import { IAction } from '@/components/interface/iAction';
import mockdata from '../mockdata/mockdata';

export const NAMESPACE_TABLE1 = 'page.table.card.test.table1';

const model = mergeModel(createBaseModel(NAMESPACE_TABLE1), {
  namespace: NAMESPACE_TABLE1,
  state: {},
  effects: {
    *onFetchList(action: IAction, { call, put }) {

      console.log(111, mockdata);

      return mockdata;
    },
  },
  reducers: {},
});

console.log(99, model);

export default model;
