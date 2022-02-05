
import { ValidatorFn } from '@angular/forms';

export class GenericHelper {
    static isControl(c: GenericFormType): boolean {
        return (c as GenericFormControl).inputType !== undefined;
    }

    static isGroup(c: GenericFormType): boolean {
        return (c as GenericFormGroup).controls !== undefined;
    }
}

export type GenericFormType = GenericFormControl | GenericFormGroup;

export interface GenericFormBase {
    type: 'control' | 'group';
    name: string;//control, group 
}

export interface Dropdown {
    value: any;
    name: string;
}
export interface GenericFormControl extends GenericFormBase {
    inputType: 'text' | 'number' | 'dropdown'
    label: string;
    value?: any;
    placeHolder?: string;
    validators?: SchemaFormValidator;
    hasEndpoint?: boolean;
    endpoint?: string;
    options?: Array<Dropdown>;
    multiselect?: boolean // for dropdown
}

export interface GenericFormGroup extends GenericFormBase {
    groupTitle?: string;
    controls?: Array<GenericFormControl>;
}


export interface SchemaFormValidator {
    required?: boolean,
    pattern?: string,
    maxlength?: number,
    minlength?: number
}
