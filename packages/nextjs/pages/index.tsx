import Head from "next/head";
import type { NextPage } from "next";

const Home: NextPage = () => {
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
              className="input focus:bg-transparent focus:text-gray-400 px-4 w-full font-medium placeholder:text-accent/50 text-gray-400 border-2 border-base-300 bg-base-200 rounded-full"
              type="text"
              placeholder="Amount"
            />
            <input
              className="input focus:bg-transparent focus:text-gray-400 px-4 w-full font-medium placeholder:text-accent/50 text-gray-400 border-2 border-base-300 bg-base-200 rounded-full"
              type="text"
              placeholder="Account"
            />
            <span className="font-bold italic text-gray-500 text-lg">Transaction#2</span>{" "}
            <input
              className="input focus:bg-transparent focus:text-gray-400 px-4 w-full font-medium placeholder:text-accent/50 text-gray-400 border-2 border-base-300 bg-base-200 rounded-full"
              type="text"
              placeholder="Amount"
            />
            <input
              className="input focus:bg-transparent focus:text-gray-400 px-4 w-full font-medium placeholder:text-accent/50 text-gray-400 border-2 border-base-300 bg-base-200 rounded-full"
              type="text"
              placeholder="Account"
            />
            <button className="btn btn-primary btn-sm bg-base-300 w-full">Bundle and Send transactions</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
