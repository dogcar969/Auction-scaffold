"use client";

import { useState } from "react";
import { EtherInput } from "../scaffold-eth";
import NftCard from "./nftCard";
import { formatEther, parseEther } from "viem";
import Input from "~~/components/Auction/Input";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export default function AuctionCard({ listing, withPayment }: { listing: any; withPayment: boolean }) {
  const [value, setValue] = useState("");
  const { writeContractAsync: writeAuctionAsync } = useScaffoldWriteContract("Auction");
  return (
    <div className="card card-side bg-base-100 shadow-xl w-fit">
      <NftCard nftAddress={listing.nftAddress} tokenId={listing.tokenId} pinata={false}></NftCard>
      <div className="*:my-2 my-1 text-sm">
        <p>Auction Info</p>
        <p>Expired time: {new Date(Number(listing.expiredTime * 1000)).toLocaleString()}</p>
        <p>price: {listing.price ? formatEther(BigInt(listing.price)) : ""}</p>
        <p>bidder: {listing.buyer !== "0x0000000000000000000000000000000000000000" ? listing.buyer : "no buyer now"}</p>
        <p>seller: {listing.seller}</p>
        <div className="flex justify-around">
          <Input label="bid price" width="w-40">
            <EtherInput value="value" onChange={setValue}></EtherInput>
          </Input>
          <button
            className="btn btn-success"
            onClick={async () => {
              if (Math.floor(new Date().valueOf() / 1000) > listing.expiredTime) {
                notification.warning("this listing has been expired, please refresh to get newer listings");
              }
              if (withPayment) {
                await writeAuctionAsync({
                  functionName: "bid",
                  args: [listing.nftAddress, listing.tokenId, parseEther(value)],
                  value: parseEther(value),
                });
              } else {
                await writeAuctionAsync({
                  functionName: "bid",
                  args: [listing.nftAddress, listing.tokenId, parseEther(value)],
                  value: 0n,
                });
              }
            }}
          >
            bid
          </button>
        </div>
      </div>
    </div>
  );
}
