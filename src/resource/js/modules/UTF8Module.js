export class UTF8Module {
    constructor({ encodeInputId, decodeInputId }) {
        this.encodeInput = document.getElementById(encodeInputId);
        this.decodeInput = document.getElementById(decodeInputId);
        this.init();
    }

    init() {
        if (this.encodeInput) {
            this.encodeInput.addEventListener('input', this.handleEncode.bind(this));
        }
        if (this.decodeInput) {
            this.decodeInput.addEventListener('input', this.handleDecode.bind(this));
        }
    }

    handleEncode() {
        const input = this.encodeInput.value;
        this.decodeInput.value = this.encode(input);
    }

    handleDecode() {
        const input = this.decodeInput.value;
        this.encodeInput.value = this.decode(input);
    }

    encode(input) {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(input);
        return Array.from(encoded)
            .map(byte => '\\x' + byte.toString(16).padStart(2, '0'))
            .join('');
    }

    decode(input) {
        try {
            const hexArray = input.match(/\\x[0-9a-fA-F]{2}/g);
            if (!hexArray) {throw new Error('Invalid UTF8');}
            const bytes = hexArray.map(hex => parseInt(hex.replace('\\x', ''), 16));
            const decoder = new TextDecoder();
            return decoder.decode(new Uint8Array(bytes));
        } catch (e) {
            this.showNotification('Invalid UTF8');
            return 'Invalid UTF8';
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.innerText = message;
        notification.style.position = 'fixed';
        notification.style.top = '20%';
        notification.style.left = '50%';
        notification.style.transform = 'translate(-50%, -50%)';
        notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        notification.style.color = 'white';
        notification.style.padding = '10px';
        notification.style.borderRadius = '5px';
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }
} 