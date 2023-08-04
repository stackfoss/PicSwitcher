import React from 'react';
import { Anchor } from 'antd';
import Faq from '../components/faq';
import styles from '../styles/app.module.css';

const Navbar: React.FC = () => (
  <div className={styles.navbar}>
    <div className={styles.navbarContent}>
      <Anchor direction="horizontal" className={styles.anchor}>
        <Anchor.Link href="#how-to" title="HowTo" />
        <Anchor.Link href="#features" title="Features" />
        <Anchor.Link href="#faq" title="FAQs" />
        <Anchor.Link href="#testimonials" title="Testimonials" />
        <Anchor.Link href="#download" title="Download" />
      </Anchor>
    </div>
  </div>
);

export default Navbar;

