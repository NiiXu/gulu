import Vue from "vue"
import Button from "./button"
import Icon from "./icon"
import ButtonGroup from "./buttonGroup"

Vue.component("g-button", Button)
Vue.component("g-icon", Icon)
Vue.component("g-button-group", ButtonGroup)

new Vue({
  el: "#app",
  data: {
    loading1: false,
    loading2: false,
    loading3: false,

  }
})

import chai from "chai"
import spies from 'chai-spies'

chai.use(spies)

const expect = chai.expect
try {
//单元测试
  {
    //测试按钮还有icon
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: "setting"
      }
    })
    vm.$mount("#test")
    let useElement = vm.$el.querySelector("use")
    let href = useElement.getAttribute("xlink:href")
    expect(href).to.eq("#i-setting")
    vm.$el.remove()
    vm.$destroy()
  }

  {
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: "setting",
        loading: true
      }
    })
    vm.$mount()
    let useElement = vm.$el.querySelector("use")
    let href = useElement.getAttribute("xlink:href")
    expect(href).to.eq("#i-loading")
    vm.$el.remove()
    vm.$destroy()
  }

  {
    const div = document.createElement("div")
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: "setting"
      }
    })
    vm.$mount(div)
    let svg = vm.$el.querySelector("svg")
    let {order} = window.getComputedStyle(svg)
    expect(order).to.eq("1")
    vm.$el.remove()
    vm.$destroy()
  }
  {
    const div = document.createElement("div")
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: "setting",
        iconPosition: "right"
      }
    })
    vm.$mount(div)
    let svg = vm.$el.querySelector("svg")
    let {order} = window.getComputedStyle(svg)
    expect(order).to.eq("2")
    vm.$el.remove()
    vm.$destroy()
  }
  {

    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: "setting",
        iconPosition: "right"
      }
    })
    vm.$mount()
    let spy = chai.spy(function () {
    })

    vm.$on("click", spy)
    let button = vm.$el
    button.click()
    expect(spy).to.have.been.called()
  }
} catch (error){
  window.error = [error]
} finally {
  window.error && error.forEach((error) =>{
    console.error(error.message)
  })
}
