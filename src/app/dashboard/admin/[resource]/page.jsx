"use client";

import { useParams } from "next/navigation";
import ResourceTable from "@/components/admin/ResourceTable";
import ResourceCards from "@/components/admin/ResourceCards";
import { resources } from "@/admin/resources";

export default function AdminResourcePage() {
  const { resource } = useParams();
  const cfg = resources[resource];
  if (!cfg) {
    return <div className="text-muted">Unknown resource: {resource}</div>;
  }
  return cfg.cardView ? (
    <ResourceCards resourceKey={resource} />
  ) : (
    <ResourceTable resourceKey={resource} />
  );
}
