import React from 'react';
import { UploadOutlined,DownloadOutlined, RetweetOutlined, SmileOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import styles from '../styles/app.module.css';

const Howto: React.FC = () => (
<div className={styles['steps']}>
  <Steps 
    items={[
      {
        title: 'Upload',
        status: 'finish',
        icon: <UploadOutlined />,
      },
      {
        title: 'Convert',
        status: 'process',
        icon: <RetweetOutlined />,
      },
      {
        title: 'Download',
        status: 'finish',
        icon: <DownloadOutlined />,
      },
      {
        title: 'Done',
        status: 'wait',
        icon: <SmileOutlined />,
      },
    ]}
  />
  </div>
);

export default Howto;
