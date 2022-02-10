import styles from './style.module.sass'
import Image from 'next/image'
import UploadSvg from '../../static/upload.svg'
import { useDispatch } from 'react-redux'
import {useState} from 'react'
import {Field} from 'src/server/users/interfaces/user.interface'

interface IProps {
    field: Field,
    singleEdit: boolean
}

const Lock = ({field, singleEdit}: IProps) => {
    const dispatch = useDispatch()
    const [state, setState] = useState(field?.lock ?? {
        code: false,
        codeValue: '',
        birthDate: false,
        minimalAge: 12
    })

    return (
        <div className={styles.lock}>
            <h1>Gate this link</h1>
            <p>
                Let visitors unlock this link by entering a code, their date of birth, or acknowledging that the link may contain sensitive content.
            </p>
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <input type="checkbox" checked={state.code}  onChange={() => setState({...state, code: !state.code})} />
                    <div className={styles.headline}>Code</div>
                </div>
                {state.code && (
                    <>
                        <hr />
                        <div className={styles.row}>
                            <div>
                                <h3>Set access code</h3>
                                <p>
                                    Visitors need to know code to unlock the link
                                </p>
                            </div>
                            <input type="text" onChange={e => setState({...state, codeValue: e.target.value})} value={state.codeValue} placeholder="Code" />
                        </div>
                    </>
                )}
            </div>
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <input type="checkbox" checked={state.birthDate}  onChange={() => setState({...state, birthDate: !state.birthDate})} />
                    <div className={styles.headline}>Birth Date</div>
                </div>
                {state.birthDate && (
                    <>
                        <hr />
                        <div className={styles.row}>
                            <div>
                                <h3>Set minimum age</h3>
                                <p>
                                    Visitors need to be over a certain age to unlock the link with their date of birth
                                </p>
                            </div>
                            <input type="number" onChange={e => {
                                let value = Number(e.target.value);
                                if(value <= 0) return;
                                setState({...state, minimalAge: value})
                            }} value={state.minimalAge} placeholder="Minimal age" />
                        </div>
                    </>
                )}
            </div>

            <button onClick={()=>{
                dispatch({type: singleEdit ? 'updateFieldSingle' : 'updateField', payload: {fieldId: field.id, fieldName: 'lock', value: state}})
                dispatch({type: 'openPopup', payload: {method: ''}})
            }}>Save</button>
        </div>
    )
}

export default Lock;