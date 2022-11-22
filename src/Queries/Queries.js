import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

// export const GET_PRODUCTS = gql`
//   {
//     categories {
//       name
//       products {
//         id
//         name
//         inStock
//         gallery
//         prices {
//           currency {
//             label
//             symbol
//           }
//           amount
//         }
//         brand
//       }
//     }
//   }
// `;

// export const GET_PRODUCTS = gql`
//   {
//     categories {
//       name
//       products {
//         id
//         name
//         inStock
//         gallery
//         brand
//       }
//     }
//   }
// `;

export const GET_PRODUCTS_FROM_CATEGORY = gql`
  query GET_PRODUCTS_FROM_CATEGORY($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        gallery
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GET_PRODUCT_DETAILS = gql`
  query GET_PRODUCT_DETAILS($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      gallery
      brand
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;
