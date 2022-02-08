/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnvironmentType, Network } from "@verida/client-ts";
import { EventEmitter } from "events";
import store from "store";

import { hasSession, VaultAccount } from "@verida/account-web-vault";

import { Profile, Connect } from "../interface";


const VUE_APP_VAULT_CONTEXT_NAME = "Verida: Vault";

const CONTEXT_NAME_IN_LOCAL_STORAGE = "AppContext";

const VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER =
  "https://db.testnet.verida.io:5002/";

const VUE_APP_LOGO_URL =
  "https://assets.verida.io/verida_login_request_logo_170x170.png";

class VeridaHelpers extends EventEmitter {
  public profile: Profile;
  public context: any;
  private account: any;
  public did?: string;
  public connected?: boolean;
  public contextName?: string | any;

  constructor() {
    super();
    this.contextName = store.get(CONTEXT_NAME_IN_LOCAL_STORAGE);
    this.profile = {
      avatar: {},
      name: "",
      country: "",
    }
  }

  public async connect({ contextName, logo }: Connect): Promise<void> {
    this.account = new VaultAccount({
      defaultDatabaseServer: {
        type: "VeridaDatabase",
        endpointUri: VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER,
      },
      defaultMessageServer: {
        type: "VeridaMessage",
        endpointUri: VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER,
      },
      vaultConfig: {
        request: {
          logoUrl: logo || VUE_APP_LOGO_URL,
        },
      },
    });

    if (!this.contextName) {
      this.contextName = contextName;
      store.set(CONTEXT_NAME_IN_LOCAL_STORAGE, contextName);
    }

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

    await this.initProfile();

    if (this.context) {
      this.connected = true;
    }
    this.emit("connected", this.connected);
  }

  private async initProfile(): Promise<void> {
    const client = await this.context.getClient();
    const profile = await client.openPublicProfile(this.did, VUE_APP_VAULT_CONTEXT_NAME);
    const cb = async () => {
      const data = await profile.getMany();
      this.profile = data;

      this.profile.avatar = data.avatar && data.avatar.uri
      this.saveProfileToLocalStorage(this.profile, this.contextName)
      this.emit("profileChanged", this.profile);
    };
    profile.listen(cb);
    await cb();
  }

  autoLogin() {
    return hasSession(this.contextName as string);
  }

  public saveProfileToLocalStorage(profile: Profile, contextName: string) {

    store.set(contextName, profile);
  }

  async logout(): Promise<void> {
    await this.context.getAccount().disconnect(this.contextName);
    this.context = null;
    this.account = null;
    this.connected = false;
    this.profile = {
      avatar: {},
      name: "",
      country: "",
    }
    this.did = "";
    store.remove(this.contextName as string)
    store.remove(CONTEXT_NAME_IN_LOCAL_STORAGE)
    this.emit("profileChanged", this.profile);
  }
}

const VeridaHelper = new VeridaHelpers();

export default VeridaHelper;
