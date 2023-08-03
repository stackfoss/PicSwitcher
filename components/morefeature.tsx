import React from 'react';
import styles from '../styles/app.module.css';
import {DollarOutlined, DiffOutlined, FireOutlined} from '@ant-design/icons';

const MoreFeature: React.FC = () => {
  return (
    <div className={styles.features}>
      <p className={styles.feature}>
        <span role="img" aria-label="100% Free">
        <DollarOutlined />
        </span>{' '}
        100% Free
      </p>
      <p className={styles.feature}>
        <span role="img" aria-label="Easy to Use">
          <FireOutlined />
        </span>{' '}
        Easy to Use
      </p>
      <p className={styles.feature}>
        <span role="img" aria-label="Unlimited Conversion">
          <DiffOutlined />
        </span>{' '}
        Unlimited Conversion
      </p>
    </div>
  );
};

export default MoreFeature;
