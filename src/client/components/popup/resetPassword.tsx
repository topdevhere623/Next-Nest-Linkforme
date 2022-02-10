import styles from './style.module.sass';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateUser } from 'src/client/store/factory/actions';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [done, setDone] = useState(false)
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const setOldPasswordHundler = (text:string) => {
    setOldPassword(text)
    setOldPasswordError(false)
  }
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false)
  const setPasswordHundler = (text:string) => {
    setPassword(text)
    setPasswordError(false)
  }
  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const setRepeatPasswordHundler = (text:string) => {
    setRepeatPassword(text)
    setRepeatPasswordError(false)
  }
  const [error, setError] = useState('');
  const submitHundler = async (e: any) => {
    e.preventDefault();
    if(password !== repeatPassword){
      setRepeatPasswordError(true)
      setError('Password mismatch');
    }
    if(!oldPassword){
      setOldPasswordError(true)
    }
    if(password?.length < 8){
      setRepeatPasswordError(true)
      setError('Minimum password length 8 characters');
    }

    if (!oldPassword || password !== repeatPassword || password?.length < 8) {
      return;
    }

    const result: any = await dispatch(
      updateUser({
        password: password,
        oldPassword: oldPassword,
      }),
    );

    if (result?._id) {
      setDone(true);
      setTimeout(()=>{
        dispatch({
          type: 'openPopup',
          payload: {
            method: '',
          },
        });
      }, 1000)
    }
  };

  return (
    <form onSubmit={submitHundler} className={styles.resetPassword}>
      {done ? (
        <>
          <h1 style={{paddingRight: 20}}>
            Password changed successfully
          </h1>
        </>
      ) : (
        <>
            <h1>Reset Password</h1>
            {error ? <div className={styles.errorBlock}>{error}</div> : null}
            <input
              className={oldPasswordError ? styles.inputError : ""}
              type="password"
              onChange={(e) => setOldPasswordHundler(e.target.value)}
              value={oldPassword}
              placeholder="Old password"
            />
            <input
              className={passwordError ? styles.inputError : ""}
              type="password"
              onChange={(e) => setPasswordHundler(e.target.value)}
              value={password}
              placeholder="Password"
            />
            <input
              className={repeatPasswordError ? styles.inputError : ""}
              type="password"
              onChange={(e) => setRepeatPasswordHundler(e.target.value)}
              value={repeatPassword}
              placeholder="Password again"
            />
            <input type="submit" value="Reset Password" />
        </>
      )}
    </form>
  );
};

export default ResetPassword;
