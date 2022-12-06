import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;


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
          __typename @skip(if: true)
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
        __typename @skip(if: true)
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

export const GET_CURRENCIES = gql`
  query GET_CURRENCIES {
    currencies {
      label
      symbol
    }
  }
`;
