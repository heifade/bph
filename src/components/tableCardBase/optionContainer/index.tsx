import React from 'react';
import { Divider } from 'antd';

export interface IOptionContainerProps {
  splitLine?: boolean;
  children?: React.ReactNodeArray;
}

export class OptionContainer extends React.PureComponent<IOptionContainerProps> {
  render() {
    const { children = [], splitLine = true } = this.props;
    return (
      <React.Fragment>
        {children
          .filter(h => h)
          .map((h, index) => {
            return (
              <React.Fragment key={index}>
                {splitLine && index > 0 && <Divider type="vertical" />}
                {!splitLine && index > 0 && <div style={{ width: 6, display: 'inline-block' }} />}
                {h}
              </React.Fragment>
            );
          })}
      </React.Fragment>
    );
  }
}
