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

export const RECOMMENDED_ACCOUNtS = gql`
query {
  recommendations(address: "$address") {
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
