import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Card, OptionList } from "@shopify/polaris";

const FETCH_LOCATIONS = gql`
  query fetchLocations {
    locations(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export default function LocationList({ updateLocationID }) {
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    updateLocationID(selected[0]);
  });
  return (
    <Query query={FETCH_LOCATIONS}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{error.message}</div>;
        const options = data.locations.edges.map((edge) => {
          return {
            value: edge.node.id,
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
