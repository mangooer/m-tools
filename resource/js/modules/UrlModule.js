export class UrlModule {
    constructor({ encodeInputId, decodeInputId }) {
        this.encodeInput = document.getElementById(encodeInputId);
        this.decodeInput = document.getElementById(decodeInputId);
        this.init();
    }

    init() {
        if (this.encodeInput) {
            this.encodeInput.addEventListener('input', this.encodeUrl.bind(this));
        }
        if (this.decodeInput) {
            this.decodeInput.addEventListener('input', this.decodeUrl.bind(this));
        }
    }

    encodeUrl() {
        const input = this.encodeInput.value;
        const encoded = encodeURIComponent(input);
        this.decodeInput.value = encoded;
    }

    decodeUrl() {
        const input = this.decodeInput.value;
        try {
            const decoded = decodeURIComponent(input);
            this.encodeInput.value = decoded;
        } catch (e) {
            this.encodeInput.value = 'Invalid URL Encoding';
        }
    }
} 