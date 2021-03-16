import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Card, OptionList } from "@shopify/polaris";

const FETCH_LOCATIONS = gql`
  query fetchLocations {
    locations(first: 10) {
      edges {
        node {
          id
          legacyResourceId
          name
          address {
            address1
            address2
            city
            country
            countryCode
            latitude
            longitude
            phone
            province
            provinceCode
            zip
          }
        }
      }
    }
  }
`;

// class OrderList extends React.Component {
export default function OrderList({ updateLocationID }) {
  const [selected, setSelected] = useState([]);
  return (
    <Query query={FETCH_LOCATIONS}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{error.message}</div>;
        updateLocationID(selected[0]);
        const options = data.locations.edges.map((edge) => {
          return {
            value: edge.node.legacyResourceId,
            label: edge.node.name,
          };
        });
        return (
          <Card>
            <OptionList
              title="Store Locations"
              onChange={setSelected}
              options={options}
              selected={selected}
            />
          </Card>
        );
      }}
    </Query>
  );
}
