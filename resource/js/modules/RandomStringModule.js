export class RandomStringModule {
    constructor({ generateBtnId, outputId, options }) {
        this.generateBtn = document.getElementById(generateBtnId);
        this.output = document.getElementById(outputId);
        this.options = options;
        this.init();
    }

    init() {
        if (this.generateBtn) {
            this.generateBtn.addEventListener('click', this.generateRandomStrings.bind(this));
        }
    }

    generateRandomStrings() {
        const includeNumbers = document.getElementById(this.options.includeNumbersId).checked;
        const includeUppercase = document.getElementById(this.options.includeUppercaseId).checked;
        const includeSpecial = document.getElementById(this.options.includeSpecialId).checked;
        const stringLength = parseInt(document.getElementById(this.options.stringLengthId).value, 10);
        const stringCount = parseInt(document.getElementById(this.options.stringCountId).value, 10);

        let characters = 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) {characters += '0123456789';}
        if (includeUppercase) {characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';}
        if (includeSpecial) {characters += '!@#$%^&*()_+[]{}|;:,.<>?';}

        let strings = [];
        for (let i = 0; i < stringCount; i++) {
            let str = '';
            for (let j = 0; j < stringLength; j++) {
                str += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            strings.push(str);
        }
        this.output.value = strings.join('\n');
    }
} 