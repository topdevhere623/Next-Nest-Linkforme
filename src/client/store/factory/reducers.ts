import {AnyAction} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import IFactoryState from "./index";

const initialState: IFactoryState = {
    fields: [],
    editFields: [],
    editing: false,
    link: '',
    editingEl: '',
    user: {
        login: '',
    },
    popup: {
        method: ''
    },
    analytics: {
        clicks: 0,
        views: 0,
        chart: []
    },
    theme: {
        selected: 'default',
        custom: {
            background: '',
            backgroundColor: '',
            fill: 0,
            outline: 0,
            shadow: 0,
            special: 0,
            buttonColor: '',
            buttonFontColor: '',
            fontFamily: '',
        }
    },
    snackbar: {
        isVisible: false,
        type: 'success',
        message: ''
    },
    menuIsOpen: true,
    menuSetupOnce: false
};

interface DinamicObj {
  [name: string]: any;
}

export function factory(state: IFactoryState = initialState, action: AnyAction): IFactoryState {
    switch (action.type) {
        case HYDRATE:
            return {...state, ...action.payload.factory, menuIsOpen: state.menuIsOpen, menuSetupOnce: state.menuSetupOnce};
        case 'setMenu':
            return {...state, menuIsOpen: action.payload, menuSetupOnce: true}
        case 'setTheme':
            return {...state, theme: action.payload}
        case 'setAnalytics':
            return {...state, analytics: action.payload}
        case 'openPopup':
            return {...state, popup: {...state.popup, ...action.payload}};
        case 'setUser':
            return {...state, user: {...state.user, ...action.payload}};
        case 'setSnackbar':
            return {...state, snackbar: {...state.snackbar, ...action.payload}};
        case 'setFields':
            return {...state, fields: action.payload};
        case 'setEditFields':
            return {...state, editFields: action.payload};
        case 'setEdit':
            return {...state, editing: true, editFields: state.fields};
        case 'setEditDone':
            return {...state, editing: false, fields: state.editFields};
        case 'setEditElement':
            return {...state, editingEl: action.payload};
        case 'setLink':
            return {...state, link: action.payload}
        case 'updateField':
            let newEditFields = state.editFields.map(item => {
                if(item.id === action.payload.fieldId) {
                    let newItem = {...item};
                    let fieldName: 'title' | 'link' | 'thumb' = action.payload.fieldName;
                    newItem[fieldName] = action.payload.value;

                    return JSON.parse(JSON.stringify(newItem));
                }
                return item;
            })

            return {...state, editFields: newEditFields}
        case 'updateFieldSingle':
            let newEditFields3 = state.fields.map(item => {
                if(item.id === action.payload.fieldId) {
                    let newItem: DinamicObj = {...item};
                    let fieldName: string = action.payload.fieldName;
                    newItem[fieldName] = action.payload.value;

                    return JSON.parse(JSON.stringify(newItem));
                }
                return item;
            })

            return {...state, fields: newEditFields3}
        case 'deleteField':
            let newEditFields2 = state.editFields.filter(item => {
                if(item.id === action.payload) {
                    return false;
                }
                return true;
            })

            return {...state, editFields: JSON.parse(JSON.stringify(newEditFields2))}
        default:
            return state;
    }
}