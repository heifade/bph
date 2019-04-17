import React from 'react';
import styles from './styles.less';

export default function(props: any) {
  const { match } = props;

  return (
    <div>
      <div className={styles.title1}>{match.params.name}用户信息编辑</div>
    </div>
  );
}
