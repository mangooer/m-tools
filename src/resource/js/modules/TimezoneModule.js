export class TimezoneModule {
    constructor({ selectId, formatSelectId }) {
        this.select = document.getElementById(selectId);
        this.formatSelect = document.getElementById(formatSelectId);
        this.init();
    }

    init() {
        if (this.select && this.formatSelect) {
            this.select.addEventListener('change', this.updateTime.bind(this));
            this.formatSelect.addEventListener('change', this.updateTime.bind(this));
            this.updateTime(); // 初始化时更新时间
            setInterval(this.updateTime.bind(this), 1000); // 每秒更新时间
        } else {
            console.error('TimezoneModule: select or formatSelect element not found.');
        }
    }

    updateTime() {
        if (!this.select || !this.formatSelect) {
            console.error('TimezoneModule: select or formatSelect element not found during update.');
            return;
        }

        const now = new Date();
        const timezone = this.select.value;
        const format = this.formatSelect.value;
        const timestampSeconds = Math.floor(now.getTime() / 1000);
        const timestampMilliseconds = now.getTime();
        let formattedTime;

        switch (format) {
            case 'YYYY-MM-DD HH:mm:ss':
                formattedTime = now.toLocaleString('zh-CN', { timeZone: timezone, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/\//g, '-');
                break;
            case 'YYYY/MM/DD hh:mm:ss A':
                formattedTime = now.toLocaleString('en-US', { timeZone: timezone, hour12: true, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
                break;
            case 'DD-MM-YYYY HH:mm':
                formattedTime = now.toLocaleString('en-GB', { timeZone: timezone, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '-');
                break;
            case 'MM/DD/YYYY hh:mm A':
                formattedTime = now.toLocaleString('en-US', { timeZone: timezone, hour12: true, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
                break;
            default:
                formattedTime = now.toLocaleString('zh-CN', { timeZone: timezone, hour12: false });
        }

        document.getElementById('timestampSeconds').innerText = timestampSeconds;
        document.getElementById('timestampMilliseconds').innerText = timestampMilliseconds;
        document.getElementById('formattedTime').innerText = formattedTime;
    }
}