import {Field, Theme} from 'src/server/users/interfaces/user.interface'
import { Type } from '../../components/popup/snackbar';

interface Chart {
    name: string,
    value: number
}
export default interface ITickState {
    fields: Field[],
    editFields: Field[],
    editing: boolean,
    link: string,
    editingEl: string,
    user: {
        login: string;
        avatar?: string;
        email?: string;
        pro?: boolean;
    }
    popup: {
        method: string,
        props?: any
    }
    analytics: {
        clicks: number,
        views: number,
        chart: Chart[]
    }
    snackbar: {
        isVisible: boolean;
        type: Type,
        message: string
    }
    theme: Theme,
    menuIsOpen: boolean,
    menuSetupOnce: boolean
}