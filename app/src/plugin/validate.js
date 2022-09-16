// vee-validate 插件表单验证
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zhCN', {
  messages: {
    ...zhCN.messages,
    is: (field) => `${field}必须与密码相同`
  },
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议'
  }
})

VeeValidate.Validator.extend('agree', {
  validate: value => {
    return value
  },
  getMessage: field => field + '必须同意'
})
