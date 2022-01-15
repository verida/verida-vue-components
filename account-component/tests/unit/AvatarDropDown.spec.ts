import { shallowMount } from "@vue/test-utils";
import AvatarMenu from "@/components/AvatarDropDown.vue";

describe("HelloWorld.vue", () => {
  it("renders all components props when passed", () => {
    const did = "did:vda:0x472fe99271dBAdE2d3C7B64F6878318287852979";
    const avatar = "";
    const name = "Michael";
    const mockLogoutFn = async () => jest.fn();

    const wrapper = shallowMount(AvatarMenu, {
      props: { did, avatar, name, logout: mockLogoutFn },
    });
    expect(wrapper.text()).toMatch(name);
  });
});
