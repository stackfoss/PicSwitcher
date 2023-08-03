import React from 'react';
import styles from '../styles/app.module.css';
import { ScissorOutlined, FileJpgOutlined, FileImageOutlined, PictureOutlined } from '@ant-design/icons';

const Feature: React.FC = () => {
  return (
    <div className={styles.features}>
      <div className={styles.feature}>
        <span className={styles.icon}>
          <ScissorOutlined />
        </span>
        <p className={styles.featureText}>Resize Images</p>
      </div>
      <div className={styles.feature}>
        <span className={styles.icon}>
          <FileImageOutlined />
        </span>
        <p className={styles.featureText}>PNG to JPEG Conversion</p>
      </div>
      <div className={styles.feature}>
        <span className={styles.icon}>
          <PictureOutlined />
        </span>
        <p className={styles.featureText}>PNG to ICO (Favicon) Conversion</p>
      </div>
      <div className={styles.feature}>
        <span className={styles.icon}>
          <FileJpgOutlined />
        </span>
        <p className={styles.featureText}>JPEG to PNG Conversion</p>
      </div>
    </div>
  );
};

export default Feature;

