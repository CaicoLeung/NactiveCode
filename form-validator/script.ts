
class Validator {
  success = true

  /**
   * 显示错误消息
   * @param  {HTMLElement} input
   * @param  {string} message
   */
  showError(input: HTMLElement, message: string) {
    this.success = false
    const formControl = input.parentElement;
    if (formControl) {
      formControl.className = 'form-control error'
      const small = formControl.querySelector('small')
      if (small) {
        small.innerText = message
      }
    }
  }
  /**
   * 显示成功样式
   * @param  {HTMLElement} input
   */
  showSuccess(input: HTMLElement) {
    const formControl = input.parentElement;
    if (formControl) {
      formControl.className = 'form-control success'
    }
  }
  /**
   * 检查邮件格式
   * @param  {HTMLInputElement} input
   */
  checkEmail(input: HTMLInputElement) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      this.showSuccess(input);
    } else {
      this.showError(input, '电子邮箱格式无效');
    }
  }
  /**
   * 获取字段名
   * @param  {HTMLInputElement} input
   * @returns string
   */
  getFieldName(input: HTMLInputElement): string {
    return input.name || input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }
  /**
   * 检查必填项
   * @param  {HTMLInputElement[]} inputArr
   * @returns boolean
   */
  checkRequired(inputArr: HTMLInputElement[]): boolean {
    let isRequired = false;
    inputArr.forEach((input) => {
      if (input.value.trim() === '') {
        this.showError(input, `${this.getFieldName(input)} 是必填项`);
        isRequired = true;
      } else {
        this.showSuccess(input);
      }
    });

    return isRequired;
  }
  /**
   * 检查输入长度
   * @param  {HTMLInputElement} input
   * @param  {number} min
   * @param  {number} max
   */
  checkLength(input: HTMLInputElement, min: number, max: number) {
    if (input.value.length < min) {
      this.showError(
        input,
        `${this.getFieldName(input)} 必须大于 ${min} 字符`
      );
    } else if (input.value.length > max) {
      this.showError(
        input,
        `${this.getFieldName(input)} 必须大于 ${max} 字符`
      );
    } else {
      this.showSuccess(input);
    }
  }
  /**
   * 确认两个密码是否相等
   * @param  {HTMLInputElement} input1
   * @param  {HTMLInputElement} input2
   */
  isConfirmPasswordEqual(input1: HTMLInputElement, input2: HTMLInputElement) {
    if (input1.value !== input2.value) {
      this.showError(input2, '密码不匹配');
    }
  }
}

function handle(el: Event) {
  el.preventDefault()
  const form = document.getElementById('form') as HTMLFormElement
  const username = form?.querySelector('#username') as HTMLInputElement
  const email = form?.querySelector('#email') as HTMLInputElement
  const password = form?.querySelector('#password') as HTMLInputElement
  const password2 = form?.querySelector('#password2') as HTMLInputElement

  const validator = new Validator()
  if (!validator.checkRequired([username, email, password, password2])) {
    validator.checkLength(username, 2, 5)
    validator.checkLength(password, 6, 25)
    validator.checkEmail(email)
    validator.isConfirmPasswordEqual(password, password2)
  }
  if (validator.success) {
    form.submit()
  }
}

window.onload = function () {
  const form = document.getElementById('form')
  form?.addEventListener('submit', handle)
}

window.onbeforeunload = function () {
  const form = document.getElementById('form')
  form?.removeEventListener('submit', handle)
}