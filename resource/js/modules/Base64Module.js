export class Base64Module {
    constructor({ encodeInputId, decodeInputId }) {
        this.encodeInput = document.getElementById(encodeInputId);
        this.decodeInput = document.getElementById(decodeInputId);
        this.init();
    }

    init() {
        if (this.encodeInput) {
            this.encodeInput.addEventListener('input', this.handleInput.bind(this));
            this.encodeInput.addEventListener('compositionend', this.handleInput.bind(this));
        }
        if (this.decodeInput) {
            this.decodeInput.addEventListener('input', this.handleOutput.bind(this));
            this.decodeInput.addEventListener('compositionend', this.handleOutput.bind(this));
        }
    }

    handleInput(event) {
        if (event.type === 'input' || event.type === 'compositionend') {
            this.encode();
        }
    }

    handleOutput(event) {
        if (event.type === 'input' || event.type === 'compositionend') {
            this.decode();
        }
    }

    encode() {
        const input = this.encodeInput.value;
        const encoder = new TextEncoder();
        const encoded = btoa(String.fromCharCode(...encoder.encode(input)));
        this.decodeInput.value = encoded;
    }

    decode() {
        const input = this.decodeInput.value;
        try {
            const decoded = atob(input);
            const decoder = new TextDecoder();
            this.encodeInput.value = decoder.decode(new Uint8Array([...decoded].map(char => char.charCodeAt(0))));
        } catch (e) {
            this.encodeInput.value = 'Invalid Base64';
        }
    }
} 