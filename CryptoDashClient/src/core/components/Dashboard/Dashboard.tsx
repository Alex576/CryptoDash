import React from 'react';

import styles from './Dashboard.module.scss';

export interface DashboardProps {
  prop?: string;
}

export function Dashboard({prop = 'default value'}: DashboardProps) {
  return <div className={styles.Dashboard}>Dashboard {prop}</div>;
}
