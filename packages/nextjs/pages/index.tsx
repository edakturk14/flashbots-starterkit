import Head from "next/head";
import { FlashbotsBundleProvider, FlashbotsBundleResolution } from "@flashbots/ethers-provider-bundle";
import { Wallet, ethers } from "ethers";
import type { NextPage } from "next";

const providerKey = "ADD_PROVIDER_KEY";
const privateKey = "ADD_PRIVATE_KEY";

const network = {
  name: "sepholia",
  chainId: 1234,
  rpcURL: `https://eth-sepolia.g.alchemy.com/v2/${providerKey}`,
  flashbotRelay: "https://relay-sepolia.flashbots.net",
};

const provider = new ethers.providers.JsonRpcProvider(network.rpcURL);
const signer = new ethers.Wallet(privateKey, provider);

const authSigner = new Wallet(privateKey, provider);

const Home: NextPage = () => {
  const executeTransaction = async () => {
    const flashbotsProvider = await FlashbotsBundleProvider.create(provider, authSigner, network.flashbotRelay);
    // const amount1 = document.getElementById("amount1") as HTMLInputElement;
    // const account1 = document.getElementById("account1") as HTMLInputElement;
    // const amount2 = document.getElementById("amount2") as HTMLInputElement;
    // const account2 = document.getElementById("account2") as HTMLInputElement;

    const firstTransaction = {
      to: "0x1234567890123456789012345678901234567890", // account1
      value: ethers.utils.parseEther("0.01"), // amount1
      gasPrice: ethers.utils.parseUnits("50", "gwei"),
      gasLimit: 21000,
    };
    const secondTransaction = {
      to: "0x0987654321098765432109876543210987654321", // account2
      value: ethers.utils.parseEther("0.002"), // amount2
      gasPrice: ethers.utils.parseUnits("50", "gwei"),
    };
    const bundledTransactions = [
      {
        signer: signer,
        transaction: firstTransaction,
      },
      {
        signer: signer,
        transaction: secondTransaction,
      },
    ];
    const signedBundle = await flashbotsProvider.signBundle(bundledTransactions);
    console.log(signedBundle);
    const latestBlockNumber = await provider.getBlockNumber();
    for (let i = 1; i <= 10; i++) {
      console.log("Bundle#: ", i);
      const bundleSubmission = await flashbotsProvider.sendRawBundle(signedBundle, latestBlockNumber + i);
      // console.log("Submitted, waiting", bundleSubmission.bundleHash);
      if ("wait" in bundleSubmission) {
        // check if bundleSubmission is a FlashbotsTransaction object
        const waitResponse = await bundleSubmission.wait();
        console.log(`Wait Response: ${FlashbotsBundleResolution[waitResponse]}`);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Built w/Scaffold-eth</span>
            <span className="block text-4xl font-bold">🤖 Flashbots StarterKit</span>
          </h1>
          <div className="flex flex-col gap-2 items-center">
            <span className="font-bold italic text-gray-500 text-lg">Transaction#1</span>{" "}
            <input
              id="amount1"
              className="input focus:bg-transparent focus:text-gray-400 px-4 w-full font-medium placeholder:text-accent/50 text-gray-400 border-2 border-base-300 bg-base-200 rounded-full"
              type="text"
              placeholder="Amount"
            />
            <input
              id="account1"
              className="input focus:bg-transparent focus:text-gray-400 px-4 w-full font-medium placeholder:text-accent/50 text-gray-400 border-2 border-base-300 bg-base-200 rounded-full"
              type="text"
              placeholder="Account"
            />
            <span className="font-bold italic text-gray-500 text-lg">Transaction#2</span>{" "}
            <input
              id="amount2"
              className="input focus:bg-transparent focus:text-gray-400 px-4 w-full font-medium placeholder:text-accent/50 text-gray-400 border-2 border-base-300 bg-base-200 rounded-full"
              type="text"
              placeholder="Amount"
            />
            <input
              id="account2"
              className="input focus:bg-transparent focus:text-gray-400 px-4 w-full font-medium placeholder:text-accent/50 text-gray-400 border-2 border-base-300 bg-base-200 rounded-full"
              type="text"
              placeholder="Account"
            />
            <button className="btn btn-primary btn-sm bg-base-300 w-full" onClick={executeTransaction}>
              Bundle and Send transactions
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
