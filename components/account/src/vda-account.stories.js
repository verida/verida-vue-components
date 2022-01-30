import VdaButton from './vda-account.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Example/Account',
    component: VdaButton,
    args: {
        contextName: "Verida: Account Component",
        logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
        onSuccess: () => { },
        onError: () => { },
        onLogout: () => { },
    }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { VdaButton },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: `
      <vda-button 
      :logo="logo"
      :contextName="contextName"
      :onError="onError"
      :onSuccess="onSuccess"
       /> `,
});

export const User = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
User.args = {
    // contextName: "Verida: Account Component",
    // logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    onSuccess: () => { },
    onError: () => { },
    onLogout: () => { },
};


