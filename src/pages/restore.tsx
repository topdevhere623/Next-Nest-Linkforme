import { useState } from 'react';
import { fetch, validateEmail } from 'src/shared/utils/fetch';
// import { useRouter } from 'next/router';
import styles from '../client/styles/login.module.sass';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Timer from 'src/client/components/timer';

const RestorePage = () => {
  const [done, setDone] = useState(false);
  const [mail, setMail] = useState('');
  const [mailError, setMailError] = useState(false);
  const setMailHundler = (text: string) => {
    setMailError(false);
    setMail(text);
  };
  const [timer, setTimer] = useState(false);

  const submitHundler = async (e: any) => {
    e.preventDefault();
    if (!validateEmail(mail)) {
      setMailError(true);
      return;
    }
    setDone(true);
    const result = await fetch('/api/restore', {
      method: 'POST',
      body: JSON.stringify({ email: mail }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!(result && result.success)) {
      alert('Unsuccess');
      setDone(false);
    }

    setTimer(true);
  };

  const goBack = (e: any) => {
    e.preventDefault();
    setDone(false);
  };

  return (
    <form onSubmit={submitHundler} className={styles.wrapper}>
      <motion.h1 layoutId="loginHeadline">Linkforme</motion.h1>
      <motion.div
        layoutId="formInsideContainer"
        className={styles.formInsideContainer}
      >
        {done ? (
          <>
            <h2>Thanks!</h2>
            <p>
              A letter with a link to restore access has been sent to the "
              {mail}" mailbox!
            </p>
            <div className={styles.restore} onClick={(e) => goBack(e)}>
              Change email
            </div>
            {timer ? (
              <div className={styles.restoreTimeout}>
                Send link again in{' '}
                <Timer
                  seconds={9}
                  callback={() => {
                    setTimer(false);
                  }}
                />{' '}
                seconds
              </div>
            ) : (
              <div className={styles.restore} onClick={(e) => submitHundler(e)}>
                Send link again
              </div>
            )}
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: 30 }}>Forgot Password</h2>
            <input
              type="text"
              className={mailError ? styles.inputError : ''}
              onChange={(e) => setMailHundler(e.target.value)}
              value={mail}
              placeholder="Email"
            />
            <input type="submit" value="Restore" />
            <ul className={styles.menu} style={{ marginBottom: 0 }}>
              <Link href="/login">
                <li>Log In</li>
              </Link>
              <Link href="/logup">
                <li>Sign Up</li>
              </Link>
            </ul>
          </>
        )}
      </motion.div>
      <style global jsx>{`
        #__next {
          overflow: auto;
        }
      `}</style>
    </form>
  );
};

export default RestorePage;
