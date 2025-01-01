export class TimezoneModule {
    constructor({ selectId, formatSelectId }) {
        this.select = document.getElementById(selectId);
        this.formatInput = document.getElementById('formatInput');
        this.init();
    }

    init() {
        if (this.select && this.formatInput) {
            this.select.addEventListener('change', this.updateTime.bind(this));
            this.formatInput.addEventListener('input', this.updateTime.bind(this));
            this.updateTime(); // 初始化时更新时间
            setInterval(this.updateTime.bind(this), 1000); // 每秒更新时间
        } else {
            console.error('TimezoneModule: select or formatInput element not found.');
        }
    }

    formatDate(date, format) {
        const pad = (num) => String(num).padStart(2, '0');
        
        const replacements = {
            YYYY: date.getFullYear(),
            MM: pad(date.getMonth() + 1),
            DD: pad(date.getDate()),
            HH: pad(date.getHours()),
            mm: pad(date.getMinutes()),
            ss: pad(date.getSeconds()),
            M: date.getMonth() + 1,
            D: date.getDate(),
            H: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds()
        };

        return format.replace(/YYYY|MM|DD|HH|mm|ss|M|D|H|m|s/g, match => replacements[match]);
    }

    updateTime() {
        if (!this.select || !this.formatInput) {
            console.error('TimezoneModule: select or formatInput element not found during update.');
            return;
        }

        const now = new Date();
        const timezone = this.select.value;
        const format = this.formatInput.value;
        const timestampSeconds = Math.floor(now.getTime() / 1000);
        const timestampMilliseconds = now.getTime();

        // 使用 Intl.DateTimeFormat 获取指定时区的时间
        const options = {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };

        const tzDate = new Date(new Intl.DateTimeFormat('en-US', options).format(now));
        const formattedTime = this.formatDate(tzDate, format);

        document.getElementById('timestampSeconds').innerText = timestampSeconds;
        document.getElementById('timestampMilliseconds').innerText = timestampMilliseconds;
        document.getElementById('formattedTime').innerText = formattedTime;
    }
}