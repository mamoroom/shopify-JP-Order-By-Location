import React, { useState } from "react";
import { Layout, Page } from "@shopify/polaris";
import LocationList from "../components/LocationList";
import OrderList from "../components/OrderList";

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
          <OrderList locationID={locationID} />
        ) : (
          <Layout>
            <p>Select store locations at first.</p>
          </Layout>
        )}
      </Page>
    </Page>
  );
}
