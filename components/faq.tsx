import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: '🤔 What is SVG2Image?',
    children: <p>SVG2Image is a free online tool that allows you to convert SVG files to various image formats, such as PNG, JPEG, and ICO (Favicon). It is fast, easy to use, and runs entirely in your browser.</p>,
  },
  {
    key: '2',
    label: '🖼️ How do I convert an SVG file to an image?',
    children: <p>To convert an SVG file to an image, simply click or drag your SVG file into the designated area. The tool will automatically convert the SVG to your chosen image format, and you can download it with a single click.</p>,
  },
  {
    key: '3',
    label: '🎨 What image formats are supported for conversion?',
    children: <p> SVG2Image supports three image formats for conversion: PNG, JPEG, and ICO (Favicon). You can choose any of these formats based on your requirements.</p>,
  },
    {
    key: '4',
    label: '📏 Can I customize the width and height of the output image?',
    children: <p> Yes, you can easily customize the width and height of the output image. Simply enter the desired width and height values in pixels, and the tool will adjust the image accordingly.</p>,
  },
      {
    key: '5',
    label: '💰 Is SVG2Image completely free to use?',
    children: <p>Yes, SVG2Image is 100% free to use. There are no hidden charges or subscriptions required. Simply visit the website and start converting SVG files to images instantly.</p>,
  },
      {
    key: '6',
    label: '🌐 Can I use SVG2Image offline?',
    children: <p>Yes, SVG2Image is an online tool, but once the webpage is loaded, you can use it entirely offline. The tool relies on the latest Web APIs, such as URL and Canvas API, making it possible to work offline without an internet connection.</p>,
  },
      {
    key: '7',
    label: '🔄 Is there a limit to the number of conversions I can perform?',
    children: <p>No, there are no limits on the number of conversions you can perform. You can convert as many SVG files to images as you need, without any restrictions.</p>,
  },
      {
    key: '8',
    label: '💻 Can I use SVG2Image on different devices?',
    children: <p>Yes, SVG2Image is compatible with various devices, including desktop computers, laptops, tablets, and smartphones. You can access the tool from any modern web browser.</p>,
  },
      {
    key: '9',
    label: '🌟 What makes SVG2Image unique compared to other SVG converters?',
    children: <p>SVG2Image stands out as a simple and user-friendly online tool that offers fast and reliable SVG to image conversion. It provides a range of image formats and allows customization of width and height, making it a versatile solution for designers and developers.</p>,
  },
];

const Faq: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default Faq;
