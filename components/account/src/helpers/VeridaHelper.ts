/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnvironmentType, Network } from "@verida/client-ts";
import { EventEmitter } from "events";
import { VaultAccount, hasSession } from "@verida/account-web-vault";

import { Profile, Connect } from "../interface";


const VUE_APP_VAULT_CONTEXT_NAME = "Verida: Vault";


const VUE_APP_LOGO_URL =
  "https://assets.verida.io/verida_login_request_logo_170x170.png";

class VeridaHelpers extends EventEmitter {
  public profile: Profile | null;
  public context?: any;
  private account: any;
  public did?: string;
  public connected?: boolean;
  public contextName?: string | any;

  constructor() {
    super();
    this.profile = {
      avatar: {},
      name: "",
      country: "",
    }
  }

  public async connect({ contextName, logo, openUrl }: Connect): Promise<void> {
    let requestObj: any

    requestObj = {
      logoUrl: logo || VUE_APP_LOGO_URL,
    }

    if (openUrl !== "") {
      requestObj.openUrl = openUrl
    }

    this.account = new VaultAccount({
      request: requestObj
    });

    this.context = await Network.connect({
      client: {
        environment: EnvironmentType.TESTNET,
      },
      account: this.account,
      context: {
        name: contextName,
      },

    });

    this.did = await this.account.did();

    if (this.context) {
      this.connected = true;
      this.emit("connected", this.context);
    }
  }


  public async getProfileClient(): Promise<any> {
    const client = await this.context.getClient();
    return await client.openPublicProfile(this.did, VUE_APP_VAULT_CONTEXT_NAME);
  }

  public async initProfileEvent(): Promise<void> {
    const profile = await this.getProfileClient()
    const profileCallback = async () => {
      const data = await profile.getMany();
      this.buildProfileData(data)

      this.emit("profileChanged", this.profile);
    };

    profile.listen(profileCallback);
  }

  private async buildProfileData(data: any): Promise<Profile> {
    this.profile = {
      avatar: '',
      name: data.name,
      country: data.country,
      description: data.description,
      did: this.did
    };

    if (data.avatar && data.avatar.uri) {
      this.profile.avatar = data.avatar.uri;
    }
    return this.profile
  }

  public async getProfile(): Promise<Profile> {
    const profile = await this.getProfileClient()
    const data = await profile.getMany();
    const profileData = this.buildProfileData(data)

    return profileData
  }

  hasSession(contextName: string): boolean {
    return hasSession(contextName)
  }

  async logout(): Promise<void> {
    await this.context.getAccount().disconnect(this.contextName);
    this.context = null;
    this.account = null;
    this.connected = false;
    this.profile = null
    this.did = "";
  }
}

const VeridaHelper = new VeridaHelpers();

export default VeridaHelper;
