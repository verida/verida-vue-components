
import { shallowMount } from "@vue/test-utils";
import { VdaCredentialsView } from "../../../components/verifiable-credential-display/src";
import { schemaSpecs, testVcData } from "../mock/data";


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

    it("When schema object is not passed to component", () => {
        const wrapper = shallowMount(VdaCredentialsView, {
            props: {
                data: componentProps.data,
            },
        });


        const schemaObject = Object.keys(wrapper.props().schema).length === 0

        expect(schemaObject).toBeTruthy();
    });
});
