import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/app.module.css';
import {
	Button,
	Upload,
	InputNumber,
	Radio,
	RadioChangeEvent,
	Divider,
	Collapse,
} from 'antd';
const { Dragger } = Upload;
import type { UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';
const { Panel } = Collapse;
import dynamic from 'next/dynamic';
const GitHubButtonWithNoSSR = dynamic(() => import('react-github-btn'), {
	ssr: false,
});

enum FileType {
	png = 'png',
	jpeg = 'jpeg',
	ico = 'ico',
}

// Canvas Class with helpful utils to add, update, and convert svg to different image type
class Canvas {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	svgName: string;
	svgURL: string;
	downloadType: FileType;

	constructor(
		canvas: HTMLCanvasElement,
		width: number,
		height: number,
		type: FileType
	) {
		this.canvas = canvas;
		this.canvas.width = width;
		this.canvas.height = height;
		this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		this.svgName = '';
		this.svgURL = '';
		this.downloadType = type;
	}

	// Clear canvas as transparent (white for .jpeg)
	clear() {
		const { width, height } = this.canvas;
		if (this.downloadType === FileType.jpeg) {
			this.ctx.fillStyle = 'white';
			this.ctx.fillRect(0, 0, width, height);
		} else {
			this.ctx.clearRect(0, 0, width, height);
		}
	}

	// Draw svg file on canvas
	drawSvg() {
		const img = new Image();
		const { width, height } = this.canvas;
		img.onload = () => {
			this.ctx.drawImage(img, 0, 0, width, height);
		};
		img.src = this.svgURL;
	}

	// Add svg file on canvas and draw it
	addSvg(svgName: string = 'file', svgFile: Blob | any) {
		this.svgName = svgName;
		this.clear();
		// Revoke previous svg object URL to prevent memory leak
		if (this.svgURL) URL.revokeObjectURL(this.svgURL);
		this.svgURL = URL.createObjectURL(svgFile);
		this.drawSvg();
	}

	// Update svg file on canvas based on new width and height
	updateCanvas(width: number, height: number) {
		this.canvas.width = width;
		this.canvas.height = height;
		this.clear();
		this.drawSvg();
	}

	// Update download file type and svg file on canvas
	updateDownloadType(type: FileType) {
		this.downloadType = type;
		this.updateCanvas(this.canvas.width, this.canvas.height);
	}

	// Download svg file as image to the selected file type
	downloadCanvasAsImg(type: FileType) {
		let fileType, fileName;
		switch (type) {
			case FileType.ico:
				fileType = 'image/x-icon';
				fileName = 'favicon.ico';
				break;
			default:
				fileType = `image/${type}`;
				const { width, height } = this.canvas;
				if (width === height) fileName = `${this.svgName}-${width}.${type}`;
				else fileName = `${this.svgName}-${width}x${height}.${type}`;
		}
		const link = document.createElement('a');
		link.download = fileName;
		link.href = this.canvas.toDataURL(fileType, 1.0);
		link.click();
	}
}

let canvas: Canvas;
const initialWidth: number = 48;
const initialHeight: number = 48;
const initialType: FileType = FileType.png;
const Home: NextPage = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [width, setWidth] = useState(initialWidth);
	const [height, setHeight] = useState(initialHeight);
	const [type, setType] = useState(initialType);
	const [dummy, setDummy] = useState(false);

	// Create Canvas Object once component finishes mounting
	useEffect(() => {
		if (canvasRef.current && !canvas)
			canvas = new Canvas(canvasRef.current, width, height, type);
	}, []);

	// Handler when a file is added
	const onFileAdd = (info: UploadChangeParam<UploadFile>) => {
		const { status, originFileObj: svgFile } = info.file;
		if (status === 'done') {
			const svgName = svgFile?.name.slice(0, -4);
			canvas.addSvg(svgName, svgFile);
			// React Escape Hatch: force a react refresh with dummy
			setDummy(!dummy);
		}
	};

	const onWidthChange = (value: any) => {
		if (Number.isFinite(value)) {
			const newWidth = value;
			const newHeight = value;
			canvas.updateCanvas(newWidth, newHeight);
			setWidth(newWidth);
			setHeight(newHeight);
		}
	};

	const onHeightChange = (value: any) => {
		if (Number.isFinite(value)) {
			const newHeight = value;
			canvas.updateCanvas(width, newHeight);
			setHeight(newHeight);
		}
	};

	const onTypeChange = (e: RadioChangeEvent) => {
		const newType = e.target.value;
		canvas.updateDownloadType(newType);
		setType(newType);
		if (newType === FileType.ico) {
			setWidth(48);
			setHeight(48);
		}
	};

	return (
		<div>
<Head>
  <title>SVG2Image - SVG to Image Converter</title>
  <meta
    name='description'
    content='Convert SVG files to PNG, JPEG, and ICO (Favicon) images with custom width and height. Free and fast online SVG to image converter.'
  />
  <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  <link rel='icon' href='/favicon.ico' />
</Head>


<main className={styles.main}>
  <h1 className={styles.heading}>
    <span role="img" aria-label="SVG2Image">
      🖼️ SVG2Image
    </span>
  </h1>
  <p className={styles.description}>
    Easily convert{' '}
<span className={styles.spanText}>.SVG</span> to{' '}
<span className={styles.spanText}>.PNG</span>,{' '}
<span className={styles.spanText}>.JPEG</span>, and{' '}
<span className={styles.spanText}>.ICO</span>
  </p>
  <Dragger
    name='file'
    accept='image/*'
    customRequest={
      (({ onSuccess }: { onSuccess: any }) =>
        setTimeout(() => onSuccess('success'), 0)) as any
    }
    className={styles.dragger}
    maxCount={1}
    showUploadList={false}
    onChange={onFileAdd}
  >
    <p className={styles.uploadText}>
      <span role="img" aria-label="Upload">
        ⤒
      </span>{' '}
      Click or Drag SVG File Here
    </p>
    <div className={styles.canvasWrapper}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  </Dragger>
  <div className={styles.inputGroup}>
    <InputNumber
      size='large'
      value={width}
      onChange={onWidthChange}
      addonBefore='↔️ Width'
      addonAfter='px'
    />
    <InputNumber
      size='large'
      value={height}
      onChange={onHeightChange}
      addonBefore='↕️ Height'
      addonAfter='px'
    />
  </div>
  <div className={styles.radioGroup}>
    <label className={`ant-radio-button-wrapper ${styles.radioLabel}`}>
      <span role="img" aria-label="Convert To">
        📁 Convert to
      </span>
    </label>
    <Radio.Group value={type} onChange={onTypeChange}>
      {Object.keys(FileType).map((type) => (
        <Radio.Button key={type} value={type}>
          {type}
        </Radio.Button>
      ))}
    </Radio.Group>
  </div>
  <Button
    type='primary'
    onClick={() => canvas.downloadCanvasAsImg(type)}
    disabled={!canvas?.svgURL}
    className={styles.downloadButton}
  >
    <span role="img" aria-label="Download">
      ↧
    </span>{' '}
    Download as .{type} Image
  </Button>
        <Divider plain>
❖ Key Features
</Divider>
        <div className={styles.features}>
        <p className={styles.feature}>
          <span role="img" aria-label="100% Free">
            ✨
          </span>{' '}
          100% Free
        </p>
        <p className={styles.feature}>
          <span role="img" aria-label="Easy to Use">
            🧠
          </span>{' '}
          Easy to Use
        </p>
        <p className={styles.feature}>
          <span role="img" aria-label="Unlimited Conversion">
            🔁
          </span>{' '}
          Unlimited Conversion
        </p>
      </div>
      <Divider plain>
？ FAQ
</Divider>
<Collapse className={styles.collapse}>
  <Panel header='🤔 What is SVG2Image?' key='1'>
    SVG2Image is a free online tool that allows you to convert SVG files to various image formats, such as PNG, JPEG, and ICO (Favicon). It is fast, easy to use, and runs entirely in your browser.
  </Panel>
  <Panel header='🖼️ How do I convert an SVG file to an image?' key='2'>
    To convert an SVG file to an image, simply click or drag your SVG file into the designated area. The tool will automatically convert the SVG to your chosen image format, and you can download it with a single click.
  </Panel>
  <Panel header='🎨 What image formats are supported for conversion?' key='3'>
    SVG2Image supports three image formats for conversion: PNG, JPEG, and ICO (Favicon). You can choose any of these formats based on your requirements.
  </Panel>
  <Panel header='📏 Can I customize the width and height of the output image?' key='4'>
    Yes, you can easily customize the width and height of the output image. Simply enter the desired width and height values in pixels, and the tool will adjust the image accordingly.
  </Panel>
  <Panel header='💰 Is SVG2Image completely free to use?' key='5'>
    Yes, SVG2Image is 100% free to use. There are no hidden charges or subscriptions required. Simply visit the website and start converting SVG files to images instantly.
  </Panel>
  <Panel header='🌐 Can I use SVG2Image offline?' key='6'>
    Yes, SVG2Image is an online tool, but once the webpage is loaded, you can use it entirely offline. The tool relies on the latest Web APIs, such as URL and Canvas API, making it possible to work offline without an internet connection.
  </Panel>
  <Panel header='🔄 Is there a limit to the number of conversions I can perform?' key='7'>
    No, there are no limits on the number of conversions you can perform. You can convert as many SVG files to images as you need, without any restrictions.
  </Panel>
  <Panel header='💻 Can I use SVG2Image on different devices?' key='8'>
    Yes, SVG2Image is compatible with various devices, including desktop computers, laptops, tablets, and smartphones. You can access the tool from any modern web browser.
  </Panel>
  <Panel header='🌟 What makes SVG2Image unique compared to other SVG converters?' key='9'>
    SVG2Image stands out as a simple and user-friendly online tool that offers fast and reliable SVG to image conversion. It provides a range of image formats and allows customization of width and height, making it a versatile solution for designers and developers.
  </Panel>
</Collapse>

<Divider plain>
⦿ Testimonials
</Divider>

  <div className={styles.testimonial}>
    <img src="https://images.unsplash.com/photo-1567515004624-219c11d31f2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Testimonial" className={styles.testimonialImage} />
    <div className={styles.testimonialContent}>
      <div className={styles.testimonialName}>John Doe</div>
      <div className={styles.testimonialText}>"This tool is amazing! It helped me convert my SVG files to images effortlessly."</div>
    </div>
  </div>
    <div className={styles.testimonial}>
    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=461&q=80" alt="Testimonial" className={styles.testimonialImage} />
    <div className={styles.testimonialContent}>
      <div className={styles.testimonialName}>Sarah Wilson</div>
      <div className={styles.testimonialText}>"SVG2Image made converting SVG files a breeze! It saved me so much time, and the image quality is top-notch."</div>
    </div>
  </div>
  
    <div className={styles.testimonial}>
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="Testimonial" className={styles.testimonialImage} />
    <div className={styles.testimonialContent}>
      <div className={styles.testimonialName}>Emily Davis</div>
      <div className={styles.testimonialText}>"I can't believe how simple and fast SVG2Image is. It's now my go-to tool for SVG conversions."</div>
    </div>
  </div>
  <div className={styles.testimonial}>
    <img src="https://images.unsplash.com/photo-1565363410878-d7dd2e0d4e6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="Testimonial" className={styles.testimonialImage} />
    <div className={styles.testimonialContent}>
      <div className={styles.testimonialName}>Alex Turner</div>
      <div className={styles.testimonialText}>"I love how SVG2Image handles all the technicalities for me. It's the best SVG converter out there."</div>
    </div>
  </div>


</main>

<footer className={styles.footer}>


  <div className={styles.footerColumns}>
    <div className={styles.footerColumn}>
      <h3 className={styles.footerHeading}>Description</h3>
      <p>
        Effortlessly convert your .SVG files to various image formats: .PNG, .JPEG, and .ICO. 🖼️
      </p>
    </div>
    <div className={styles.footerColumn}>
      <h3 className={styles.footerHeading}>Quick Links</h3>
      <ul>
        <li>
          <a href='#'>Home</a>
        </li>
        <li>
          <a href='https://www.stackfoss.com'>StackFoss</a>
        </li>
        <li>
          <a href='https://psychohub.stackfoss.com'>PsychoHub</a>
        </li>
        <li>
          <a href='https://codetranslify.stackfoss.com'>CodeTranslify</a>
        </li>
        {/* Add other quick links here */}
      </ul>
    </div>
    <div className={styles.footerColumn}>
      <h3 className={styles.footerHeading}>Socials</h3>
      <ul>
        <li>
          <a href='https://www.youtube.com/@stackfoss'>Youtube</a>
        </li>
        <li>
          <a href='https://twitter.com/stackfoss'>Twitter</a>
        </li>
        <li>
          <a href='https://www.facebook.com/stackfoss'>Facebook</a>
        </li>
        <li>
          <a href='https://www.instagram.com/stackfoss'>Instagram</a>
        </li>
        {/* Add other social media links here */}
      </ul>
    </div>
  </div>

  <p className={styles.footerCopyright}>
    © {new Date().getFullYear()} <a href='https://www.stackfoss.com'>StackFoss</a>. All rights reserved.
  </p>
</footer>





		</div>
	);
};

export default Home;
