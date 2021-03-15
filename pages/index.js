import React from "react";
import { EmptyState, Layout, Page } from "@shopify/polaris";

class Index extends React.Component {
  state = { open: false };
  render() {
    return (
      <Page>
        <Layout></Layout>
      </Page>
    );
  }
  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);

    this.setState({ open: false });
    console.log(idsFromResources);
  };
}

export default Index;
