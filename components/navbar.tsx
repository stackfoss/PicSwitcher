import React from 'react';
import { Anchor } from 'antd';
import Faq from '../components/faq';
import styles from '../styles/app.module.css'; // Add your CSS file if not already included

const Navbar: React.FC = () => (
  <div className={styles.navbar}>
    <div className={styles.navbarContent}>
      <Anchor direction="horizontal" className={styles.anchor}>
        <Anchor.Link href="#part-1" title="HowTo" />
        <Anchor.Link href="#part-2" title="Features" />
        <Anchor.Link href="#part-3" title="FAQs" />
        <Anchor.Link href="#part-4" title="Testimonials" />
      </Anchor>
    </div>
  </div>
);

export default Navbar;

