
import { shallowMount } from "@vue/test-utils";
import { VdaCredentialsView } from "../../../components/verifiable-credential-display/src";
import { schemaSpecs, testVcData } from "../mock/data";

//https://github.com/vuejs/vue-jest/issues/389

const componentProps = {
    data: testVcData,
    schema: schemaSpecs
}


describe("VdaCredentialView.vue", () => {
    it("renders component correctly without error", () => {
        const wrapper = shallowMount(VdaCredentialsView, {
            props: {
                ...componentProps
            },
        });
        expect(wrapper.props().data).not.toBeUndefined();
    });
});
