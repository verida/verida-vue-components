import { shallowMount } from "@vue/test-utils";
import VdaAccount from "../../../components/account/src/lib-components/vda-account.vue";


describe("HelloWord.vue", () => {
    it("renders component correctly without error", () => {
        const onLogout = () => jest.fn();
        const onError = () => jest.fn();
        const onSuccessLogin = () => jest.fn();
        const contextName = 'Account component';
        const wrapper = shallowMount(VdaAccount, {
            props: {
                onLogout, onError, onSuccessLogin, contextName
            },
        });
        expect(wrapper.vm.$options.name).toMatch('VdaAccount');
    });
});
