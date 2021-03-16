import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Page, Card, DataTable, Button } from "@shopify/polaris";
import { CSVLink, CSVDownload } from "react-csv";

const FETCH_ORDERS = gql`
  query fetchOrders($query: String!) {
    orders(first: 100, reverse: true, query: $query) {
      edges {
        node {
          id
          legacyResourceId
          phone
          shippingAddress {
            phone
            province
            city
            zip
            address1
            address2
            lastName
            firstName
          }
          name
        }
      }
    }
  }
`;

export default function OrderList({ locationID }) {
  const contentTypes = [
    "numeric",
    "numeric",
    "text",
    "text",
    "text",
    "text",
    "text",
  ];
  const headings = [
    "お届け先電話番号",
    "お届け先郵便番号",
    "お届け先住所１",
    "お届け先住所２",
    "お届け先住所３",
    "お届け先名称１",
    "お届け先名称２",
  ];
  return (
    <Query
      query={FETCH_ORDERS}
      variables={{
        query: `fulfillment_status:unfulfilled AND reference_location_id:${locationID}`,
      }}
    >
      {({ data, loading, error }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{error.message}</div>;
        const rows = data.orders.edges.map((edge) => {
          return [
            edge.node.shippingAddress.phone,
            edge.node.shippingAddress.zip,
            edge.node.shippingAddress.province,
            edge.node.shippingAddress.address1,
            edge.node.shippingAddress.address2,
            edge.node.shippingAddress.lastName +
              " " +
              edge.node.shippingAddress.firstName,
            "",
          ];
        });
        let csvData = rows.concat();
        csvData.unshift(headings);
        return (
          <Page>
            <Card>
              <DataTable
                columnContentTypes={contentTypes}
                headings={headings}
                rows={rows}
              />
            </Card>
            <br />
            <Button plain>
              <CSVLink data={csvData}>Download SAGAWA formatted CSV</CSVLink>
            </Button>
          </Page>
        );
      }}
    </Query>
  );
}
