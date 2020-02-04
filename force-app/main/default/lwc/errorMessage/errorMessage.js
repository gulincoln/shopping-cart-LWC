import { LightningElement, api } from 'lwc';

export default class ErrorMessage extends LightningElement {
    @api message;

    get errorMessage() {
        return JSON.stringify(this.message);
    }
}