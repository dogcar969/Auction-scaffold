"use client";

import { useState } from "react";
import NftCard from "../Auction/nftCard";
import { AddressInput } from "../scaffold-eth";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const NFTCardWithFunction = ({
  nftAddress,
  tokenId,
  approver,
}: {
  nftAddress: string | undefined;
  tokenId: string | bigint;
  approver: string;
}) => {
  const { writeContractAsync: writeAnimalNftAsync } = useScaffoldWriteContract("AnimalNft");
  const [address, setAddress] = useState("");
  const { address: user } = useAccount();
  return (
    <div className="w-96 bg-base-100 rounded-xl">
      <NftCard nftAddress={nftAddress} tokenId={tokenId} pinata></NftCard>
      <p>approver:</p>
      <p>{approver ? approver : <span className="text-center">no approver</span>}</p>
      <p> Address </p> <AddressInput value={address} onChange={setAddress}></AddressInput>
      <div className="flex justify-around mt-2">
        <button
          className="btn btn-secondary"
          onClick={async () => {
            if (address.length === 42 && address.indexOf("0x") === 0)
              await writeAnimalNftAsync({ functionName: "approve", args: [address, BigInt(tokenId)] });
          }}
        >
          Approval
        </button>
        <button
          className="btn btn-primary"
          onClick={async () => {
            if (address.length === 42 && address.indexOf("0x") === 0)
              await writeAnimalNftAsync({ functionName: "transferFrom", args: [user, address, BigInt(tokenId)] });
          }}
        >
          transfer
        </button>
      </div>
    </div>
  );
};

export default NFTCardWithFunction;
