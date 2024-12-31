export class TextLengthModule {
    constructor({ inputId }) {
        this.input = document.getElementById(inputId);
        this.init();
    }

    init() {
        if (this.input) {
            this.input.addEventListener('input', this.updateTextLength.bind(this));
        }
    }

    updateTextLength() {
        const inputText = this.input.value;
        const length = inputText.length;
        document.getElementById('textLengthOutput').innerText = length;
    }
} 