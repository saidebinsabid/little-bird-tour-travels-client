"use client";

import { useParams } from "next/navigation";
import ResourceFormView from "@/components/admin/ResourceFormView";
import { resources } from "@/admin/resources";

export default function AdminResourceNewPage() {
  const { resource } = useParams();
  if (!resources[resource]) {
    return <div className="text-muted">Unknown resource: {resource}</div>;
  }
  return <ResourceFormView resourceKey={resource} />;
}
