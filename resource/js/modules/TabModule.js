export class TabModule {
    constructor({ selectId }) {
        this.select = document.getElementById(selectId);
        this.init();
    }

    init() {
        if (this.select) {
            this.select.addEventListener('change', this.handleTabChange.bind(this));
        }
    }

    handleTabChange(event) {
        const selectedValue = event.target.value;
        const tabcontent = document.getElementsByClassName('tabcontent');
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = 'none';
        }
        document.getElementById(selectedValue).style.display = 'block';
    }
} 