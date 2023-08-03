import React from 'react';
import styles from '../styles/app.module.css';
import { DollarOutlined, DiffOutlined, FireOutlined } from '@ant-design/icons';

const MoreFeature: React.FC = () => {
  return (
    <div className={styles.features}>
      <div className={styles.feature}>
        <span className={styles.icon}>
          <DollarOutlined />
        </span>
        <p className={styles.featureText}>100% Free</p>
      </div>
      <div className={styles.feature}>
        <span className={styles.icon}>
          <FireOutlined />
        </span>
        <p className={styles.featureText}>Easy to Use</p>
      </div>
      <div className={styles.feature}>
        <span className={styles.icon}>
          <DiffOutlined />
        </span>
        <p className={styles.featureText}>Unlimited Conversion</p>
      </div>
    </div>
  );
};

export default MoreFeature;

