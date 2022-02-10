import { useState } from 'react';
import styles from './style.module.sass'
import {useDispatch} from 'react-redux'
// import dynamic from 'next/dynamic'
import Thumb from '../../components/icons/exampleIcon'

const icons = [
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon5',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon5',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon5',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon',
        path: 'exampleIcon'
    },
    {
        name: 'icon5',
        path: 'exampleIcon'
    },
]

interface IProps {
    fieldId: string,
    singleEdit: boolean
}

const ThumbSet = ({fieldId, singleEdit}: IProps) => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('');

    const iconsFiltered = icons.filter(item => {
        if(search){
            if(new RegExp(search, 'ig').test(item.name)){
                return true;
            }
            return false;
        }

        return true;
    })

    return (
        <div className={styles.thumbSet}>
            <h1>Linkforme Set</h1>
            <input value={search} onChange={ e => setSearch(e.target.value)} type="text" placeholder="Search icons" />
            <div className={styles.icons}>
                {iconsFiltered.map( (item, index) => {
                    // const Thumb:any = dynamic(() =>
                    //     import('../../components/icons/'+item.path)
                    // )
                    return (
                        <div className={styles.icon} key={index} onClick={() => {
                            dispatch({type: singleEdit ? 'updateFieldSingle' : 'updateField', payload: {fieldId, fieldName: 'thumb', value: item.path}})
                            dispatch({type: 'openPopup', payload: {method: ''}})
                        }}>
                            <Thumb fill="#000" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ThumbSet;