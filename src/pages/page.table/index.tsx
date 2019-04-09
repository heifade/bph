import React from 'react';
import { Table1 } from './table1';
import { Table2 } from './table2';
import { connect } from 'dva';

interface IProps {}

@connect(pars => {
  return {};
})
export default class Test extends React.PureComponent<IProps> {
  render() {
    return (
      <React.Fragment>
        <Table1 />
        <Table2 />
      </React.Fragment>
    );
  }
}
