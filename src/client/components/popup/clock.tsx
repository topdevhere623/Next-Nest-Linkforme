import styles from './style.module.sass'
import Image from 'next/image'
import UploadSvg from '../../static/upload.svg'
import { useDispatch } from 'react-redux'
import {useState} from 'react'
import {Field} from 'src/server/users/interfaces/user.interface'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

interface IProps {
    field: Field,
    singleEdit: boolean
}

const Clock = ({field, singleEdit}: IProps) => {
    const dispatch = useDispatch()
    const [state, setState] = useState(field?.clock ?? {
        startActive: false,
        start: new Date(),
        endActive: false,
        end: new Date()
    })

    return (
        <div className={styles.clock}>
            <h1>Show schedule</h1>
            <p>
                With this settings you can schedule when your links go live
            </p>
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <input type="checkbox" checked={state.startActive}  onChange={() => setState({...state, startActive: !state.startActive})} />
                    <div className={styles.headline}>Start show</div>
                </div>
                {state.startActive && (
                    <DateTimePicker
                        onChange={(value:Date) => setState({...state, start: value})}
                        value={new Date(state.start)}
                        minDate={new Date()}
                    />
                )}
            </div>
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <input type="checkbox" checked={state.endActive}  onChange={() => setState({...state, endActive: !state.endActive})} />
                    <div className={styles.headline}>End show</div>
                </div>
                {state.endActive && (
                    <DateTimePicker
                        onChange={(value:Date) => setState({...state, end: value})}
                        value={new Date(state.end)}
                        minDate={new Date()}
                    />
                )}
            </div>

            <button className={styles.save} onClick={()=>{
                dispatch({type: singleEdit ? 'updateFieldSingle' : 'updateField', payload: {fieldId: field.id, fieldName: 'clock', value: state}})
                dispatch({type: 'openPopup', payload: {method: ''}})
            }}>Save</button>
        </div>
    )
}

export default Clock;