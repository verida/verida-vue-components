# Verida verifiable credentials display component

Open Source Vue Components for Verida

- This component can be customized to suite your application styles and themes .

NB: This supports vue 3 only

## Usage

```
yarn add  @verida/vue-credentials-view3

```

### Using the  component

This component is used to handle SSO (Single Sign on) login it leverages our `@verida/client-ts` and `@verida/account-web-vault` packages under the hood

```vue

<script lang="ts">
import { defineComponent } from "vue";
import VerifiableCredentialDisplay from "@verida/vue-credentials-view";

export default defineComponent({
  name: "Login",
  data() {
    return {
      contextName: "Verida: Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    };
  },
  methods: {
    onSuccess(response: any) {
      this.$vdaClient.initUser(response);
    },
    onError(error: Error) {
      console.log("Login Error", error);
    },
  },
});
</script>

<template>
  <div id="app">
    <vda-login
      :onError="onError"
      :onSuccess="onSuccess"
      :contextName="contextName"
      :logo="logo"
      :onLogout="onLogout"
    />
  </div>
</template>

```

### Using the `vda-account` component

This component is used to display a logged-in user profile details such as `name` , `did`and  `avatar` this happens after the `vda-login` component has been used for performing and SSO (Single Sign on) Login .

```js
<script lang="ts">
import { defineComponent } from "vue";

const schemaSpecs = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://common.schemas.verida.io/social/contact/v0.1.0/schema.json",
  title: "Contact",
  titlePlural: "Contacts",
  description: "A record of a contact",
  type: "object",
  appearance: {
    style: {
      color: "#FD4F64",
      icon: "./icon.svg",
    },
    nameField: "name",
    summaryField: "summary",
  },
  database: {
    name: "social_contact",
    indexes: {
      email: ["email"],
      did: ["did"],
      name: ["lastName", "firstName"],
      schema: ["schema"],
    },
  },
  layouts: {
    create: ["firstName", "lastName", "email", "mobile", "did"],
    view: ["firstName", "lastName", "email", "mobile", "did"],
  },
  properties: {
    name: {
      title: "Name",
      description: "Name of the item within card list and details",
      type: "string",
    },
    summary: {
      title: "Summary",
      description: "Brief summary of item",
      type: "string",
      maxLength: 100,
    },
    "   ": {
      title: "Archived",
      description: "Is this record archived?",
      type: "boolean",
    },
    schema: {
      title: "Schema",
      description: "URI of the schema for this record",
      type: "string",
    },
    signatures: {
      title: "Signatures",
      description: "Signatures verifying this data has been signed",
      type: "object",
    },
    sourceApplication: {
      title: "Source application",
      description: "Name of the application this data was sourced from",
      type: "string",
    },
    icon: {
      title: "Icon",
      description:
        "URL of an icon for this record. Must be square, prefer SVG, otherwise minimum 50p x 50p",
      type: "string",
    },
    insertedAt: {
      title: "Inserted",
      description: "Date/time this record was inserted",
      type: "string",
      format: "date-time",
    },
    modifiedAt: {
      title: "Modified",
      description: "Date/time this record was modified",
      type: "string",
      format: "date-time",
    },
    firstName: {
      title: "First Name",
      type: "string",
    },
    lastName: {
      title: "Last Name",
      type: "string",
    },
    email: {
      title: "Email",
      type: "string",
      format: "email",
    },
    mobile: {
      title: "Mobile",
      type: "string",
    },
    did: {
      title: "DID",
      type: "string",
    },
  },
  required: ["schema", "firstName", "lastName"],
};
const testVcData = {
  name: "Vitalik Buterin",
  firstName: "Vitalik",
  lastName: "Buterin",
  email: "me@vitalik.eth",
  schema: "https://common.schemas.verida.io/social/contact/v0.1.0/schema.json",
};


export default defineComponent({
  name: "ServeDev",
  components: {
    VerifiableCredentialDisplay,
  },
  data: () => ({
    testVcData,
    schemaSpecs,
  }),
});
</script>

<template>
  <div id="app">
    <verifiable-credential-display :schema="schemaSpecs" :data="testVcData" />
  </div>
</template>

```

### Props

1. `vda-account`

| Props           | Type     | Required | Description                                                                                                                                 |
| --------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------                                                                                                        |
| schema          | object   | false    | you can retrieve the schema specifications from our docs here [schemas](https://developers.verida.io/docs/concepts/schemas#json-schema-inheritance)
| data | object  | true    |                  This the object verifiable credential data that will be displayed in the component.                                                                                         |

### Styling

Styling class that can be customized

- vda-vc-display

- vda-vc-display h2

- vda-vc-content

- vda-vc-content-title

- vda-vc-content-value
