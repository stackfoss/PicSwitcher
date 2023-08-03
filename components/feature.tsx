import React from 'react';
import styles from '../styles/app.module.css';
import {ScissorOutlined, FileJpgOutlined, FileImageOutlined, PictureOutlined} from '@ant-design/icons';

const Feature: React.FC = () => {
  return (
    <div className={styles.features}>
      <p className={styles.feature}>
        <span role="img" aria-label="Resize Images">
          <ScissorOutlined />
        </span>{' '}
        Resize Images
      </p>
      <p className={styles.feature}>
        <span role="img" aria-label="PNG to JPEG Conversion">
          <FileImageOutlined />
        </span>{' '}
        PNG to JPEG Conversion
      </p>
      <p className={styles.feature}>
        <span role="img" aria-label="PNG to ICO (Favicon) Conversion">
         <PictureOutlined />
        </span>{' '}
        PNG to ICO (Favicon) Conversion
      </p>
      <p className={styles.feature}>
        <span role="img" aria-label="JPEG to PNG Conversion">
        <FileJpgOutlined />
        </span>{' '}
        JPEG to PNG Conversion
      </p>
    </div>
  );
};

export default Feature;

