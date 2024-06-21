// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { CareerTypes } from './sources/career/types';
import * as importedModule$0 from "./sources/career/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_interval: Aggregation_interval;
  AnimalNftUser: ResolverTypeWrapper<AnimalNftUser>;
  AnimalNftUser_filter: AnimalNftUser_filter;
  AnimalNftUser_orderBy: AnimalNftUser_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  Transfer: ResolverTypeWrapper<Transfer>;
  Transfer_filter: Transfer_filter;
  Transfer_orderBy: Transfer_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  animalNft: ResolverTypeWrapper<animalNft>;
  animalNft_filter: animalNft_filter;
  animalNft_orderBy: animalNft_orderBy;
  auctionRecord: ResolverTypeWrapper<auctionRecord>;
  auctionRecord_filter: auctionRecord_filter;
  auctionRecord_orderBy: auctionRecord_orderBy;
  listing: ResolverTypeWrapper<listing>;
  listingStatus: listingStatus;
  listing_filter: listing_filter;
  listing_orderBy: listing_orderBy;
  nftMetadata: ResolverTypeWrapper<nftMetadata>;
  nftMetadata_filter: nftMetadata_filter;
  nftMetadata_orderBy: nftMetadata_orderBy;
  nftMinted: ResolverTypeWrapper<nftMinted>;
  nftMinted_filter: nftMinted_filter;
  nftMinted_orderBy: nftMinted_orderBy;
  nftRequested: ResolverTypeWrapper<nftRequested>;
  nftRequested_filter: nftRequested_filter;
  nftRequested_orderBy: nftRequested_orderBy;
  user: ResolverTypeWrapper<user>;
  user_filter: user_filter;
  user_orderBy: user_orderBy;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AnimalNftUser: AnimalNftUser;
  AnimalNftUser_filter: AnimalNftUser_filter;
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  Timestamp: Scalars['Timestamp']['output'];
  Transfer: Transfer;
  Transfer_filter: Transfer_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
  animalNft: animalNft;
  animalNft_filter: animalNft_filter;
  auctionRecord: auctionRecord;
  auctionRecord_filter: auctionRecord_filter;
  listing: listing;
  listing_filter: listing_filter;
  nftMetadata: nftMetadata;
  nftMetadata_filter: nftMetadata_filter;
  nftMinted: nftMinted;
  nftMinted_filter: nftMinted_filter;
  nftRequested: nftRequested;
  nftRequested_filter: nftRequested_filter;
  user: user;
  user_filter: user_filter;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AnimalNftUserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AnimalNftUser'] = ResolversParentTypes['AnimalNftUser']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  operators?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  nfts?: Resolver<Maybe<Array<ResolversTypes['animalNft']>>, ParentType, ContextType, RequireFields<AnimalNftUsernftsArgs, 'skip' | 'first'>>;
  requests?: Resolver<Maybe<Array<ResolversTypes['nftRequested']>>, ParentType, ContextType, RequireFields<AnimalNftUserrequestsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  listing?: Resolver<Maybe<ResolversTypes['listing']>, ParentType, ContextType, RequireFields<QuerylistingArgs, 'id' | 'subgraphError'>>;
  listings?: Resolver<Array<ResolversTypes['listing']>, ParentType, ContextType, RequireFields<QuerylistingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  auctionRecord?: Resolver<Maybe<ResolversTypes['auctionRecord']>, ParentType, ContextType, RequireFields<QueryauctionRecordArgs, 'id' | 'subgraphError'>>;
  auctionRecords?: Resolver<Array<ResolversTypes['auctionRecord']>, ParentType, ContextType, RequireFields<QueryauctionRecordsArgs, 'skip' | 'first' | 'subgraphError'>>;
  user?: Resolver<Maybe<ResolversTypes['user']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id' | 'subgraphError'>>;
  users?: Resolver<Array<ResolversTypes['user']>, ParentType, ContextType, RequireFields<QueryusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  nftMetadata?: Resolver<Maybe<ResolversTypes['nftMetadata']>, ParentType, ContextType, RequireFields<QuerynftMetadataArgs, 'id' | 'subgraphError'>>;
  nftMetadata_collection?: Resolver<Array<ResolversTypes['nftMetadata']>, ParentType, ContextType, RequireFields<QuerynftMetadata_collectionArgs, 'skip' | 'first' | 'subgraphError'>>;
  animalNftUser?: Resolver<Maybe<ResolversTypes['AnimalNftUser']>, ParentType, ContextType, RequireFields<QueryanimalNftUserArgs, 'id' | 'subgraphError'>>;
  animalNftUsers?: Resolver<Array<ResolversTypes['AnimalNftUser']>, ParentType, ContextType, RequireFields<QueryanimalNftUsersArgs, 'skip' | 'first' | 'subgraphError'>>;
  animalNft?: Resolver<Maybe<ResolversTypes['animalNft']>, ParentType, ContextType, RequireFields<QueryanimalNftArgs, 'id' | 'subgraphError'>>;
  animalNfts?: Resolver<Array<ResolversTypes['animalNft']>, ParentType, ContextType, RequireFields<QueryanimalNftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transfer?: Resolver<Maybe<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransferArgs, 'id' | 'subgraphError'>>;
  transfers?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  nftMinted?: Resolver<Maybe<ResolversTypes['nftMinted']>, ParentType, ContextType, RequireFields<QuerynftMintedArgs, 'id' | 'subgraphError'>>;
  nftMinteds?: Resolver<Array<ResolversTypes['nftMinted']>, ParentType, ContextType, RequireFields<QuerynftMintedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nftRequested?: Resolver<Maybe<ResolversTypes['nftRequested']>, ParentType, ContextType, RequireFields<QuerynftRequestedArgs, 'id' | 'subgraphError'>>;
  nftRequesteds?: Resolver<Array<ResolversTypes['nftRequested']>, ParentType, ContextType, RequireFields<QuerynftRequestedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  listing?: SubscriptionResolver<Maybe<ResolversTypes['listing']>, "listing", ParentType, ContextType, RequireFields<SubscriptionlistingArgs, 'id' | 'subgraphError'>>;
  listings?: SubscriptionResolver<Array<ResolversTypes['listing']>, "listings", ParentType, ContextType, RequireFields<SubscriptionlistingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  auctionRecord?: SubscriptionResolver<Maybe<ResolversTypes['auctionRecord']>, "auctionRecord", ParentType, ContextType, RequireFields<SubscriptionauctionRecordArgs, 'id' | 'subgraphError'>>;
  auctionRecords?: SubscriptionResolver<Array<ResolversTypes['auctionRecord']>, "auctionRecords", ParentType, ContextType, RequireFields<SubscriptionauctionRecordsArgs, 'skip' | 'first' | 'subgraphError'>>;
  user?: SubscriptionResolver<Maybe<ResolversTypes['user']>, "user", ParentType, ContextType, RequireFields<SubscriptionuserArgs, 'id' | 'subgraphError'>>;
  users?: SubscriptionResolver<Array<ResolversTypes['user']>, "users", ParentType, ContextType, RequireFields<SubscriptionusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  nftMetadata?: SubscriptionResolver<Maybe<ResolversTypes['nftMetadata']>, "nftMetadata", ParentType, ContextType, RequireFields<SubscriptionnftMetadataArgs, 'id' | 'subgraphError'>>;
  nftMetadata_collection?: SubscriptionResolver<Array<ResolversTypes['nftMetadata']>, "nftMetadata_collection", ParentType, ContextType, RequireFields<SubscriptionnftMetadata_collectionArgs, 'skip' | 'first' | 'subgraphError'>>;
  animalNftUser?: SubscriptionResolver<Maybe<ResolversTypes['AnimalNftUser']>, "animalNftUser", ParentType, ContextType, RequireFields<SubscriptionanimalNftUserArgs, 'id' | 'subgraphError'>>;
  animalNftUsers?: SubscriptionResolver<Array<ResolversTypes['AnimalNftUser']>, "animalNftUsers", ParentType, ContextType, RequireFields<SubscriptionanimalNftUsersArgs, 'skip' | 'first' | 'subgraphError'>>;
  animalNft?: SubscriptionResolver<Maybe<ResolversTypes['animalNft']>, "animalNft", ParentType, ContextType, RequireFields<SubscriptionanimalNftArgs, 'id' | 'subgraphError'>>;
  animalNfts?: SubscriptionResolver<Array<ResolversTypes['animalNft']>, "animalNfts", ParentType, ContextType, RequireFields<SubscriptionanimalNftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transfer?: SubscriptionResolver<Maybe<ResolversTypes['Transfer']>, "transfer", ParentType, ContextType, RequireFields<SubscriptiontransferArgs, 'id' | 'subgraphError'>>;
  transfers?: SubscriptionResolver<Array<ResolversTypes['Transfer']>, "transfers", ParentType, ContextType, RequireFields<SubscriptiontransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  nftMinted?: SubscriptionResolver<Maybe<ResolversTypes['nftMinted']>, "nftMinted", ParentType, ContextType, RequireFields<SubscriptionnftMintedArgs, 'id' | 'subgraphError'>>;
  nftMinteds?: SubscriptionResolver<Array<ResolversTypes['nftMinted']>, "nftMinteds", ParentType, ContextType, RequireFields<SubscriptionnftMintedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nftRequested?: SubscriptionResolver<Maybe<ResolversTypes['nftRequested']>, "nftRequested", ParentType, ContextType, RequireFields<SubscriptionnftRequestedArgs, 'id' | 'subgraphError'>>;
  nftRequesteds?: SubscriptionResolver<Array<ResolversTypes['nftRequested']>, "nftRequesteds", ParentType, ContextType, RequireFields<SubscriptionnftRequestedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transfer'] = ResolversParentTypes['Transfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type animalNftResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['animalNft'] = ResolversParentTypes['animalNft']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  approved?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['AnimalNftUser'], ParentType, ContextType>;
  metaData?: Resolver<Maybe<ResolversTypes['nftMetadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type auctionRecordResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['auctionRecord'] = ResolversParentTypes['auctionRecord']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nftAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  seller?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  settleTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['listingStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type listingResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['listing'] = ResolversParentTypes['listing']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nftAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  expiredTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  seller?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type nftMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['nftMetadata'] = ResolversParentTypes['nftMetadata']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  json?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type nftMintedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['nftMinted'] = ResolversParentTypes['nftMinted']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  minter?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  species?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  requestId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type nftRequestedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['nftRequested'] = ResolversParentTypes['nftRequested']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  requestId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  requester?: Resolver<ResolversTypes['AnimalNftUser'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type userResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['user'] = ResolversParentTypes['user']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  AnimalNftUser?: AnimalNftUserResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Transfer?: TransferResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
  animalNft?: animalNftResolvers<ContextType>;
  auctionRecord?: auctionRecordResolvers<ContextType>;
  listing?: listingResolvers<ContextType>;
  nftMetadata?: nftMetadataResolvers<ContextType>;
  nftMinted?: nftMintedResolvers<ContextType>;
  nftRequested?: nftRequestedResolvers<ContextType>;
  user?: userResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = CareerTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/career/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const careerTransforms = [];
const additionalTypeDefs = [] as any[];
const careerHandler = new GraphqlHandler({
              name: "career",
              config: {"endpoint":"https://api.studio.thegraph.com/query/74237/career/v0.0.4"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("career"),
              logger: logger.child("career"),
              importFn,
            });
sources[0] = {
          name: 'career',
          handler: careerHandler,
          transforms: careerTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));