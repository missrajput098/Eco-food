import React from "react";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS, getProductByIdOrSlug, getRelatedProducts } from "@/data/mockData";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductByIdOrSlug(id) || ALL_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    // If not found by direct ID, try first product as graceful fallback or notFound
    return notFound();
  }

  const related = getRelatedProducts(product.id, 4);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
