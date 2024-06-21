// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace CareerTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type AnimalNftUser = {
  id: Scalars['Bytes']['output'];
  operators?: Maybe<Array<Scalars['Bytes']['output']>>;
  nfts?: Maybe<Array<animalNft>>;
  requests?: Maybe<Array<nftRequested>>;
};


export type AnimalNftUsernftsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<animalNft_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<animalNft_filter>;
};


export type AnimalNftUserrequestsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<nftRequested_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<nftRequested_filter>;
};

export type AnimalNftUser_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  operators?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operators_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operators_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operators_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operators_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operators_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nfts_?: InputMaybe<animalNft_filter>;
  requests_?: InputMaybe<nftRequested_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AnimalNftUser_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AnimalNftUser_filter>>>;
};

export type AnimalNftUser_orderBy =
  | 'id'
  | 'operators'
  | 'nfts'
  | 'requests';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  listing?: Maybe<listing>;
  listings: Array<listing>;
  auctionRecord?: Maybe<auctionRecord>;
  auctionRecords: Array<auctionRecord>;
  user?: Maybe<user>;
  users: Array<user>;
  nftMetadata?: Maybe<nftMetadata>;
  nftMetadata_collection: Array<nftMetadata>;
  animalNftUser?: Maybe<AnimalNftUser>;
  animalNftUsers: Array<AnimalNftUser>;
  animalNft?: Maybe<animalNft>;
  animalNfts: Array<animalNft>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  nftMinted?: Maybe<nftMinted>;
  nftMinteds: Array<nftMinted>;
  nftRequested?: Maybe<nftRequested>;
  nftRequesteds: Array<nftRequested>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerylistingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylistingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<listing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<listing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionRecordArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionRecordsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<auctionRecord_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<auctionRecord_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryusersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<user_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<user_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftMetadataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftMetadata_collectionArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<nftMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<nftMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryanimalNftUserArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryanimalNftUsersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AnimalNftUser_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AnimalNftUser_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryanimalNftArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryanimalNftsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<animalNft_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<animalNft_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransfersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftMintedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftMintedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<nftMinted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<nftMinted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftRequestedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftRequestedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<nftRequested_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<nftRequested_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  listing?: Maybe<listing>;
  listings: Array<listing>;
  auctionRecord?: Maybe<auctionRecord>;
  auctionRecords: Array<auctionRecord>;
  user?: Maybe<user>;
  users: Array<user>;
  nftMetadata?: Maybe<nftMetadata>;
  nftMetadata_collection: Array<nftMetadata>;
  animalNftUser?: Maybe<AnimalNftUser>;
  animalNftUsers: Array<AnimalNftUser>;
  animalNft?: Maybe<animalNft>;
  animalNfts: Array<animalNft>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  nftMinted?: Maybe<nftMinted>;
  nftMinteds: Array<nftMinted>;
  nftRequested?: Maybe<nftRequested>;
  nftRequesteds: Array<nftRequested>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionlistingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlistingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<listing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<listing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionRecordArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionRecordsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<auctionRecord_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<auctionRecord_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionusersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<user_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<user_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftMetadataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftMetadata_collectionArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<nftMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<nftMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionanimalNftUserArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionanimalNftUsersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AnimalNftUser_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AnimalNftUser_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionanimalNftArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionanimalNftsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<animalNft_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<animalNft_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransferArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransfersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftMintedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftMintedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<nftMinted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<nftMinted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftRequestedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftRequestedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<nftRequested_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<nftRequested_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Transfer = {
  id: Scalars['Bytes']['output'];
  from: Scalars['Bytes']['output'];
  to: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Transfer_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
};

export type Transfer_orderBy =
  | 'id'
  | 'from'
  | 'to'
  | 'tokenId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type animalNft = {
  id: Scalars['String']['output'];
  approved?: Maybe<Scalars['Bytes']['output']>;
  owner: AnimalNftUser;
  metaData?: Maybe<nftMetadata>;
};

export type animalNft_filter = {
  id?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  approved?: InputMaybe<Scalars['Bytes']['input']>;
  approved_not?: InputMaybe<Scalars['Bytes']['input']>;
  approved_gt?: InputMaybe<Scalars['Bytes']['input']>;
  approved_lt?: InputMaybe<Scalars['Bytes']['input']>;
  approved_gte?: InputMaybe<Scalars['Bytes']['input']>;
  approved_lte?: InputMaybe<Scalars['Bytes']['input']>;
  approved_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  approved_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  approved_contains?: InputMaybe<Scalars['Bytes']['input']>;
  approved_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<AnimalNftUser_filter>;
  metaData?: InputMaybe<Scalars['String']['input']>;
  metaData_not?: InputMaybe<Scalars['String']['input']>;
  metaData_gt?: InputMaybe<Scalars['String']['input']>;
  metaData_lt?: InputMaybe<Scalars['String']['input']>;
  metaData_gte?: InputMaybe<Scalars['String']['input']>;
  metaData_lte?: InputMaybe<Scalars['String']['input']>;
  metaData_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metaData_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metaData_contains?: InputMaybe<Scalars['String']['input']>;
  metaData_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metaData_not_contains?: InputMaybe<Scalars['String']['input']>;
  metaData_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metaData_starts_with?: InputMaybe<Scalars['String']['input']>;
  metaData_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metaData_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  metaData_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metaData_ends_with?: InputMaybe<Scalars['String']['input']>;
  metaData_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metaData_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  metaData_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metaData_?: InputMaybe<nftMetadata_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<animalNft_filter>>>;
  or?: InputMaybe<Array<InputMaybe<animalNft_filter>>>;
};

export type animalNft_orderBy =
  | 'id'
  | 'approved'
  | 'owner'
  | 'owner__id'
  | 'metaData'
  | 'metaData__id'
  | 'metaData__json';

export type auctionRecord = {
  id: Scalars['ID']['output'];
  nftAddress: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
  price: Scalars['BigInt']['output'];
  seller: Scalars['Bytes']['output'];
  buyer: Scalars['Bytes']['output'];
  settleTime: Scalars['BigInt']['output'];
  status: listingStatus;
};

export type auctionRecord_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  nftAddress?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nftAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nftAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  seller?: InputMaybe<Scalars['Bytes']['input']>;
  seller_not?: InputMaybe<Scalars['Bytes']['input']>;
  seller_gt?: InputMaybe<Scalars['Bytes']['input']>;
  seller_lt?: InputMaybe<Scalars['Bytes']['input']>;
  seller_gte?: InputMaybe<Scalars['Bytes']['input']>;
  seller_lte?: InputMaybe<Scalars['Bytes']['input']>;
  seller_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  seller_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  seller_contains?: InputMaybe<Scalars['Bytes']['input']>;
  seller_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  buyer?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_not?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  buyer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  settleTime?: InputMaybe<Scalars['BigInt']['input']>;
  settleTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  settleTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  settleTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  settleTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  settleTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  settleTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  settleTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status?: InputMaybe<listingStatus>;
  status_not?: InputMaybe<listingStatus>;
  status_in?: InputMaybe<Array<listingStatus>>;
  status_not_in?: InputMaybe<Array<listingStatus>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<auctionRecord_filter>>>;
  or?: InputMaybe<Array<InputMaybe<auctionRecord_filter>>>;
};

export type auctionRecord_orderBy =
  | 'id'
  | 'nftAddress'
  | 'tokenId'
  | 'price'
  | 'seller'
  | 'buyer'
  | 'settleTime'
  | 'status';

export type listing = {
  id: Scalars['ID']['output'];
  nftAddress: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
  expiredTime: Scalars['BigInt']['output'];
  price: Scalars['BigInt']['output'];
  seller: Scalars['Bytes']['output'];
  buyer: Scalars['Bytes']['output'];
};

export type listingStatus =
  | 'sold'
  | 'pass'
  | 'canceled'
  | 'revertWithNotApproved'
  | 'revertWithOwnershipChange';

export type listing_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  nftAddress?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nftAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nftAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  nftAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  expiredTime?: InputMaybe<Scalars['BigInt']['input']>;
  expiredTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  expiredTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  expiredTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  expiredTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  expiredTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  expiredTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  expiredTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  seller?: InputMaybe<Scalars['Bytes']['input']>;
  seller_not?: InputMaybe<Scalars['Bytes']['input']>;
  seller_gt?: InputMaybe<Scalars['Bytes']['input']>;
  seller_lt?: InputMaybe<Scalars['Bytes']['input']>;
  seller_gte?: InputMaybe<Scalars['Bytes']['input']>;
  seller_lte?: InputMaybe<Scalars['Bytes']['input']>;
  seller_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  seller_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  seller_contains?: InputMaybe<Scalars['Bytes']['input']>;
  seller_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  buyer?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_not?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  buyer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<listing_filter>>>;
  or?: InputMaybe<Array<InputMaybe<listing_filter>>>;
};

export type listing_orderBy =
  | 'id'
  | 'nftAddress'
  | 'tokenId'
  | 'expiredTime'
  | 'price'
  | 'seller'
  | 'buyer';

export type nftMetadata = {
  id: Scalars['ID']['output'];
  json: Scalars['String']['output'];
};

export type nftMetadata_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  json?: InputMaybe<Scalars['String']['input']>;
  json_not?: InputMaybe<Scalars['String']['input']>;
  json_gt?: InputMaybe<Scalars['String']['input']>;
  json_lt?: InputMaybe<Scalars['String']['input']>;
  json_gte?: InputMaybe<Scalars['String']['input']>;
  json_lte?: InputMaybe<Scalars['String']['input']>;
  json_in?: InputMaybe<Array<Scalars['String']['input']>>;
  json_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  json_contains?: InputMaybe<Scalars['String']['input']>;
  json_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  json_not_contains?: InputMaybe<Scalars['String']['input']>;
  json_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  json_starts_with?: InputMaybe<Scalars['String']['input']>;
  json_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  json_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  json_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  json_ends_with?: InputMaybe<Scalars['String']['input']>;
  json_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  json_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  json_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<nftMetadata_filter>>>;
  or?: InputMaybe<Array<InputMaybe<nftMetadata_filter>>>;
};

export type nftMetadata_orderBy =
  | 'id'
  | 'json';

export type nftMinted = {
  id: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
  minter: Scalars['Bytes']['output'];
  species: Scalars['Int']['output'];
  requestId: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type nftMinted_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minter?: InputMaybe<Scalars['Bytes']['input']>;
  minter_not?: InputMaybe<Scalars['Bytes']['input']>;
  minter_gt?: InputMaybe<Scalars['Bytes']['input']>;
  minter_lt?: InputMaybe<Scalars['Bytes']['input']>;
  minter_gte?: InputMaybe<Scalars['Bytes']['input']>;
  minter_lte?: InputMaybe<Scalars['Bytes']['input']>;
  minter_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  minter_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  minter_contains?: InputMaybe<Scalars['Bytes']['input']>;
  minter_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  species?: InputMaybe<Scalars['Int']['input']>;
  species_not?: InputMaybe<Scalars['Int']['input']>;
  species_gt?: InputMaybe<Scalars['Int']['input']>;
  species_lt?: InputMaybe<Scalars['Int']['input']>;
  species_gte?: InputMaybe<Scalars['Int']['input']>;
  species_lte?: InputMaybe<Scalars['Int']['input']>;
  species_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  species_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  requestId?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  requestId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<nftMinted_filter>>>;
  or?: InputMaybe<Array<InputMaybe<nftMinted_filter>>>;
};

export type nftMinted_orderBy =
  | 'id'
  | 'tokenId'
  | 'minter'
  | 'species'
  | 'requestId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type nftRequested = {
  id: Scalars['Bytes']['output'];
  requestId: Scalars['BigInt']['output'];
  requester: AnimalNftUser;
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type nftRequested_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  requestId?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  requestId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  requester?: InputMaybe<Scalars['String']['input']>;
  requester_not?: InputMaybe<Scalars['String']['input']>;
  requester_gt?: InputMaybe<Scalars['String']['input']>;
  requester_lt?: InputMaybe<Scalars['String']['input']>;
  requester_gte?: InputMaybe<Scalars['String']['input']>;
  requester_lte?: InputMaybe<Scalars['String']['input']>;
  requester_in?: InputMaybe<Array<Scalars['String']['input']>>;
  requester_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  requester_contains?: InputMaybe<Scalars['String']['input']>;
  requester_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  requester_not_contains?: InputMaybe<Scalars['String']['input']>;
  requester_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  requester_starts_with?: InputMaybe<Scalars['String']['input']>;
  requester_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  requester_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  requester_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  requester_ends_with?: InputMaybe<Scalars['String']['input']>;
  requester_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  requester_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  requester_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  requester_?: InputMaybe<AnimalNftUser_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<nftRequested_filter>>>;
  or?: InputMaybe<Array<InputMaybe<nftRequested_filter>>>;
};

export type nftRequested_orderBy =
  | 'id'
  | 'requestId'
  | 'requester'
  | 'requester__id'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type user = {
  id: Scalars['Bytes']['output'];
  balance: Scalars['BigInt']['output'];
};

export type user_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  balance?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<user_filter>>>;
  or?: InputMaybe<Array<InputMaybe<user_filter>>>;
};

export type user_orderBy =
  | 'id'
  | 'balance';

  export type QuerySdk = {
      /** null **/
  listing: InContextSdkMethod<Query['listing'], QuerylistingArgs, MeshContext>,
  /** null **/
  listings: InContextSdkMethod<Query['listings'], QuerylistingsArgs, MeshContext>,
  /** null **/
  auctionRecord: InContextSdkMethod<Query['auctionRecord'], QueryauctionRecordArgs, MeshContext>,
  /** null **/
  auctionRecords: InContextSdkMethod<Query['auctionRecords'], QueryauctionRecordsArgs, MeshContext>,
  /** null **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Query['users'], QueryusersArgs, MeshContext>,
  /** null **/
  nftMetadata: InContextSdkMethod<Query['nftMetadata'], QuerynftMetadataArgs, MeshContext>,
  /** null **/
  nftMetadata_collection: InContextSdkMethod<Query['nftMetadata_collection'], QuerynftMetadata_collectionArgs, MeshContext>,
  /** null **/
  animalNftUser: InContextSdkMethod<Query['animalNftUser'], QueryanimalNftUserArgs, MeshContext>,
  /** null **/
  animalNftUsers: InContextSdkMethod<Query['animalNftUsers'], QueryanimalNftUsersArgs, MeshContext>,
  /** null **/
  animalNft: InContextSdkMethod<Query['animalNft'], QueryanimalNftArgs, MeshContext>,
  /** null **/
  animalNfts: InContextSdkMethod<Query['animalNfts'], QueryanimalNftsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Query['transfer'], QuerytransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Query['transfers'], QuerytransfersArgs, MeshContext>,
  /** null **/
  nftMinted: InContextSdkMethod<Query['nftMinted'], QuerynftMintedArgs, MeshContext>,
  /** null **/
  nftMinteds: InContextSdkMethod<Query['nftMinteds'], QuerynftMintedsArgs, MeshContext>,
  /** null **/
  nftRequested: InContextSdkMethod<Query['nftRequested'], QuerynftRequestedArgs, MeshContext>,
  /** null **/
  nftRequesteds: InContextSdkMethod<Query['nftRequesteds'], QuerynftRequestedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  listing: InContextSdkMethod<Subscription['listing'], SubscriptionlistingArgs, MeshContext>,
  /** null **/
  listings: InContextSdkMethod<Subscription['listings'], SubscriptionlistingsArgs, MeshContext>,
  /** null **/
  auctionRecord: InContextSdkMethod<Subscription['auctionRecord'], SubscriptionauctionRecordArgs, MeshContext>,
  /** null **/
  auctionRecords: InContextSdkMethod<Subscription['auctionRecords'], SubscriptionauctionRecordsArgs, MeshContext>,
  /** null **/
  user: InContextSdkMethod<Subscription['user'], SubscriptionuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Subscription['users'], SubscriptionusersArgs, MeshContext>,
  /** null **/
  nftMetadata: InContextSdkMethod<Subscription['nftMetadata'], SubscriptionnftMetadataArgs, MeshContext>,
  /** null **/
  nftMetadata_collection: InContextSdkMethod<Subscription['nftMetadata_collection'], SubscriptionnftMetadata_collectionArgs, MeshContext>,
  /** null **/
  animalNftUser: InContextSdkMethod<Subscription['animalNftUser'], SubscriptionanimalNftUserArgs, MeshContext>,
  /** null **/
  animalNftUsers: InContextSdkMethod<Subscription['animalNftUsers'], SubscriptionanimalNftUsersArgs, MeshContext>,
  /** null **/
  animalNft: InContextSdkMethod<Subscription['animalNft'], SubscriptionanimalNftArgs, MeshContext>,
  /** null **/
  animalNfts: InContextSdkMethod<Subscription['animalNfts'], SubscriptionanimalNftsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Subscription['transfer'], SubscriptiontransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Subscription['transfers'], SubscriptiontransfersArgs, MeshContext>,
  /** null **/
  nftMinted: InContextSdkMethod<Subscription['nftMinted'], SubscriptionnftMintedArgs, MeshContext>,
  /** null **/
  nftMinteds: InContextSdkMethod<Subscription['nftMinteds'], SubscriptionnftMintedsArgs, MeshContext>,
  /** null **/
  nftRequested: InContextSdkMethod<Subscription['nftRequested'], SubscriptionnftRequestedArgs, MeshContext>,
  /** null **/
  nftRequesteds: InContextSdkMethod<Subscription['nftRequesteds'], SubscriptionnftRequestedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["career"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
