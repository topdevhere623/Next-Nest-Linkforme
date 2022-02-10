import styles from './style.module.sass'
import Image from 'next/image'
import UploadSvg from '../../static/upload.svg'
import { useDispatch } from 'react-redux'
import {useState, SetStateAction} from 'react'
import {Lock} from 'src/server/users/interfaces/user.interface'

interface IProps {
    data: Lock,
    unlock: ()=>{}
}

const validateNumber = (text:string, next:SetStateAction<any>) => {
    if(!/\D/g.test(text)) next(text)
}

const BirthDateUnlock = ({next, answer}: {next:()=>void, answer: number}) => {
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState(false)
    const  getAge = (date:string) => {
        var today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const nextWrapper = () => {
        const age = getAge(`${month}.${day}.${year}`);

        if(age >= answer){
            next()
        }else{
            setError(true)
        }
    }
    return (
        <>
            <h1>Unlock link with your Date of Birth</h1>
            {/* <p>{data.explanation}</p> */}
            <div className={styles.row}>
                <input type="text" className={styles.month} value={month} placeholder="MM" onChange={e => validateNumber(e.target.value, setMonth)} />
                <input type="text" className={styles.day} value={day} placeholder="DD" onChange={e => validateNumber(e.target.value, setDay)} />
                <input type="text" className={styles.year} value={year} placeholder="YYYY" onChange={e => validateNumber(e.target.value, setYear)} />
            </div>
            {error && (
                <p className={styles.error}>
                    You can't access this content because you haven't met the minimum age requirement.
                </p>
            )}
            <button className={styles.continueButton} onClick={e => nextWrapper()}>Continue</button>
        </>
    )
}

const CodeUnlock = ({next, answer}: {next:()=>void, answer:string}) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false)
    const nextWrapper = () => {

        if(code === answer){
            next()
        }else{
            setError(true)
        }
    }
    return (
        <>
            <h1>Unlock link with code</h1>
            {/* <p>{data.explanation}</p> */}
            <div className={styles.row}>
                <input type="text" value={code} placeholder="Code" onChange={e => setCode(e.target.value)} />
            </div>
            {error && (
                <p className={styles.error}>
                    You can't access this content because you haven't right code requirement.
                </p>
            )}
            <button className={styles.continueButton} onClick={e => nextWrapper()}>Continue</button>
        </>
    )
}

const Unlock = ({data, unlock}: IProps) => {
    const dispatch = useDispatch();
    let steps = [];
    const [step, setStep] = useState(1);

    if(data?.birthDate) steps.push({birthDate: true});
    if(data?.code) steps.push({code: true})

    const next = () => {
        let nextStep = step + 1;
        if(nextStep < ( steps.length + 1 )){
            setStep(nextStep)
        }else{
            unlock();
            dispatch({type: 'openPopup', payload: {method: ''}})
        }
    }

    return (
        <div className={styles.unlock}>
            {steps[step -1]?.birthDate && (
                <BirthDateUnlock answer={data.minimalAge} next={next} />
            )}
            {steps[step -1]?.code && (
                <CodeUnlock answer={data.codeValue} next={next} />
            )}
            <span className={styles.pagination}>{step}/{steps.length}</span>
        </div>
    )
}

export default Unlock;