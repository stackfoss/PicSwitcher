import React from 'react';
import { UploadOutlined,DownloadOutlined, RetweetOutlined, SmileOutlined } from '@ant-design/icons';
import { Steps } from 'antd';

const Howto: React.FC = () => (
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
);

export default Howto;
