import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import styles from '../styles/app.module.css';

const Footer = () => {
  const totalFilesConverted = 1609060344;
  const totalSizeConverted = 12458;

  const [endValueFiles, setEndValueFiles] = useState(0);
  const [endValueSize, setEndValueSize] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEndValueFiles((prevValue) => prevValue + 1);
      setEndValueSize((prevValue) => prevValue + 0.01);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
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

      <p className={styles.footerCount}>
        We've already converted{' '}
        <CountUp start={0} end={endValueFiles} duration={2.5} separator="," />
        {' files with a total size of '}
        <CountUp start={0} end={endValueSize} duration={2.5} decimals={2} />
        {' GB.'}
      </p>

      <p className={styles.footerCopyright}>
        © {new Date().getFullYear()} <a href='https://www.stackfoss.com'>StackFoss</a>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

