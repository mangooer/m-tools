import * as vscode from "vscode";

class MToolsViewProvider implements vscode.WebviewViewProvider {
	constructor(private readonly _extensionUri: vscode.Uri) {}

	public static readonly viewType = "mToolsView";

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken
	) {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'src', 'resource')]
		};

        const scriptUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'src', 'resource', 'js', 'MTools.js'));
        const styleUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'src', 'resource', 'css', 'MTools.css'));
		const copyIconUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'src', 'resource', 'images', 'copy.png'));
		const localizedText = getLocalizedText();
		const timezones = Intl.supportedValuesOf('timeZone');

		const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		// 在HTML中动态生成时区选项，并默认选择当前时区
		const timezoneOptions = timezones.map(tz => `<option value="${tz}" ${tz === currentTimeZone ? 'selected' : ''}>${tz}</option>`).join('');

		webviewView.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>mTools</title>
            <link rel="stylesheet" href="${styleUri}">
            <style>
                .tab {
                    overflow: hidden;
                    border-bottom: 1px solid #ccc;
                    background-color: #f1f1f1;
                }
                .tab button {
                    background-color: inherit;
                    float: left;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    padding: 14px 16px;
                    transition: 0.3s;
                }
                .tab button:hover {
                    background-color: #ddd;
                }
                .tab button.active {
                    background-color: #ccc;
                }
                .tabcontent {
                    display: none;
                    padding: 6px 12px;
                    border-top: none;
                }
                #moduleSelect {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    z-index: 1;
                    display: block;
                    margin: 0;
                }
            </style>
        </head>
        <body>
            <select id="moduleSelect">
                <option value="Time">${localizedText.time}</option>
                <option value="JSON">${localizedText.json}</option>
                <option value="Base64">${localizedText.base64}</option>
                <option value="URL">${localizedText.url}</option>
                <option value="TextLength">${localizedText.textLength}</option>
                <option value="RandomString">${localizedText.randomString}</option>
                <option value="UTF8">${localizedText.utf8}</option>
            </select>
           
            <div id="Time" class="tabcontent">
                <h3>${localizedText.time}</h3>
                <label>${localizedText.selectTimezone}</label>
                <select id="timezoneSelect">
                    ${timezoneOptions}
                </select>
                <div>
                    <label>${localizedText.currentTimestampSeconds}<span id="timestampSeconds"></span></label>
                    <div id="copyTimestampSeconds" class="copy-icon"><img src="${copyIconUri}"></div>
                </div>
                <div>
                    <label>${localizedText.currentTimestampMilliseconds}<span id="timestampMilliseconds"></span></label>
                    <div id="copyTimestampMilliseconds" class="copy-icon"><img src="${copyIconUri}"></div>
                </div>
                <label>${localizedText.selectFormat}</label>
                <select id="formatSelect" style="width: 40%; padding: 5px; font-family: var(--vscode-font-family); font-size: calc(var(--vscode-font-size) - 1px); color: var(--vscode-dropdown-foreground); background-color: var(--vscode-dropdown-background); border: 1px solid var(--vscode-dropdown-border); border-radius: 4px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); position: static; top: 10px; right: 10px; z-index: 100; margin-bottom: 15px; margin-top: 15px;">
                    <option value="YYYY-MM-DD HH:mm:ss">YYYY-MM-DD HH:mm:ss</option>
                    <option value="YYYY/MM/DD hh:mm:ss A">YYYY/MM/DD hh:mm:ss A</option>
                    <option value="DD-MM-YYYY HH:mm">DD-MM-YYYY HH:mm</option>
                    <option value="MM/DD/YYYY hh:mm A">MM/DD/YYYY hh:mm A</option>
                </select>
                <div>
                    <label>${localizedText.currentTime}<span id="formattedTime"></span></label>
                    <div id="copyFormattedTime" class="copy-icon"><img src="${copyIconUri}"></div>
                </div>
            </div>
            <div id="JSON" class="tabcontent">
                <h3>${localizedText.json}</h3>
                <textarea id="jsonInput" placeholder="${localizedText.inputJson}" ></textarea>
                <br>
                <textarea id="jsonOutput" placeholder="${localizedText.formattedJson}" readonly ></textarea>
            </div>
            <div id="Base64" class="tabcontent">
                <h3>${localizedText.base64}</h3>
                <textarea id="base64Encode" placeholder="${localizedText.inputBase64Encode}"></textarea>
                <br>
                <textarea id="base64Decode" placeholder="${localizedText.inputBase64Decode}"></textarea>
            </div>
            <div id="URL" class="tabcontent">
                <h3>${localizedText.url}</h3>
                <textarea id="urlEncode" placeholder="${localizedText.inputUrlEncode}"></textarea>
                <br>
                <textarea id="urlDecode" placeholder="${localizedText.inputUrlDecode}"></textarea>
            </div>
            <div id="TextLength" class="tabcontent">
                <h3>${localizedText.textLength}</h3>
                <textarea id="textLengthInput" placeholder="${localizedText.inputText}"></textarea>
                <br>
                <label>${localizedText.textLength}: <span id="textLengthOutput"></span></label>
            </div>
            <div id="RandomString" class="tabcontent">
                <h3>${localizedText.randomString}</h3>
                <label><input type="checkbox" id="includeNumbers"> ${localizedText.includeNumbers}</label>
                <br>
                <label><input type="checkbox" id="includeUppercase"> ${localizedText.includeUppercase}</label>
                <br>
                <label><input type="checkbox" id="includeSpecial"> ${localizedText.includeSpecial}</label>
                <br>
                <label>${localizedText.stringLength}</label>
                <input type="number" id="stringLength" value="8" min="0" max="128">
                <br>
                <label>${localizedText.stringCount}</label>
                <input type="number" id="stringCount" value="1" min="1">
                <br>
                <div id="generateString" class="m-tools-button">${localizedText.generateString}</div>
                <br>
                <textarea id="stringOutput" placeholder="${localizedText.generatedString}" readonly></textarea>
            </div>
            <div id="UTF8" class="tabcontent">
                <h3>${localizedText.utf8}</h3>
                <textarea id="utf8Encode" placeholder="${localizedText.inputUtf8Encode}"></textarea>
                <br>
                <textarea id="utf8Decode" placeholder="${localizedText.inputUtf8Decode}"></textarea>
            </div>

            <script type="module" src="${scriptUri}"></script>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    document.getElementById('moduleSelect').selectedIndex = 0;
                    document.getElementById('Time').style.display = 'block';
                });
            </script>
        </body>
        </html>
        `;
	}


}

function getLocalizedText() {
	const language = vscode.env.language;
	const isChinese = language.startsWith('zh');
	return {
		time: isChinese ? '时间日期' : 'Time',
		json: isChinese ? 'JSON格式化' : 'JSON Formatter',
		base64: isChinese ? 'Base64编码/解码' : 'Base64 Encode/Decode',
		url: isChinese ? 'URL编码/解码' : 'URL Encode/Decode',
		textLength: isChinese ? '文本长度' : 'Text Length',
		randomString: isChinese ? '随机字符串' : 'Random String',
		utf8: isChinese ? 'UTF8编码/解码' : 'UTF8 Encode/Decode',
		selectTimezone: isChinese ? '选择时区：' : 'Select Timezone:',
		currentTimestampSeconds: isChinese ? '当前时间戳（秒）：' : 'Current Timestamp (Seconds):',
		currentTimestampMilliseconds: isChinese ? '当前时间戳（毫秒）：' : 'Current Timestamp (Milliseconds):',
		currentTime: isChinese ? '当前时间：' : 'Current Time:',
		generateString: isChinese ? '生成字符串' : 'Generate String',
		inputJson: isChinese ? '输入JSON' : 'Input JSON',
		formattedJson: isChinese ? '格式化后的JSON' : 'Formatted JSON',
		inputBase64Encode: isChinese ? '输入文本进行Base64编码' : 'Input Text for Base64 Encoding',
		inputBase64Decode: isChinese ? '输入Base64进行解码' : 'Input Base64 for Decoding',
		inputUrlEncode: isChinese ? '输入文本进行URL编码' : 'Input Text for URL Encoding',
		inputUrlDecode: isChinese ? '输入URL编码进行解码' : 'Input URL Encoded Text for Decoding',
		inputText: isChinese ? '输入文本' : 'Input Text',
		includeNumbers: isChinese ? '包含数字' : 'Include Numbers',
		includeUppercase: isChinese ? '包含大写字母' : 'Include Uppercase Letters',
		includeSpecial: isChinese ? '包含特殊符号' : 'Include Special Characters',
		stringLength: isChinese ? '生成位数：' : 'String Length:',
		stringCount: isChinese ? '生成数量：' : 'String Count:',
		generatedString: isChinese ? '生成的字符串' : 'Generated String',
		inputUtf8Encode: isChinese ? '输入文本进行UTF8编码' : 'Input Text for UTF8 Encoding',
		inputUtf8Decode: isChinese ? '输入UTF8进行解码' : 'Input UTF8 for Decoding',
		selectFormat: isChinese ? '选择格式：' : 'Select Format:',
	};
}

export default MToolsViewProvider;