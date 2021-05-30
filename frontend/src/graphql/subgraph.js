import { gql } from "apollo-boost";

// See more example queries on https://thegraph.com/explorer/subgraph/paulrberg/create-eth-app
const GET_ADDRESS = gql`
  query Address($name: String){
    domains(where: {name:$name}) {
      resolvedAddress {
        id
      }
    }
  }
`;

export default GET_ADDRESS;
