import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Layout, Page } from "@shopify/polaris";
import LocationList from "../components/LocationList";
import OrderList from "../components/OrderList";

const FETCH_LOCATION_BY_ID = gql`
  query fetchLocationByID($id: ID) {
    location(id: $id) {
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
`;

export default function Index() {
  const [locationID, setLocationID] = useState("");
  const updateLocationID = (id) => {
    setLocationID(id);
  };
  console.log(locationID);
  return (
    <Page>
      <LocationList updateLocationID={updateLocationID} />
      <Page title="Unfulfilled Orders">
        {locationID ? (
          <Query
            query={FETCH_LOCATION_BY_ID}
            variables={{
              id: `${locationID}`,
            }}
          >
            {({ data, loading, error }) => {
              if (loading) return <div>Loading…</div>;
              if (error) return <div>{error.message}</div>;
              return <OrderList locationData={data.location} />;
            }}
          </Query>
        ) : (
          <Layout>
            <p>Select store locations at first.</p>
          </Layout>
        )}
      </Page>
    </Page>
  );
}
