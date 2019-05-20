import React from 'react';
import { Table1 } from './table1';
import { Table2 } from './table2';

interface IProps {}

export default class Test extends React.PureComponent<IProps> {
  render() {
    return (
      <React.Fragment>
        <Table1 match={this.props.match} />
        {/* <Table2 /> */}
      </React.Fragment>
    );
  }
}
