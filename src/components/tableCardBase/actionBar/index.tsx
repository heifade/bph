import React from 'react';
import './styles.less';

interface IProps {
  children: React.ReactNode | React.ReactNodeArray;
}

export class ActionBar extends React.PureComponent<IProps> {
  render() {
    const { children } = this.props;
    return <div className={`bph_actionBar`}>{children}</div>;
  }
}
