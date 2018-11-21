/**
 * Defines typings for classnames/bind
 * The .d.ts defined in @types/classnames doesn't work with the default CRA tsconfig,
 * most probably because allowSyntheticDefaultImports is enabled: we get a TS error
 * with bind returning string & { default: ClassNamesExport }. For now, copy the
 * declaration with this extra functionality removed (ClassNamesFn returns a plain string)
 */
declare module "classnames/bind" {
    type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean;

    interface ClassDictionary {
        [id: string]: any;
    }

    // This is the only way I found to break circular references between ClassArray and ClassValue
    // https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
    interface ClassArray extends Array<ClassValue> { } // tslint:disable-line no-empty-interface

    type ClassNamesFn = (...classes: ClassValue[]) => string;

    type ClassNamesExport = ClassNamesFn & { default: ClassNamesFn };

    const classNames: ClassNamesExport;

    export default classNames;

    export function bind(styles: Record<string, string>): ClassNamesFn;
}
