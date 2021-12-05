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
