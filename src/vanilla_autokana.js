/*!
 * AutoKana Vanilla JavaScript
 * https://github.com/styleio/vanilla_autokana
 *
 * Copyright (c) 2024 Sun Suzuki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Version: 1.0.0
 * Author: Sun Suzuki (styleio)
 * Date: 2024-12-16
 */
function autoKana(inputSelector, kanaSelector, options = { katakana: false }) {
    const kanaExtractionPattern = /[^ 　ぁあ-んー]/g;
    const kanaCompactingPattern = /[ぁぃぅぇぉっゃゅょ]/g;

    let active = true;
    let timer = null;
    let flagConvert = true;
    let input = "";
    let values = [];
    let ignoreString = "";
    let baseKana = "";

    const elName = document.querySelector(inputSelector);
    const elKana = document.querySelector(kanaSelector);

    if (!elName || !elKana) {
        console.error("autoKana: 指定された要素が見つかりません");
        return;
    }

    function start() {
        active = true;
    }

    function stop() {
        active = false;
    }

    function _checkConvert(newValues) {
        if (!flagConvert) {
            if (Math.abs(values.length - newValues.length) > 1) {
                const tmpValues = newValues.join("").replace(kanaCompactingPattern, "").split("");
                if (Math.abs(values.length - tmpValues.length) > 1) {
                    _stateConvert();
                }
            } else {
                if (values.length === input.length && values.join("") !== input) {
                    if (input.match(kanaExtractionPattern)) {
                        _stateConvert();
                    }
                }
            }
        }
    }

    function _checkValue() {
        const newInput = elName.value || "";
        if (newInput === "" && elKana.value !== "") {
            _stateClear();
            _setKana();
        } else {
            const filteredInput = _removeString(newInput);
            if (input === filteredInput) {
                return;
            } else {
                input = filteredInput;
                if (!flagConvert) {
                    const newValues = input.replace(kanaExtractionPattern, "").split("");
                    _checkConvert(newValues);
                    _setKana(newValues);
                }
            }
        }
    }

    function _removeString(newInput) {
        if (newInput.includes(ignoreString)) {
            return newInput.replace(ignoreString, "");
        } else {
            const ignoreArray = ignoreString.split("");
            const inputArray = newInput.split("");
            for (let i = 0; i < ignoreArray.length; i++) {
                if (ignoreArray[i] === inputArray[i]) {
                    inputArray[i] = "";
                }
            }
            return inputArray.join("");
        }
    }

    function _setKana(newValues) {
        if (!flagConvert) {
            if (newValues) {
                values = newValues;
            }
            if (active) {
                const katakanaText = _toKatakana(baseKana + values.join(""));
                elKana.value = katakanaText;
                const event = new Event("change");
                elKana.dispatchEvent(event);
            }
        }
    }

    function _stateClear() {
        baseKana = "";
        flagConvert = false;
        ignoreString = "";
        input = "";
        values = [];
    }

    function _stateInput() {
        baseKana = elKana.value;
        flagConvert = false;
        ignoreString = elName.value;
    }

    function _stateConvert() {
        baseKana += values.join("");
        flagConvert = true;
        values = [];
    }

    function _toKatakana(src) {
        if (options.katakana) {
            let result = "";
            for (let i = 0; i < src.length; i++) {
                const charCode = src.charCodeAt(i);
                if (charCode >= 12353 && charCode <= 12435) {
                    result += String.fromCharCode(charCode + 96);
                } else {
                    result += src[i];
                }
            }
            return result;
        }
        return src;
    }

    function _clearInterval() {
        clearInterval(timer);
    }

    function _setInterval() {
        timer = setInterval(_checkValue, 30);
    }

    elName.addEventListener("blur", _clearInterval);
    elName.addEventListener("focus", () => {
        _stateInput();
        _setInterval();
    });
    elName.addEventListener("keydown", () => {
        if (flagConvert) {
            _stateInput();
        }
    });
}

