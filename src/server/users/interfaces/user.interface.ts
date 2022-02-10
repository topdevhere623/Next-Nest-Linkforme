import { Document } from 'mongoose';

export interface Lock {
    code: boolean;
    codeValue: string;
    birthDate: boolean;
    minimalAge: number;
}

export interface Clock {
    startActive: boolean;
    start: Date;
    endActive: boolean;
    end: Date;
}

export interface Field extends Document {
    type: 'link' | 'header' | 'music' | 'payment';
    title?: string;
    link?: string;
    id: string;
    _id?: string;
    thumb?: string;
    thumbPic?: string;
    hide?: boolean;
    lock?: Lock;
    clock?: Clock;
}

export interface Theme {
    selected: string,
    custom?: {
        background?: string,
        backgroundColor?: string,
        fill?: number,
        outline?: number,
        shadow?: number,
        special?: number,
        buttonColor?: string,
        buttonFontColor?: string,
        fontFamily?: string,
        socialIconsColor?: string
    }
}

export interface User extends Document {
    email: string;
    login: string;
    restore?: string;
    avatar: string;
    password?: string;
    newPassword?: string;
    fields: Field[];
    theme: Theme
}
