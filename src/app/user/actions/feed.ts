"use server";

import { Post } from "@/lib/model";
import { http } from "@/network/http";

export async function getFeeds() {
  const response = await http<Post[]>("post");

  if (!response.ok) {
    throw new Error("Failed to fetch feeds");
  }

  return response.data;
}
