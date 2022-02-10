import { useDispatch } from 'react-redux'
import { getCookie } from 'src/shared/utils/fetch'
import Popup from 'src/client/components/popup'
import { useEffect } from 'react';

const PopupWrapper = ({children}: any) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const cookie = getCookie("cookies_confirmed");
    
        if(!cookie){
          dispatch({
            type: 'openPopup',
            payload: {
              method: 'confirm_cookies',
              props: {
                style: {position: 'fixed', right: 20, bottom: 20, width: 350},
                noOverflow: true
              }
            }
          });
        }
      }, [])

    return (
        <>
            {children}
            <Popup />
        </>
    )
}

export default PopupWrapper;