import React, { useState } from "react";
import { EmptyState, Layout, Page } from "@shopify/polaris";
import OrderList from "../components/OrderList";

export default function Index() {
  const [locationID, setLocationID] = useState("");
  const updateLocationID = (id) => {
    setLocationID(id);
  };
  console.log(locationID);
  return (
    <Page>
      <OrderList updateLocationID={updateLocationID} />
    </Page>
  );
}
