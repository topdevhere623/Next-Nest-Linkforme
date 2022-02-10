import {useState} from "react";
import { fetch } from 'src/shared/utils/fetch';
import { useRouter } from 'next/router';
import styles from '../client/styles/login.module.sass'
import Link from 'next/link'
import { motion } from "framer-motion";

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const setEmailHundler = (text:string) => {
    setEmailError(false)
    setError("")
    setEmail(text)
  }
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const setPasswordHundler = (text:string) => {
    setPasswordError(false)
    setError("")
    setPassword(text)
  }
  const [passwordError, setPasswordError] = useState(false)
  const [error, setError] = useState('')

  const submitHundler = async (e:any) => {
    e.preventDefault();

    if(!password){
      setPasswordError(true);
    }

    if(!email){
      setEmailError(true);
    }

    if(!password || !email) {
      return;
    }

    const result = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({password: password, email: email}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(result && result.success) {
      router.push('/account')
    }else{
      console.log('result', result)
      setError("User is not found or password incorrect")
    }
  }

  return (
    <form onSubmit={submitHundler} className={styles.wrapper}>
        <motion.h1 layoutId="loginHeadline">Linkforme</motion.h1>
        <motion.div layoutId="formInsideContainer" className={styles.formInsideContainer}>
          <motion.ul layoutId="loginMenu" className={styles.menu}>
            <li className={styles.active}>Log In</li>
            <Link href="/logup"><li>Sign Up</li></Link>
          </motion.ul>
          {error ? (
            <div className={styles.errorBlock}>{error}</div>
          ) : null}
          <input type="text" className={emailError ? styles.inputError : ""} onChange={e => setEmailHundler(e.target.value)} value={email} placeholder="Email" />
          <input type="password" className={passwordError ? styles.inputError : ""} onChange={e => setPasswordHundler(e.target.value)} value={password} placeholder="Password" />
          <input type="submit" value="Log In" />
          <Link href="/restore">
            <div className={styles.restore}>Forgot Password?</div>
          </Link>
        </motion.div>
        <style global jsx>{`
          #__next {
            overflow: auto;
          }
        `}</style>
    </form>
  )
}

export default LoginPage;