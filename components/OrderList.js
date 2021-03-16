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

export default function OrderList({ locationData }) {
  const contentTypes = [
    "numeric",
    "numeric",
    "text",
    "text",
    "text",
    "text",
    "text",
    "numeric",
    "text",
    "text",
    "numeric",
    "numeric",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "numeric",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
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
    "お客様管理ナンバー",
    "お客様コード",
    "部署・担当者",
    "荷送人電話番号",
    "ご依頼主郵便番号",
    "ご依頼主住所１",
    "ご依頼主住所２",
    "ご依頼主名称１",
    "ご依頼主名称２",
    "品名１",
    "品名２",
    "品名３",
    "品名４",
    "品名５",
    "出荷個数",
    "便種（スピードで選択）",
    "便種（商品）",
    "配達日",
    "配達指定時間帯",
    "配達指定時間（時分）",
    "代引金額",
    "消費税",
    "決済種別",
    "保険金額",
    "保険金額印字",
    "指定シール①",
    "指定シール②",
    "指定シール③",
    "営業店止め",
    "ＳＲＣ区分",
    "営業店コード",
    "元着区分",
  ];
  return (
    <Query
      query={FETCH_ORDERS}
      variables={{
        query: `fulfillment_status:unfulfilled AND reference_location_id:${locationData.legacyResourceId}`,
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
            edge.node.legacyResourceId,
            "",
            "",
            locationData.address.phone,
            locationData.address.phone,
            locationData.address.zip,
            locationData.address.address1 + locationData.address.address2,
            locationData.name,
            "",
            "洋服",
            "",
            "",
            "",
            "",
            1,
            "0",
            "0",
            "",
            "",
            "",
            "",
            "",
            "0",
            "",
            "0",
            "",
            "11",
            "",
            "0",
            "0",
            "",
            "1",
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
