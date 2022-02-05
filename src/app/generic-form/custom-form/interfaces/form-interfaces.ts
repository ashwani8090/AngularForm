
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

export interface GenericFormControl extends GenericFormBase {
    inputType: 'text' | 'number' | 'dropdown'
    label: string;
    value?: any;
    placeHolder?: string;
    validators?: Array<ValidatorFn>;
}

export interface GenericFormGroup extends GenericFormBase {
    groupTitle?: string;
    controls?: Array<GenericFormControl>;
}
