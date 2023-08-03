import React from 'react';
import Image from 'next/image';
import styles from '../styles/app.module.css';

const Testimonial: React.FC = () => {
  return (
    <div>
      <div className={styles.testimonial}>
        <Image
          src="https://images.unsplash.com/photo-1567515004624-219c11d31f2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          alt="Testimonial"
          width={870}
          height={500}
          className={styles.testimonialImage}
        />
        <div className={styles.testimonialContent}>
          <div className={styles.testimonialName}>John Doe</div>
          <div className={styles.testimonialText}>"This tool is amazing! It helped me convert my SVG files to images effortlessly."</div>
        </div>
      </div>

      <div className={styles.testimonial}>
        <Image
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=461&q=80"
          alt="Testimonial"
          width={461}
          height={500}
          className={styles.testimonialImage}
        />
        <div className={styles.testimonialContent}>
          <div className={styles.testimonialName}>Sarah Wilson</div>
          <div className={styles.testimonialText}>"SVG2Image made converting SVG files a breeze! It saved me so much time, and the image quality is top-notch."</div>
        </div>
      </div>

      <div className={styles.testimonial}>
        <Image
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
          alt="Testimonial"
          width={464}
          height={500}
          className={styles.testimonialImage}
        />
        <div className={styles.testimonialContent}>
          <div className={styles.testimonialName}>Emily Davis</div>
          <div className={styles.testimonialText}>"I can't believe how simple and fast SVG2Image is. It's now my go-to tool for SVG conversions."</div>
        </div>
      </div>

      <div className={styles.testimonial}>
        <Image
          src="https://images.unsplash.com/photo-1565363410878-d7dd2e0d4e6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
          alt="Testimonial"
          width={464}
          height={500}
          className={styles.testimonialImage}
        />
        <div className={styles.testimonialContent}>
          <div className={styles.testimonialName}>Alex Turner</div>
          <div className={styles.testimonialText}>"I love how SVG2Image handles all the technicalities for me. It's the best SVG converter out there."</div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

