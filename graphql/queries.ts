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
  query ($address: String!) {
    recommendations(address: $address) {
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

export const ACCOUNT_INFORMATION = gql`
  query ($address: String!) {
    identity(address: $address) {
      address
      ens
      displayName
      social {
        twitter
      }
      followerCount
      followingCount
      followings {
        list {
          address
          ens
          alias
          namespace
        }
      }
      followers {
        list {
          address
          ens
          alias
          namespace
        }
      }
      friends {
        list {
          address
          ens
          alias
          namespace
        }
      }
    }
  }
`;

export type RecommendedAccount = {
  address: string;
  ens: string;
  followerCount: string;
  recommendationReason: string;
  displayName: string;
};

export type PopularAccount = {
  address: string;
  ens: string;
  followerCount: string;
  followStatus: {
    isFollowed: boolean;
    isFollowing: boolean;
  };
};

export type AccountInformation = {
  address: string;
  ens: string;
  displayName: string;
  social: {
    twitter: string;
  };
  followerCount: number;
  followingCount: number;
  followings: {
    list: {
      address: string;
      ens: string;
      alias: string;
      namespace: string;
    };
  };
  followers: {
    list: {
      address: string;
      ens: string;
      alias: string;
      namespace: string;
    };
  };
  friends: {
    list: {
      address: string;
      ens: string;
      alias: string;
      namespace: string;
    };
  };
};
