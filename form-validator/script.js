"use strict";
var Validator = /** @class */ (function () {
    function Validator() {
        this.success = true;
    }
    /**
     * 显示错误消息
     * @param  {HTMLElement} input
     * @param  {string} message
     */
    Validator.prototype.showError = function (input, message) {
        this.success = false;
        var formControl = input.parentElement;
        if (formControl) {
            formControl.className = 'form-control error';
            var small = formControl.querySelector('small');
            if (small) {
                small.innerText = message;
            }
        }
    };
    /**
     * 显示成功样式
     * @param  {HTMLElement} input
     */
    Validator.prototype.showSuccess = function (input) {
        var formControl = input.parentElement;
        if (formControl) {
            formControl.className = 'form-control success';
        }
    };
    /**
     * 检查邮件格式
     * @param  {HTMLInputElement} input
     */
    Validator.prototype.checkEmail = function (input) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(input.value.trim())) {
            this.showSuccess(input);
        }
        else {
            this.showError(input, '电子邮箱格式无效');
        }
    };
    /**
     * 获取字段名
     * @param  {HTMLInputElement} input
     * @returns string
     */
    Validator.prototype.getFieldName = function (input) {
        return input.name || input.id.charAt(0).toUpperCase() + input.id.slice(1);
    };
    /**
     * 检查必填项
     * @param  {HTMLInputElement[]} inputArr
     * @returns boolean
     */
    Validator.prototype.checkRequired = function (inputArr) {
        var _this = this;
        var isRequired = false;
        inputArr.forEach(function (input) {
            if (input.value.trim() === '') {
                _this.showError(input, _this.getFieldName(input) + " \u662F\u5FC5\u586B\u9879");
                isRequired = true;
            }
            else {
                _this.showSuccess(input);
            }
        });
        return isRequired;
    };
    /**
     * 检查输入长度
     * @param  {HTMLInputElement} input
     * @param  {number} min
     * @param  {number} max
     */
    Validator.prototype.checkLength = function (input, min, max) {
        if (input.value.length < min) {
            this.showError(input, this.getFieldName(input) + " \u5FC5\u987B\u5927\u4E8E " + min + " \u5B57\u7B26");
        }
        else if (input.value.length > max) {
            this.showError(input, this.getFieldName(input) + " \u5FC5\u987B\u5927\u4E8E " + max + " \u5B57\u7B26");
        }
        else {
            this.showSuccess(input);
        }
    };
    /**
     * 确认两个密码是否相等
     * @param  {HTMLInputElement} input1
     * @param  {HTMLInputElement} input2
     */
    Validator.prototype.isConfirmPasswordEqual = function (input1, input2) {
        if (input1.value !== input2.value) {
            this.showError(input2, '密码不匹配');
        }
    };
    return Validator;
}());
function handle(el) {
    el.preventDefault();
    var form = document.getElementById('form');
    var username = form === null || form === void 0 ? void 0 : form.querySelector('#username');
    var email = form === null || form === void 0 ? void 0 : form.querySelector('#email');
    var password = form === null || form === void 0 ? void 0 : form.querySelector('#password');
    var password2 = form === null || form === void 0 ? void 0 : form.querySelector('#password2');
    var validator = new Validator();
    if (!validator.checkRequired([username, email, password, password2])) {
        validator.checkLength(username, 2, 5);
        validator.checkLength(password, 6, 25);
        validator.checkEmail(email);
        validator.isConfirmPasswordEqual(password, password2);
    }
    if (validator.success) {
        form.submit();
    }
}
window.onload = function () {
    var form = document.getElementById('form');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', handle);
};
window.onbeforeunload = function () {
    var form = document.getElementById('form');
    form === null || form === void 0 ? void 0 : form.removeEventListener('submit', handle);
};
