import { ReactNode } from 'react';
import styles from './styles.module.sass';
import Background from 'src/client/components/elements/background';
import { motion } from 'framer-motion';

interface IProps {
  children: ReactNode;
}

export default function PhoneLayout({ children }: IProps) {
  return (
    <motion.div layoutId="phoneLayout" className={styles.phone}>
      <Background>{children}</Background>
    </motion.div>
  );
}
