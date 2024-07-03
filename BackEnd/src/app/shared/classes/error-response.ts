import { textChangeRangeIsUnchanged } from "typescript";

export class ErrorResponse {
    type: string;
    code: number;
    message: string;
    error: any;

    constructor(code: number, type: string, message?: string, error?: any) {
        this.type = type;
        this.code = code;
        this.message = message ? message : '';
        this.error = error ? error : {};
    }
}