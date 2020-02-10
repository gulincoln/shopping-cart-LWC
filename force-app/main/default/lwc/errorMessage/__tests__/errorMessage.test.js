import { createElement } from 'lwc';
import ErrorMessage from 'c/errorMessage';

describe('c-error-panel', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays a default friendly message', () => {
        const MESSAGE = 'Error retrieving data';

        // Create initial element
        const element = createElement('c-error-message', {
            is: ErrorMessage
        });
        document.body.appendChild(element);

        const messageEl = element.shadowRoot.querySelector('p');
        expect(messageEl.textContent).toBe(MESSAGE);
    });

    it('displays a custom friendly message', () => {
        const MESSAGE = 'Internal Error';

        // Create initial element
        const element = createElement('c-error-message', {
            is: ErrorMessage
        });
        element.friendlyMessage = MESSAGE;
        document.body.appendChild(element);

        const messageEl = element.shadowRoot.querySelector('p');
        expect(messageEl.textContent).toBe(MESSAGE);
    });

});