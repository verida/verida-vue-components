import { shallowMount } from '@vue/test-utils'
import HelloWorld from '../../vda-account.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const LoginButtonText = 'Login with Verida';
    const contextName = 'Account component';
    const logo = 'https://assets.verida.io/verida_login_request_logo_170x170.png';
    const onSuccess = () => { }
    const onError = () => { }
    const onLogout = () => { }



    const wrapper = shallowMount(HelloWorld, {
      props: {
        onSuccess, contextName, LoginButtonText, logo, onError, onLogout
      }
    })
    expect(wrapper.find(LoginButtonText)).toMatch(LoginButtonText)
  })
})
