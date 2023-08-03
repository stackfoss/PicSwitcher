import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/app.module.css';
import {ColumnWidthOutlined, CloudUploadOutlined, LoadingOutlined} from "@ant-design/icons";
import Faq from '../components/faq';
import Feature from '../components/feature';
import MoreFeature from '../components/morefeature';
import Testimonial from '../components/testimonial';
import Footer from '../components/footer';
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
           svg = 'svg',
           tiff = 'tiff',
           webp = 'webp',
           eps = 'eps',
           psd = 'psd',
           icns = 'icns',
	
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
const onCustomRequest = (options: object) => {
  // Make sure 'onSuccess' is defined before invoking it
  if ('onSuccess' in options && typeof (options as any).onSuccess === 'function') {
    setTimeout(() => (options as any).onSuccess('success'), 0);
  }
};

const Home: NextPage = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [width, setWidth] = useState(initialWidth);
	const [height, setHeight] = useState(initialHeight);
	const [type, setType] = useState(initialType);
	const [dummy, setDummy] = useState(false);

	// Create Canvas Object once component finishes mounting
useEffect(() => {
  if (canvasRef.current && !canvas) {
    canvas = new Canvas(canvasRef.current, width, height, type);
  }
}, [width, height, type]);

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
<span className={styles.spanText}>.PNG</span>{' '}<ColumnWidthOutlined />{' '}
<span className={styles.spanText}>.JPEG</span>{' '}<ColumnWidthOutlined />{' '}
<span className={styles.spanText}>.SVG</span>{' '}<ColumnWidthOutlined />{' '}
<span className={styles.spanText}>.ICO</span>{' '}<ColumnWidthOutlined />{' '}
<span className={styles.spanText}>.TIFF</span>{' '}<ColumnWidthOutlined />{' '}
<span className={styles.spanText}>.WEBP</span>{' '}<ColumnWidthOutlined />{' '}
<span className={styles.spanText}>.EPS</span>{' '}<ColumnWidthOutlined />{' '}
<span className={styles.spanText}>.PSD</span>{' '}<ColumnWidthOutlined />{' '}
<span className={styles.spanText}>.ICNS</span>{' '}
  </p>
   
        <Dragger
          name="file"
          accept="image/*"
          customRequest={onCustomRequest} // Use the updated handler
          className={styles.dragger}
          maxCount={1}
          showUploadList={false} // Set to false to hide the uploaded file list
          onChange={onFileAdd}
        >
  <div className={styles.draggerContent}>
    <p className={styles.uploadIcon}><CloudUploadOutlined /></p>
    <p className={styles.uploadText}>Click or Drag a File Here</p>
    <div className={styles.canvasWrapper}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  </div>
</Dragger>

				
  <div className={styles.inputGroup}>
    <InputNumber
      size='large'
      value={width}
      onChange={onWidthChange}
      addonBefore='⬌ Width'
      addonAfter='px'
    />
    <InputNumber
      size='large'
      value={height}
      onChange={onHeightChange}
      addonBefore='⬍ Height'
      addonAfter='px'
    />
  </div>
  <div className={styles.radioGroup}>
    <label className={`ant-radio-button-wrapper ${styles.radioLabel}`}>
      <span role="img" aria-label="Convert To">
        <LoadingOutlined /> Convert to
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
  </Button>"



        <Divider plain>
❖ Key Features
</Divider>
<Feature />
<MoreFeature />
<Divider plain>
？ FAQ
</Divider>

<Faq />

<Divider plain>
⦿ Testimonials
</Divider>

<Testimonial />

</main>

<Footer />
</div>
		
);
};

export default Home;
