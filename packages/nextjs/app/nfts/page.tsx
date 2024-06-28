"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { execute } from "~~/.graphclient";
import NFTCardWithFunction from "~~/components/AnimalNft/NFTCardWithFunction";

const Nfts = () => {
  const { address: owner } = useAccount();
  const AnimalNftQuery = `
    {
  animalNfts(where:{owner:"${owner}"}) {
    id
    approved
  }
}
  `;
  const nfts = useRef<any>({});
  const [nftReady, setNftReady] = useState(false);
  useEffect(() => {
    if (owner === undefined) {
      return;
    }
    execute(AnimalNftQuery, null)
      .then(res => {
        nfts.current = res;
        setNftReady(true);
      })
      .catch(e => console.log(e));
  }, [owner]);
  const [page, setPage] = useState(0);
  return (
    <div>
      <h1 className="text-center text-2xl mt-4">Your Animal Nfts</h1>
      {nftReady ? (
        <>
          <div>
            <div className="flex justify-around">
              {nfts.current.data.animalNfts
                .slice(
                  page * 3,
                  page * 3 + 3 < nfts.current.data.animalNfts.length ? page + 3 : nfts.current.data.animalNfts.length,
                )
                .map((item: any, index: number) => {
                  return (
                    <NFTCardWithFunction
                      nftAddress="0x2F4cD2Dad9C14d3918616C3745c51320b81cad1f"
                      tokenId={BigInt(item.id)}
                      approver={item.approved}
                      key={index}
                    ></NFTCardWithFunction>
                  );
                })}
            </div>

            <div className="join grid grid-cols-2 w-80 mx-auto mt-4">
              <button
                className="join-item btn btn-outline"
                onClick={() => {
                  if (page > 0) setPage(page - 1);
                }}
              >
                Previous page
              </button>
              <button
                className="join-item btn btn-outline"
                onClick={() => {
                  if (page * 3 + 3 < nfts.current.data.animalNfts.length) setPage(page + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Nfts;
