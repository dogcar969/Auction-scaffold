"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { erc721Abi } from "viem";
import { readContract } from "wagmi/actions";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const defaultTokenInfo = {
  name: "No NFT info",
  description: "NFT Info not found ",
  image: "",
  attributes: [
    {
      trait_type: "",
      value: "",
    },
  ],
};

const NftCard = ({
  nftAddress,
  tokenId,
  pinata,
}: {
  nftAddress: string | undefined;
  tokenId: string | bigint;
  pinata: boolean;
}) => {
  const tokenInfo = useRef<any>({});
  const [tokenReady, setTokenReady] = useState(false);
  useEffect(() => {
    setTokenReady(false);
    tokenInfo.current = {};
    if (nftAddress && tokenId !== null) {
      if (nftAddress.length !== 42 || nftAddress.indexOf("0x") !== 0) {
        return;
      }
      readContract(wagmiConfig, {
        address: nftAddress,
        abi: erc721Abi,
        functionName: "tokenURI",
        args: [BigInt(tokenId)],
      })
        .then(async res => {
          console.log(res);
          let tokenUri = res;
          try {
            if (tokenUri === "") {
              tokenInfo.current = defaultTokenInfo;
              setTokenReady(true);
              return;
            }
            if (tokenUri.indexOf("ipfs://") === 0) {
              if (pinata) {
                tokenUri = tokenUri.replace("ipfs://", "https://silver-historical-squid-116.mypinata.cloud/ipfs/");
              } else {
                tokenUri = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
              }
            }
            if (tokenUri)
              axios
                .get(tokenUri)
                .then((response: any) => {
                  try {
                    tokenInfo.current = response.data;
                    if (tokenInfo.current.image.indexOf("ipfs://") === 0) {
                      if (pinata) {
                        tokenInfo.current = {
                          ...tokenInfo.current,
                          image: tokenInfo.current.image.replace(
                            "ipfs://",
                            "https://silver-historical-squid-116.mypinata.cloud/ipfs/",
                          ),
                        };
                      } else {
                        tokenInfo.current = {
                          ...tokenInfo.current,
                          image: tokenInfo.current.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
                        };
                      }
                    }
                    setTokenReady(true);
                  } catch (e) {
                    console.log(e);
                    tokenInfo.current = defaultTokenInfo;
                    setTokenReady(true);
                  }
                })
                .catch(e => {
                  console.log(e);
                  tokenInfo.current = defaultTokenInfo;
                  setTokenReady(true);
                });
          } catch (e: any) {
            console.log(e);
            tokenInfo.current = defaultTokenInfo;
            setTokenReady(true);
          }
        })
        .catch(e => {
          console.log(e);
          tokenInfo.current = defaultTokenInfo;
          setTokenReady(true);
        });
    }
  }, [nftAddress, tokenId]);
  return (
    <>
      {tokenReady ? (
        <div className="card card-side bg-base-100 h-60 w-96">
          <figure>
            {tokenInfo.current.image ? (
              <img
                src={tokenInfo.current.image}
                alt="Movie"
                className="object-scale-down h-60"
                crossOrigin="anonymous"
              />
            ) : (
              <Image
                src="/load_fail.png"
                alt="load fail"
                className="object-scale-down h-60"
                width="60"
                height={60}
              ></Image>
            )}
          </figure>
          <div className="card-body w-60 p-4">
            <h2 className="card-title">{tokenInfo.current.name ? tokenInfo.current.name : "No name"}</h2>
            <p>{tokenInfo.current.description ? tokenInfo.current.description : "No description"}</p>
            <div className="overflow-x-auto">
              <table className="table table-xs ">
                <thead>
                  <tr>
                    <th>trait_type</th>
                    <th>value</th>
                  </tr>
                </thead>
                <tbody>
                  {tokenInfo.current.attributes.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item.trait_type}</td>
                        <td>{item.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="card card-side bg-base-100 h-60 w-96">
          <div className="skeleton h-60 w-36"></div>
          <div className="card-body w-40 p-4">
            <div className="skeleton w-40 h-12"></div>
            <div className="skeleton w-40 h-12"></div>
            <div className="skeleton w-40 h-12"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default NftCard;
