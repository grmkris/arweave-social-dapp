import { gql } from "@apollo/client";

export const POPULAR_ACCOUNTS = gql`
  query {
    popular {
      list {
        address
        ens
        followerCount
        followStatus {
          isFollowed
          isFollowing
        }
      }
    }
  }
`;

export const RECOMMENDED_ACCOUNTS = gql`
  query {
    recommendations(address: "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E") {
      data {
        list {
          address
          ens
          followerCount
          recommendationReason
          displayName
        }
      }
    }
  }
`;

export type RecommendedAccount = {
  address: string,
  ens: string,
  followerCount: string,
  recommendationReason: string,
  displayName: string
};


export type PopularAccount = {
  address : string,
  ens : string,
  followerCount : string,
  followStatus : {
    isFollowed : boolean,
    isFollowing : boolean
  },
};
