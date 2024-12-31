export class ClipboardModule {
    constructor({ timestampSecondsBtn, timestampMillisecondsBtn, formattedTimeBtn }) {
        this.timestampSecondsBtn = document.getElementById(timestampSecondsBtn);
        this.timestampMillisecondsBtn = document.getElementById(timestampMillisecondsBtn);
        this.formattedTimeBtn = document.getElementById(formattedTimeBtn);
        this.init();
    }

    init() {
        if (this.timestampSecondsBtn) {
            this.timestampSecondsBtn.addEventListener('click', () => this.copyToClipboard(document.getElementById('timestampSeconds').innerText));
        }
        if (this.timestampMillisecondsBtn) {
            this.timestampMillisecondsBtn.addEventListener('click', () => this.copyToClipboard(document.getElementById('timestampMilliseconds').innerText));
        }
        if (this.formattedTimeBtn) {
            this.formattedTimeBtn.addEventListener('click', () => this.copyToClipboard(document.getElementById('formattedTime').innerText));
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => this.showNotification('复制成功！'))
            .catch(err => console.error('复制失败: ', err));
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