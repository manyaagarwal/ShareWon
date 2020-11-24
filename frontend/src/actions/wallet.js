import { tronWeb } from "../lib/tronweb";

export const CREATE_WALLET = "CREATE_WALlET";
export const RECOVER_WALLET = "RECOVER_WALLET";
export const FETCH_WALLET = "FETCH_WALET";

export const createWallet = async () => {
  tronWeb.setAddress("TPRTB2sNG79uA6nTrHMSceTSgncjSVMnQt");
  const bip39 = require("bip39");
  const ethers = require("ethers");
  const mnemonic = bip39.generateMnemonic();
  let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
  let privateKey = mnemonicWallet.privateKey.slice(
    2,
    mnemonicWallet.privateKey.length
  );
  let publicKey = tronWeb.address.fromPrivateKey(privateKey);
  return {
    publicKey: publicKey,
    privateKey: privateKey,
  };
};

export const createWalletAuthentication = async () => {
  tronWeb.setAddress("TPRTB2sNG79uA6nTrHMSceTSgncjSVMnQt");
  let message = tronWeb.toHex("hello");
  let signed = await tronWeb.trx.sign(
    message,
    "B230BF77460370D821201969EDEC52FEE0E8615A155581D562D16A3974FCD8A7"
  );
  console.log(signed);

  let verifyMsg = await tronWeb.trx.verifyMessage(
    message,
    signed,
    "TPRTB2sNG79uA6nTrHMSceTSgncjSVMnQt"
  );
  console.log(verifyMsg);
};
