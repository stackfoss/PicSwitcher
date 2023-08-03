import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import styles from '../styles/app.module.css';

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: '🤔 What is PicSwitcher?',
    children: <p>PicSwitcher is a free online tool that allows you to convert and resize images between various formats, including PNG, JPEG, SVG, ICO, TIFF, WEBP, EPS, PSD, and ICNS. It is fast, easy to use, and runs entirely in your browser.</p>,
  },
  {
    key: '2',
    label: '🖼️ How do I convert an image to another format?',
    children: <p>To convert an image to another format, simply click or drag your image file into the designated area. PicSwitcher will automatically convert the image to your chosen format, and you can download it with a single click.</p>,
  },
  {
    key: '3',
    label: '🎨 Can I resize the image to my desired dimensions?',
    children: <p>Yes, you can easily customize the width and height of the output image. Simply enter the desired width and height values in pixels, and PicSwitcher will resize the image accordingly while maintaining its quality.</p>,
  },
  {
    key: '4',
    label: '💰 Is PicSwitcher completely free to use?',
    children: <p>Yes, PicSwitcher is 100% free to use. There are no hidden charges or subscriptions required. Simply visit the website and start converting and resizing images instantly.</p>,
  },
  {
    key: '5',
    label: '🌐 Can I use PicSwitcher offline?',
    children: <p>Yes, PicSwitcher is a Progressive Web App (PWA), which means that once the webpage is loaded, you can use it entirely offline. The tool relies on the latest Web APIs, such as URL and Canvas API, making it possible to work offline without an internet connection.</p>,
  },
  {
    key: '6',
    label: '🔄 Is there a limit to the number of conversions I can perform?',
    children: <p>No, there are no limits on the number of conversions you can perform. You can convert and resize as many images as you need, without any restrictions.</p>,
  },
  {
    key: '7',
    label: '💻 Can I use PicSwitcher on different devices?',
    children: <p>Yes, PicSwitcher is compatible with various devices, including desktop computers, laptops, tablets, and smartphones. You can access the tool from any modern web browser.</p>,
  },
  {
    key: '8',
    label: '🌟 What makes PicSwitcher unique compared to other image converters?',
    children: <p>PicSwitcher stands out as a simple and user-friendly online tool that offers fast and reliable image conversion and resizing. It supports a wide range of image formats and allows customization of width and height, making it a versatile solution for designers and developers.</p>,
  },
];

const Faq: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className={styles.faqContainer}>
      <Collapse items={items} defaultActiveKey={['1']} onChange={onChange}>
        {items.map((item) => (
          <Collapse.Panel key={item.key} header={<div className={styles.faqItemLabel}>{item.label}</div>}>
            <div className={styles.faqItemContent}>{item.children}</div>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Faq;
