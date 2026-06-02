"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import useAxios from "./useAxios";

/**
 * Generic React Query hooks over the public content API. One pair covers every
 * catalogue resource (packages, destinations, hajj, visas, hotels, air-tickets,
 * blogs, banners), so feature components stay tiny:
 *
 *   const { data, isLoading } = useContentList("packages", { type: "honeymoon" });
 *   const { data: pkg } = useContentItem("packages", slug);
 */
export function useContentList(resource, params = {}) {
  const axios = useAxios();
  return useQuery({
    queryKey: [resource, "list", params],
    queryFn: async () => {
      const { data } = await axios.get(`/${resource}`, { params });
      return data; // { data: [...], pagination: {...} }
    },
  });
}

export function useContentItem(resource, idOrSlug) {
  const axios = useAxios();
  return useQuery({
    queryKey: [resource, "item", idOrSlug],
    enabled: Boolean(idOrSlug),
    queryFn: async () => {
      const { data } = await axios.get(`/${resource}/${idOrSlug}`);
      return data;
    },
  });
}

export function useSettings() {
  const axios = useAxios();
  return useQuery({
    queryKey: ["settings"],
    staleTime: 30 * 60 * 1000,
    queryFn: async () => {
      const { data } = await axios.get("/settings");
      return data;
    },
  });
}

export function useReviews(refType) {
  const axios = useAxios();
  return useQuery({
    queryKey: ["reviews", refType],
    queryFn: async () => {
      const { data } = await axios.get("/reviews", {
        params: refType ? { refType } : {},
      });
      return data.data || [];
    },
  });
}

/** Public lead form submission — used by every "Inquire / Book" form. */
export function useCreateInquiry() {
  const axios = useAxios();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post("/inquiries", payload);
      return data;
    },
  });
}
