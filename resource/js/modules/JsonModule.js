export class JsonModule {
    constructor({ inputId }) {
        this.input = document.getElementById(inputId);
        this.init();
    }

    init() {
        if (this.input) {
            this.input.addEventListener('input', this.formatJson.bind(this));
        }
    }

    formatJson() {
        const input = this.input.value;
        try {
            let json = JSON.parse(input);
            let formattedJson = JSON.stringify(json, null, 2);
            document.getElementById('jsonOutput').value = formattedJson;
        } catch (e) {
            document.getElementById('jsonOutput').value = 'Invalid JSON';
        }
    }
} 