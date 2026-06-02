"use client";

import { useParams } from "next/navigation";
import ResourceManager from "@/components/admin/ResourceManager";
import { resources } from "@/admin/resources";

export default function AdminResourcePage() {
  const { resource } = useParams();
  if (!resources[resource]) {
    return <div className="text-muted">Unknown resource: {resource}</div>;
  }
  return <ResourceManager resourceKey={resource} />;
}
