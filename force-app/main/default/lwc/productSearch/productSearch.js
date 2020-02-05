import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
 
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Category__c';

import { fireEvent } from 'c/pubsub';

/** The delay used when debouncing event handlers before firing the event. */
const DELAY = 350;

export default class ProductSearch extends LightningElement {
    searchKey = '';

    filters = {
        searchKey: ''
    };

    @wire(CurrentPageReference) pageRef;
    
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: CATEGORY_FIELD
    })
    categories;

    handleSearchKeyChange(event) {
        this.filters.searchKey = event.target.value;
        this.delayedFireFilterChangeEvent();
    }

    handleCheckboxChange(event) {

        if (!this.filters.categories) {
            // Lazy initialize filters with all values initially set
            this.filters.categories = this.categories.data.values.map(
                item => item.value
            );
        }

        const value = event.target.dataset.value;
        const filterArray = this.filters[event.target.dataset.filter];
        if (event.target.checked) {
            if (!filterArray.includes(value)) {
                filterArray.push(value);
            }
        } else {
            this.filters[event.target.dataset.filter] = filterArray.filter(
                item => item !== value
            );
        }
        fireEvent(this.pageRef, 'filterChange', this.filters);
    }

    delayedFireFilterChangeEvent() {
        // Debouncing this method: Do not actually fire the event as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex
        // method calls in components listening to this event.
        window.clearTimeout(this.delayTimeout);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            fireEvent(this.pageRef, 'filterChange', this.filters);
        }, DELAY);
    }
}