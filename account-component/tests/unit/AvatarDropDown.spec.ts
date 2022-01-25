import { shallowMount } from "@vue/test-utils";
import AvatarMenu from "@/components/AvatarDropDown.vue";

describe("AvatarDropDown.vue", () => {
  it("renders all components props when passed", () => {

    const logo = "logo";
    const onError = async () => jest.fn();
    const contextName = "onError";
    const onSuccess = async () => jest.fn();

    const wrapper = shallowMount(AvatarMenu, {
      props: { logo, contextName, onError, onSuccess },
    });
    expect(wrapper.element);
  });
});