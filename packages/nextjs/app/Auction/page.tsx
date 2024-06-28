"use client";

import { useEffect, useRef, useState } from "react";
import { execute } from "../../.graphclient";
import AuctionCard from "../../components/Auction/Auction_card";
import { writeContract } from "@wagmi/core";
import toast from "react-hot-toast";
import { erc721Abi, formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import Input from "~~/components/Auction/Input";
import NftCard from "~~/components/Auction/nftCard";
import { AddressInput, EtherInput, IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const query = `
  query auctions {
    listings(first: 5) {
    id
    nftAddress
    tokenId
    expiredTime
    price
    seller
    buyer
  }
  }
`;

export default function Auction() {
  const user = useAccount();
  const auctionInfo = useDeployedContractInfo("Auction").data;
  const [withPayment, setWithPayment] = useState(false);
  const setWithPaymentInInput = () => {
    setWithPayment(!withPayment);
  };
  const listings = useRef<any>(null);
  const [listingsReady, setListingsReady] = useState(false);
  useEffect(() => {
    if (listings.current !== null) {
      return;
    }
    execute(query, {})
      .then(res => {
        listings.current = res;
        setListingsReady(true);
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const { writeContractAsync: writeAuctionAsync } = useScaffoldWriteContract("Auction");

  // list dialog
  const listDialog = useRef<any>(null);

  const [listNftAddress, setListNftAddress] = useState("");
  const [listTokenId, setListTokenId] = useState<string | bigint>("");
  const [initialPrice, setInitialPrice] = useState("");

  const previewDialog = useRef<any>(null);

  const [prepayAmount] = useState("");
  const prepayDialog = useRef<any>(null);
  const { data: balance } = useScaffoldReadContract({
    contractName: "Auction",
    functionName: "getBalance",
    args: [user.address],
  });
  // const handlePreview = async () => {
  //   let tokenUri = await toast.promise(
  //     readContract(wagmiConfig, {
  //       abi: erc721Abi,
  //       address: listNftAddress,
  //       functionName: "tokenURI",
  //       args: [BigInt(listTokenId)],
  //     }),
  //     {
  //       loading: "Wait for tokenURI from contract",
  //       success: "TokenUri get!",
  //       error: "Contract don't have a tokenURI function",
  //     },
  //   );
  //   if (tokenUri.indexOf("ipfs://") == 0) {
  //     tokenUri = tokenUri.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/");
  //   }
  //   const token = await toast.promise<any>(axios.get(tokenUri), {
  //     loading: "Wait for getting token information",
  //     success: "Get NFT information!",
  //     error: "Get NFT information failed ",
  //   });
  //   tokenInfo.current = token.data;
  //   if (tokenInfo.current.image) {
  //     if (tokenInfo.current.image.indexOf("ipfs://") == 0) {
  //       tokenInfo.current = {
  //         ...tokenInfo.current,
  //         image: tokenInfo.current.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/"),
  //       };
  //     }
  //   }
  //   setIsPreviewToken(true);
  // };

  const handleApproval = async () => {
    if (auctionInfo) {
      await toast.promise(
        writeContract(wagmiConfig, {
          address: listNftAddress,
          abi: erc721Abi,
          functionName: "approve",
          args: [auctionInfo.address, BigInt(listTokenId)],
        }),
        {
          loading: "Wait for approval ...",
          success: "Approve successfully!",
          error: "Approve failed",
        },
      );
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center mt-6 mb-2">Auction</h1>
      {/* list dialog */}
      <div className="flex justify-between mb-4  items-center mx-10">
        <div>
          <button
            className="btn btn-primary mr-4"
            onClick={() => {
              if (listDialog.current != null) {
                listDialog.current.showModal();
              }
            }}
          >
            Manage your NFT
          </button>
          <button
            className="btn btn-info"
            onClick={() => {
              if (prepayDialog.current !== null) {
                prepayDialog.current.showModal();
              }
            }}
          >
            prepay
          </button>
        </div>
        <div>
          your balance :{balance !== undefined ? formatEther(balance) + " ether" : <span className="loading"></span>}
        </div>
        <div className="flex gap-2 items-center h-fit">
          <button
            className="btn btn-success"
            onClick={async () => {
              await writeAuctionAsync({
                functionName: "withdraw",
              });
            }}
          >
            withdraw
          </button>
          <div>bid with payment: </div>
          <input type="checkbox" className="toggle" checked={withPayment} onChange={setWithPaymentInInput} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mx-auto">
        {listingsReady ? (
          listings.current.data.listings.map((item: any, index: number) => {
            return <AuctionCard listing={item} key={index} withPayment={withPayment}></AuctionCard>;
          })
        ) : (
          <></>
        )}
      </div>
      <dialog id="pay_dialog" className="modal" ref={prepayDialog}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">prepay</h3>
          <Input label="Initial price" width="w-72">
            <EtherInput value={initialPrice} onChange={setInitialPrice}></EtherInput>
          </Input>
          <div className="flex justify-center mt-4">
            <button
              className="btn btn-success"
              onClick={async () => {
                await writeAuctionAsync({
                  functionName: "prepay",
                  value: BigInt(prepayAmount),
                });
              }}
            >
              prepay
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="list_dialog" className="modal" ref={listDialog}>
        <div className="modal-box ">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Auction your nft</h3>
          <div className="mx-6">
            <Input label="Nft Address" width="w-72">
              <AddressInput value={listNftAddress} onChange={setListNftAddress}></AddressInput>
            </Input>

            <Input label="TokenId" width="w-72">
              <IntegerInput value={listTokenId} onChange={setListTokenId}></IntegerInput>
            </Input>
            <Input label="Initial price" width="w-72">
              <EtherInput value={initialPrice} onChange={setInitialPrice}></EtherInput>
            </Input>
          </div>

          <div className="modal-action flex-col ">
            <div className="flex justify-around">
              <button className="btn" onClick={() => previewDialog.current.showModal()}>
                Preview
              </button>
              <button className="btn btn-secondary" onClick={handleApproval}>
                Approve
              </button>
              <button
                className="btn btn-success"
                onClick={async () => {
                  await writeAuctionAsync({
                    functionName: "listItem",
                    args: [listNftAddress, BigInt(listTokenId), BigInt(parseEther(initialPrice))],
                  });
                }}
              >
                List item
              </button>
            </div>
            <div className="flex justify-around px-10">
              <button
                className="btn btn-neutral"
                onClick={async () => {
                  await writeAuctionAsync({
                    functionName: "check",
                    args: [listNftAddress, BigInt(listTokenId)],
                  });
                }}
              >
                {" "}
                Check item
              </button>
              <button
                className="btn btn-error"
                onClick={async () => {
                  await writeAuctionAsync({
                    functionName: "cancelItem",
                    args: [listNftAddress, BigInt(listTokenId)],
                  });
                }}
              >
                Cancel item
              </button>
            </div>
          </div>
        </div>
      </dialog>
      {/* preview dialog */}
      <dialog id="preview_dialog" className="modal" ref={previewDialog}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <NftCard tokenId={listTokenId} nftAddress={listNftAddress} pinata={false}></NftCard>
        </div>
      </dialog>
    </div>
  );
}
