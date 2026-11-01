import React from "react";
import OrderTrackingClient from "./OrderTrackingClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  return <OrderTrackingClient orderId={id} />;
}
