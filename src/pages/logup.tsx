import { useRouter } from "next/router";
import {useState} from "react";
import { fetch, validateEmail } from 'src/shared/utils/fetch';
import styles from '../client/styles/login.module.sass'
import Link from 'next/link'
import { motion } from "framer-motion";

const LogupPage = () => {
  const router = useRouter()
  const errors = {
    longUsername: "Username limited to 30 characters!",
    shortPass: "Minimum password length 8 characters"
  }
  const [login, setLogin] = useState('')
  const setLoginHundler = (text:string) => {
    setLoginError(false)
    setLogin(text)
    if(error === errors.longUsername && text?.length <= 30){
      setError("")
    }
  }
  const [loginError, setLoginError] = useState(false)
  const [email, setEmail] = useState('')
  const setEmailHundler = (text:string) => {
    setEmailError(false)
    setEmail(text)
  }
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const setPasswordHundler = (text:string) => {
    setPasswordError(false)
    setPassword(text)
    if(error === errors.shortPass && text?.length >= 8){
      setError("")
    }
  }
  const [passwordError, setPasswordError] = useState(false)
  const [repeatPassword, setRepeatPassword] = useState('')
  const setRepeatPasswordHundler = (text:string) => {
    setRepeatPasswordError(false)
    setRepeatPassword(text)
  }
  const [repeatPasswordError, setRepeatPasswordError] = useState(false)
  const [error, setError] = useState('')
  const validateFeild = (text:string) => {
    if(!text) return false;
    const textWithoutSpace = text.replaceAll(" ", "")
    if(!textWithoutSpace) return false;
    return true;
  }
  const submitHundler = async (e:any) => {
    e.preventDefault();

    if(!validateFeild(login)){
      setLoginError(true)
    }
    if(login?.length > 30){
      setLoginError(true)
      setError(errors.longUsername)
    }
    if(!validateFeild(password)){
      setPasswordError(true)
    }
    if(password?.length < 8){
      setPasswordError(true)
      setError(errors.shortPass)
    }
    if(password !== repeatPassword){
      setRepeatPasswordError(true)
    }
    if(!validateEmail(email)){
      setEmailError(true)
    }

    if(!validateFeild(login) || login?.length > 30 || !validateFeild(password) || (password !== repeatPassword) || !validateEmail(email)){
        return;
    }
    const result = await fetch('/api/logup', {
        method: 'POST',
        body: JSON.stringify({login, password, email}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(result && result.success) {
      router.push("/account")
    }

    if(result && !result.success && result.message){
        setError(result.message)
    }
  }

  return (
    <form onSubmit={submitHundler} className={styles.wrapper}>
      <motion.h1 layoutId="loginHeadline">Linkforme</motion.h1>
      <motion.div layoutId="formInsideContainer" className={styles.formInsideContainer}>
        <motion.ul layoutId="loginMenu" className={styles.menu}>
          <Link href="/login"><li>Log In</li></Link>
          <li className={styles.active}>Sign Up</li>
        </motion.ul>
        {error ? (
            <div className={styles.errorBlock}>{error}</div>
        ) : null}
        <input type="text" className={loginError ? styles.inputError : ""} onChange={e => setLoginHundler(e.target.value)} value={login} placeholder="Username" />
        <input type="text" className={emailError ? styles.inputError : ""} onChange={e => setEmailHundler(e.target.value)} value={email} placeholder="Email" />
        <input type="password" className={passwordError ? styles.inputError : ""} onChange={e => setPasswordHundler(e.target.value)} value={password} placeholder="Password" />
        <input type="password" className={repeatPasswordError ? styles.inputError : ""} onChange={e => setRepeatPasswordHundler(e.target.value)} value={repeatPassword} placeholder="Password again" />
        <input type="submit" value="Registration" />
      </motion.div>
      <style global jsx>{`
          #__next {
            overflow: auto;
          }
        `}</style>
    </form>
  )
}

export default LogupPage;