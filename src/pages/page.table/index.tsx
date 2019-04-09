import React from 'react';
import { Table1 } from './table1';
import { Table2 } from './table2';
import { connect } from 'dva';
import { NAMESPACE_TABLE2 } from './models/table2';

interface IProps {
  table2Visible: boolean;
}

@connect(pars => {
  return {
    table2Visible: pars[NAMESPACE_TABLE2].visible,
  };
})
export default class Test extends React.PureComponent<IProps> {
  render() {
    const { table2Visible } = this.props;
    return (
      <React.Fragment>
        <Table1 />
        {table2Visible && <Table2 />}
      </React.Fragment>
    );
  }
}
