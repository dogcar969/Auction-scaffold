"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { execute } from "~~/.graphclient";
import Input from "~~/components/Auction/Input";
import NftCard from "~~/components/Auction/nftCard";
import { EtherInput } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const AnimalNft = () => {
  const AnimalInfo = useDeployedContractInfo("AnimalNft").data;
  const AnimalNftAddress = AnimalInfo?.address || "0x2F4cD2Dad9C14d3918616C3745c51320b81cad1f";
  const { address: minter } = useAccount();
  const RequestRecordQuery = `
query($_skip:Int) {
  nftMinteds(where:{minter:"${minter}"},orderBy:blockTimestamp,first:5,skip:$_skip){
    blockTimestamp,
    species,
    requestId,
    transactionHash,
    tokenId
  }
    nftRequesteds(where:{requester:"${minter}"},orderBy:blockTimestamp,first:5,skip:$_skip) {
    blockTimestamp,
    requestId,
    transactionHash
  }
}`;
  const requestRecords = useRef<any>();
  const [recordsReady, setRecordsReady] = useState(false);
  const getRequestRecord = async () => {
    if (minter !== undefined) {
      requestRecords.current = await execute(RequestRecordQuery, {
        variables: {
          _skip: 0,
        },
      });
      setRecordsReady(true);
    } else toast("未获取地址");
  };
  useEffect(() => {
    getRequestRecord();
  }, [minter]);
  const [value, setValue] = useState("");
  const { data: threshold } = useScaffoldReadContract({
    contractName: "AnimalNft",
    functionName: "i_threshold",
  });
  const { data: minFee } = useScaffoldReadContract({
    contractName: "AnimalNft",
    functionName: "i_minFee",
  });
  const { writeContractAsync: writeAnimalNftAsync } = useScaffoldWriteContract("AnimalNft");
  const handleMint = async () => {
    if (value !== "" && BigInt(value) !== 0n)
      await toast.promise(
        writeAnimalNftAsync({
          functionName: "requestNft",
          value: BigInt(value),
        }),
        {
          loading: "Nft requesting...",
          success: "Nft requested successfully! Nft will be minted after vrf fulfilled",
          error: "Nft request failed",
        },
      );
  };

  const viewDialog = useRef<any>(null);
  const [NftAddress, setNftAddress] = useState("");
  const [TokenId, setTokenId] = useState<string | bigint>("");
  const handleView = (nftAddress: string | undefined, tokenId: string | bigint) => {
    if (nftAddress) {
      setNftAddress(nftAddress);
    }
    setTokenId(tokenId);
    viewDialog.current.showModal();
  };
  const speciesMap: { [key: string]: string } = {
    "0": "fish",
    "1": "flamingo",
    "2": "godzilla",
  };

  return (
    <>
      <div className="mx-20 flex items-center flex-col">
        <h1 className="text-4xl  mt-10">Animal Nft</h1>
        <div className="flex gap-2">
          <p>Threshold: {threshold ? formatEther(threshold) : <span className="loading"></span>} eth</p>
          <p>Min fee:{minFee ? formatEther(minFee) : <span className="loading"></span>} eth</p>
        </div>
        <Input label="Value" width="w-60">
          <EtherInput value={value} onChange={setValue}></EtherInput>
        </Input>
        <button className="btn btn-accent mt-4" onClick={handleMint}>
          Mint your Animal Nft
        </button>

        {recordsReady ? (
          <>
            <p className="text-2xl relative">
              Lastest five request records{" "}
              <Image
                src="/refresh.svg"
                alt="refresh"
                width={16}
                height={16}
                onClick={getRequestRecord}
                className="absolute top-0 -right-4 hover:cursor-pointer"
              ></Image>
            </p>

            <div className="overflow-x-auto">
              <table className="table table-zebra table-xs">
                {/* head */}
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>RequestId</th>
                    <th>transactionHash</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {requestRecords.current.data.nftRequesteds.map((element: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{element.blockTimestamp}</td>
                        <td>{element.requestId}</td>
                        <td>{element.transactionHash}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-2xl">Lastest five mint records </p>
            <div className="overflow-x-auto">
              <table className="table table-zebra table-xs">
                {/* head */}
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>RequestId</th>
                    <th>TokenId</th>
                    <th>Species</th>
                    <th>transactionHash</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {requestRecords.current.data.nftMinteds.map((element: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{element.blockTimestamp}</td>
                        <td>{element.requestId}</td>
                        <td>{element.tokenId}</td>
                        <td>{speciesMap[element.species as string]}</td>
                        <td>{element.transactionHash}</td>
                        <td>
                          <button onClick={() => handleView(AnimalNftAddress, element.tokenId)}>view</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <dialog id="viewDialog" className="modal" ref={viewDialog}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <NftCard nftAddress={NftAddress} tokenId={TokenId}></NftCard>
        </div>
      </dialog>
    </>
  );
};

export default AnimalNft;
