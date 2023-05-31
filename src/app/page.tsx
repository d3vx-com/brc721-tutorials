/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/Button";
import { useOrdinalSafe } from "@/hooks/useOrdinalSafe";
import { inscription, payee } from "./constant";
import {
  COLLECTION_INSCRIPTION_ID,
  useCollection,
} from "@/hooks/useCollection";
import * as React from "react";
import { useBalance } from "@/hooks/useBalance";
import { round } from "@/helpers/round";

export default function Inscribe() {
  const wallet = useOrdinalSafe();
  const data = JSON.stringify(inscription, null, 0);

  const collection = useCollection();
  const balance = useBalance(payee);

  React.useEffect(() => {
    // Refetching the collection every 10 seconds to update supply counter
    if (collection.isSuccess) {
      const interval = setInterval(() => {
        collection.refetch();
      }, 10_000);
      return () => clearInterval(interval);
    }
  }, [collection]);

  React.useEffect(() => {
    if (balance.isSuccess) {
      const interval = setInterval(() => {
        balance.refetch();
      }, 5_000);
      return () => clearInterval(interval);
    }
  }, [balance]);

  const inscribe = () => {
    wallet.inscribeItem({
      data,
      payee,
      price: 75000,
      mime: "application/json",
    });
  };

  return (
    <div className="mx-auto">
      <section>
        {/* <p>
          Translation: <Link href="/chinese">中文</Link>{" "}
          <Link href="/">English</Link>
        </p> */}
        <p>
          Before you take the plunge and deploy your first collection with
          BRC721, we strongly recommend introducing yourself with the{" "}
          <a href="https://www.brc721.com/specification" target="_blank">
            specification.
          </a>{" "}
          Taking the time to understand the main technical aspects will help
          build a simple mental model and will significantly improve your
          understanding of the protocol.{" "}
        </p>
      </section>
      <section>
        <h2>Basics</h2>
        The protocol consists of three types of manifests:
        <p>
          <span className="block mb-2 font-medium">📜 Collection Manifest</span>
          This is the definitive source of information for your collection. It
          contains essential data such as max supply, max per address, and max
          block height. Consider this manifest as an immutable contract on
          Ethereum.
        </p>
        <p>
          <span className="block mb-2 font-medium">👁️ Reveal Manifest</span>
          This is a reliable source for your metadata. BRC721 relies on the
          ERC721{" "}
          <a
            href="https://docs.opensea.io/docs/metadata-standards#metadata-structure"
            target="_blank"
          >
            metadata standard
          </a>
          . The metadata is stored off-chain and linked to the collection.
          Similar to ERC721 baseURI and tokenURI properties.
        </p>
        <p>
          Just like in ERC721, you have the option to update the metadata URL to
          incorporate a reveal mechanic. This is achieved by deploying another
          reveal manifest with a higher priority. This priority is controlled by
          the weight field in the manifest.
        </p>
        <p>
          <span className="block mb-2 font-medium">
            💎 Inscription Manifest
          </span>
          The inscription manifest functions similarly to an NFT token. It
          refers back to the collection manifest. It includes the initial
          owner&#39;s address and price in sats. The initial owner&#39;s address
          comes in handy when you have an allowlist, and you want to restrict
          minting to specific addresses.
        </p>
      </section>

      <section>
        <h2>Verification</h2>

        <p>
          How do we guarantee the linked nature of all these manifests and
          validate the data? This is where public and private(secret) keys prove
          vital.
        </p>

        <p>
          All the manifests and their content are linked and signed with your
          private key. Our playground can generate them for you. it is important
          to save them in secure storage. You will need these keys to, for
          example, create a new reveal manifest or issue new inscription
          manifests(NFTs). A good practice is to have a separate pair of keys
          for every collection you inscribe and manage.
        </p>

        <p>
          But what happens if someone attempts to cheat? For instance, what if
          someone modifies the inscription price or initial owner&#39;s address,
          or simply refuses to pay for the NFT?
        </p>

        <p>
          If the inscription content is altered, the signature becomes invalid,
          thus breaching the specification. If the payment is not made, it
          constitutes a violation of the specification rules. Consequently, the
          inscription will not be verified and included within the collection.
          The person who made these changes will be left with a worthless text
          inscription. The same outcome awaits anyone trying to mint beyond the
          allowed limit or if the max supply has been reached.
        </p>

        <p className="font-bold">
          Enough theory! Let&apos;s lets create our collection.
        </p>
      </section>

      <section>
        <h2>Preparing wallet and keys</h2>

        <ul className="list-decimal pl-7">
          <li>
            Download and top up the{" "}
            <a href="https://ordinalsafe.xyz/" target="_blank">
              OrdinalSafe wallet
            </a>{" "}
            with  atleast 40000 SATS (0.0004BTC) It is the only wallet that supports BRC-721 at this
            moment, more intergrations are in the pipeline.
          </li>

          <li>
            Go to the{" "}
            <a href="https://www.brc721.com/playground" target="_blank">
              BRC-721 Playground
            </a>{" "}
            and generate your Public and Private(Secret) Keys.
            <img
              alt="generating keys"
              src="/images/generating-keys.png"
              className="p-6 my-8 border"
            />
          </li>
          <li>
            Press <strong>Edit</strong>, and then copy and save your keys to
            secure storage. You will need them later to issue new tokens.
          </li>

          <li>
            Press on <strong>Connect Wallet</strong> to be able to inscribe
            manifests.
            <img
              alt="connect wallet"
              src="/images/connect-wallet.png"
              className="p-6 my-8 border"
            />
          </li>
        </ul>
        <p className="mt-8">
          Now you are all set and ready to create your first collection!
        </p>
      </section>

      <section>
        <h2>Inscribing collection</h2>
        <p>
          As previously highlighted, the collection manifest operates as the 
          single source of truth for the collection. Its immutable nature signifies 
          that it can&#39;t be modified once it has been created.
        </p>
        <p>
          The image below shows that we have declared a collection with the OG
          name and symbol. We have specified my wallet as a payment address to
          receive token payments. In addition, we have set a maximum supply of
          10,000 tokens, with a limit of 5 tokens per address.
        </p>
        <b>
          We encourage you to choose unique name and symbol for your collection
          to avoid duplicates.
        </b>{" "}
        <p>
        We have deliberately left the maximum block height field unfilled. 
        This method is suitable for open edition collections, where a defined 
        maximum supply is absent, but a time constraint exists.
        </p>
        <p>
          The <strong>Signer Public Key</strong> field was populated
          automatically because we generated keys beforehand.
        </p>
        <img
          alt="collection manifest"
          src="/images/collection-manifest.png"
          className="p-6 my-8 border"
        />
        <p className="mt-8">
          Now you can press <strong>Inscribe</strong>. It will open OrdinalSafe,
          where you can pay inscription fees and inscribe your collection
          manifest.{" "}
        </p>
        <img
          className="p-6 pb-0 mx-auto my-8 border w-96"
          alt="ordinalsafe collection inscription"
          src="/images/ordinal-safe-collection-inscription.png"
        />
        <p>
          After finishing the above process, you will get a transaction hash
          next to the Inscribe button. This indicates that your transaction has
          been sent.
        </p>
        <img
          alt="collection transaction hash"
          src="/images/collection-tx-hash.png"
          className="p-6 mx-auto my-8 border"
        />
        <p>
          By clicking on it, you can see the status of your transaction. In our
          case, it is <strong>Pending</strong>. This indicates that the block
          containing your transaction has yet to be mined. It&#39;s necessary to
          wait until this status updates to <strong>Confirmed</strong>.
        </p>
        <div className="flex flex-wrap my-8">
          <img
            alt="transaction pending"
            src="/images/tx-pending.png"
            className="mx-auto border w-96"
          />
          <img
            alt="transaction confirmed"
            src="/images/tx-confirmed.png"
            className="mx-auto border w-80"
          />
        </div>
        <p>
          Now one of the protocols servers will find it and store it in the
          database. It usually takes a minute. After that, it will be available
          on the{" "}
          <a href="https://www.brc721.com/explorer" target="_blank">
            Explorer page
          </a>
          .
        </p>
        <img
          alt="og"
          src="/images/og.png"
          className="p-6 mx-auto my-8 border w-96"
        />
        <p>
          <strong>
            Congratulations! You inscribed your first BRC721 collection!
          </strong>{" "}
          But let&apos;s keep going. Currently, the collection is empty. It
          doesn&apos;t have any tokens or metadata.
        </p>
      </section>

      <section>
        <h2>Inscribing metadata</h2>
        <p>
        Before users are allowed to mint tokens, we would like to display a placeholder 
        for the token&apos;s metadata. Once the minting process is completed and all tokens 
        have been purchased, we will replace this placeholder with the actual metadata, 
        including various attributes. 
        </p>

        <p>
          We&apos;ve prepared an API for this tutorial that returns the token
          metadata by id:{" "}
          <a href="https://brc721.com/api/og/1" target="_blank">
            https://brc721.com/api/og/1
          </a>
          . After the mint, we will use the same endpoint to switch placeholder
          metadata to the real metadata so we don&apos;t have to inscribe a new
          reveal manifest.
        </p>

        <p>
          Still, you can inscribe a new reveal manifest with higher weight,
          especially when you store your metadata on decentralized storage like
          IPFS and cannot change the content behind the link.
        </p>

        <p>
          To inscribe your reveal manifest, go to the{" "}
          <a href="https://www.brc721.com/playground" target="_blank">
            Playground
          </a>{" "}
          and fill out the Reveal Manifest form.
        </p>

        <img
          alt="reveal manifest"
          src="/images/reveal-manifest.png"
          className="p-6 my-8 border"
        />

        <p>
          You will notice that we haven&apos;t added the token ids to the
          metadata URL field. It is because the indexer will calculate the token
          id automatically and create the link corresponding to every token.
          Similar to ERC721.
        </p>

        <p>
          You can find your collection inscription id via any Ordinals explorer
          or simply go to our API{" "}
          <a href="https://www.brc721.com/api/collections" target="_blank">
            https://www.brc721.com/api/collections
          </a>{" "}
          and check the latest deployed collections. You will find an object
          like this with all the information about your collection.
        </p>

        <img
          alt="find collection id"
          className="p-6 my-8 border"
          src="/images/find-collection-id.png"
        />

        <p>
          When all the first is filled out, we press <strong>Inscribe</strong>{" "}
          button below the Reveal Manifest form, pay the inscription fees, and
          wait for the transaction to be confirmed.
        </p>

        <p>
          When the transaction is confirmed in a couple of minutes, one of the
          servers will index it and update the collections API so you will see
          your URL.
        </p>

        <img
          className="p-6 my-8 border"
          alt="find collection id update"
          src="/images/find-collection-id-update.png"
        />

        <p>
          <span className="block font-bold">
            Congratulations! Now we have the metadata connected to our
            collection.
          </span>
          The next step is to mint the tokens.
        </p>
      </section>

      <section>
        <h2>Inscribing tokens</h2>
        <p>
          First, as the collection creator, we will inscribe one token for
          ourselves. The exact process will apply to every access list address
          inscription, but the form should have the price field populated. In
          our case, it is empty to mint for free.
        </p>
        <img
          className="p-6 my-8 border"
          alt="collection owner mint"
          src="/images/collection-owner-mint.png"
        />
        <p>
          To start a public mint, we must specify the price and the collection
          inscription id field. The initial owner address field should be empty.
        </p>

        <p>
          <strong>
            Remember that it won&apos;t be possible to pause the public mint.
          </strong>{" "}
          It will end when all the supply is minted. All new inscriptions after
          that won&apos;t be a part of the collection.
        </p>

        <p>
          In those cases, you will have to make a manual refund, we are working
          on a script to fromulate a refund transaction so you can make all
          refunds in a few clicks.
        </p>

        <img
          className="p-6 my-8 border"
          alt="public mint"
          src="/images/public-mint.png"
        />

        <p>
          For public mint, you don&apos;t want to inscribe youself but{" "} instead 
          <strong> Download</strong>&nbsp;the inscription file and share it with
          your community or submit it to a BRC721 community marketplace.
        </p>

        <p>
          Allowing people to inscribe via our{" "}
          <a href="https://www.brc721.com/inscribe" target="_blank">
            Inscribe
          </a>{" "}
          page or you can build your personal mint website. We plan to opensource a
          minting button so that you can use this code as a starting point.
        </p>

        <p>
          In the screenshot below, we have connected the wallet, added the
          inscription file, and clicked the <strong>Inscribe</strong> button. As
          you can see, we need to send the token&apos;s price when inscribing
          it.
        </p>
        <img
          alt="inscribe page"
          src="/images/inscribe-page.png"
          className="p-6 pb-0 my-8 border"
        />

        <p>
          <strong>
            This is it! Congratulations! <br />
            You now know how to create collections, inscribe metadata, and mint
            your own collection tokens!
          </strong>{" "}
        </p>

        <p>
          {" "}
          We are excited for the success of your project and eagerly
          anticipate the innovative creations you will build using our protocol. Please join us in our {" "}
          <a href="https://discord.com/invite/brc721" target="_blank">
            Discord
          </a>{" "}
          discord to discuss 
          the project in greater detail 
        </p>
      </section>

      <section id="mint">
        {/* <div className="mt-8">
          {(() => {
            if (collection.isSuccess) {
              const { maxSupply, maxPerAddress } = collection.data;
              return (
                <div className="mb-5 text-sm text-gray-500">
                  <div>Out of supply</div>
                  <div className="mb-1">1 mint - 1 OG</div>
                  <div className="mb-1">Max {maxPerAddress} per address</div>
                  <div>Price: 75000 sats or ~20$ + fees for a single mint</div>
                </div>
              );
            }
          })()}

          {(() => {
            if (wallet.injection.isError) {
              return (
                <div>
                  {wallet.injection.error}.{" "}
                  <a href="https://ordinalsafe.xyz" target="_blank">
                    Download
                  </a>
                </div>
              );
            }

            if (wallet.initialization.isError) {
              return <div>{wallet.initialization.error}</div>;
            }

            if (wallet.injection.isSuccess && wallet.initialization.isIdle) {
              return (
                <Button onClick={wallet.initialize}>Connect wallet</Button>
              );
            }

            if (wallet.initialization.isSuccess) {
              const outOfSupply =
                balance.isSuccess && round(balance.data / 75000) >= 10000;

              return (
                <Button
                  onClick={inscribe}
                  disabled={wallet.inscriptionManifest.isLoading || outOfSupply}
                >
                  {outOfSupply ? "Out of supply" : "Mint OG token"}
                </Button>
              );
            }
          })()}
        </div> */}
      </section>
    </div>
  );
}
