import {
  BiconomySmartAccount,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import { Bundler } from "@biconomy/bundler";
import { ChainId } from "@biconomy/core-types";
import { BiconomyPaymaster } from "@biconomy/paymaster";
import { Wallet, ethers, providers } from "ethers";

const provider = new providers.JsonRpcProvider(
  "https://rpc.public.zkevm-test.net"
);

const wallet = new Wallet(
  "b48414390d795401b54897519c27469a8d36012b30ef45ddafa326d9b3d3d8d6",
  provider
);

const bundler = new Bundler({
  bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/abc",
  chainId: ChainId.POLYGON_ZKEVM_TESTNET,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

const paymaster = new BiconomyPaymaster({
  paymasterUrl:
    "https://paymaster.biconomy.io/api/v1/80001/cIhIeS-I0.7e1f17b1-6ebb-454c-8499-c5f66dd098c6",
});

const biconomySmartAccountConfig = {
  signer: wallet,
  chainId: ChainId.POLYGON_MUMBAI,
  bundler: bundler,
  paymaster: paymaster,
};

async function createAccount() {
  const biconomyAccount = new BiconomySmartAccount(biconomySmartAccountConfig);
  const biconomySmartAccount = await biconomyAccount.init();
  console.log("owner: ", biconomySmartAccount.owner);
  console.log("address: ", await biconomySmartAccount.getSmartAccountAddress());
  return biconomyAccount;
}

export async function createTransaction() {
  console.log("creating account");

  const smartAccount = await createAccount();
  console.log(smartAccount);

  const transaction = {
    to: "0xa9E57A92dC43A2d94B7acb93A35f3035C57C6480",
    data: "0x",
    value: ethers.utils.parseEther("0.01"),
  };

  const userOp = await smartAccount.buildUserOp([transaction]);
  userOp.paymasterAndData = "0x";

  const userOpResponse = await smartAccount.sendUserOp(userOp);

  const transactionDetail = await userOpResponse.wait();

  console.log("transaction detail below");
  console.log(transactionDetail);
}
