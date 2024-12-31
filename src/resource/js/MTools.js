import { Base64Module } from './modules/Base64Module.js';
import { TimezoneModule } from './modules/TimezoneModule.js';
import { TabModule } from './modules/TabModule.js';
import { ClipboardModule } from './modules/ClipboardModule.js';
import { JsonModule } from './modules/JsonModule.js';
import { UrlModule } from './modules/UrlModule.js';
import { TextLengthModule } from './modules/TextLengthModule.js';
import { RandomStringModule } from './modules/RandomStringModule.js';
import { UTF8Module } from './modules/UTF8Module.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize modules
    const base64Module = new Base64Module({
        encodeInputId: 'base64Encode',
        decodeInputId: 'base64Decode'
    });

    const timezoneModule = new TimezoneModule({
        selectId: 'timezoneSelect',
        formatSelectId: 'formatSelect'
    });

    const tabModule = new TabModule({
        selectId: 'moduleSelect'
    });

    const clipboardModule = new ClipboardModule({
        timestampSecondsBtn: 'copyTimestampSeconds',
        timestampMillisecondsBtn: 'copyTimestampMilliseconds',
        formattedTimeBtn: 'copyFormattedTime'
    });

    const jsonModule = new JsonModule({
        inputId: 'jsonInput'
    });

    const urlModule = new UrlModule({
        encodeInputId: 'urlEncode',
        decodeInputId: 'urlDecode'
    });

    const textLengthModule = new TextLengthModule({
        inputId: 'textLengthInput'
    });

    const randomStringModule = new RandomStringModule({
        generateBtnId: 'generateString',
        outputId: 'stringOutput',
        options: {
            includeNumbersId: 'includeNumbers',
            includeUppercaseId: 'includeUppercase',
            includeSpecialId: 'includeSpecial',
            stringLengthId: 'stringLength',
            stringCountId: 'stringCount'
        }
    });

    const utf8Module = new UTF8Module({
        encodeInputId: 'utf8Encode',
        decodeInputId: 'utf8Decode'
    });

    // Initialize time display
    timezoneModule.updateTime();
});