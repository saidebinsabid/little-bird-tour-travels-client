"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Input, Textarea } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/admin/ImageUpload";
import { PageLoader, Spinner } from "@/components/ui/Loading";

export default function SettingsAdminPage() {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => (await axiosSecure.get("/settings")).data,
  });

  const [s, setS] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (data) setS(data); }, [data]);

  if (isLoading || !s) return <PageLoader />;

  const setIn = (path, value) => {
    setS((prev) => {
      const next = structuredClone(prev);
      let o = next;
      for (let i = 0; i < path.length - 1; i++) {
        o[path[i]] = o[path[i]] || {};
        o = o[path[i]];
      }
      o[path[path.length - 1]] = value;
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      await axiosSecure.patch("/settings", {
        identity: s.identity, contact: s.contact, social: s.social, seo: s.seo, licenses: s.licenses,
      });
      toast.success("Settings saved");
      qc.invalidateQueries({ queryKey: ["settings"] });
    } catch (e) { toast.error(e?.response?.data?.message || "Failed"); }
    finally { setSaving(false); }
  };

  const Section = ({ title, children }) => (
    <div className="card-base p-6 shadow-[var(--shadow-card)]">
      <h2 className="mb-4 text-lg font-bold text-ink">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">Site Settings</h1>
        <p className="text-sm text-muted">Update your site identity, contact details, social links and SEO.</p>
      </div>

      <div className="space-y-6">
        <Section title="Identity">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Name (EN)" value={s.identity?.name?.en || ""} onChange={(e) => setIn(["identity", "name", "en"], e.target.value)} />
            <Input label="Name (বাং)" value={s.identity?.name?.bn || ""} onChange={(e) => setIn(["identity", "name", "bn"], e.target.value)} />
            <Input label="Tagline (EN)" value={s.identity?.tagline?.en || ""} onChange={(e) => setIn(["identity", "tagline", "en"], e.target.value)} />
            <Input label="Tagline (বাং)" value={s.identity?.tagline?.bn || ""} onChange={(e) => setIn(["identity", "tagline", "bn"], e.target.value)} />
          </div>
          <ImageUpload label="Logo" value={s.identity?.logo} onChange={(url) => setIn(["identity", "logo"], url)} />
        </Section>

        <Section title="Contact">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Phone" value={s.contact?.phone || ""} onChange={(e) => setIn(["contact", "phone"], e.target.value)} />
            <Input label="WhatsApp (e.g. 8801XXXXXXXXX)" value={s.contact?.whatsapp || ""} onChange={(e) => setIn(["contact", "whatsapp"], e.target.value)} />
            <Input label="Email" value={s.contact?.email || ""} onChange={(e) => setIn(["contact", "email"], e.target.value)} />
            <Input label="Office hours" value={s.contact?.officeHours || ""} onChange={(e) => setIn(["contact", "officeHours"], e.target.value)} />
            <Input label="Address (EN)" value={s.contact?.address?.en || ""} onChange={(e) => setIn(["contact", "address", "en"], e.target.value)} />
            <Input label="Address (বাং)" value={s.contact?.address?.bn || ""} onChange={(e) => setIn(["contact", "address", "bn"], e.target.value)} />
          </div>
          <Textarea label="Google Map embed (iframe HTML)" rows={3} value={s.contact?.mapEmbed || ""} onChange={(e) => setIn(["contact", "mapEmbed"], e.target.value)} />
        </Section>

        <Section title="Social Links">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Facebook" value={s.social?.facebook || ""} onChange={(e) => setIn(["social", "facebook"], e.target.value)} />
            <Input label="Instagram" value={s.social?.instagram || ""} onChange={(e) => setIn(["social", "instagram"], e.target.value)} />
            <Input label="YouTube" value={s.social?.youtube || ""} onChange={(e) => setIn(["social", "youtube"], e.target.value)} />
            <Input label="LinkedIn" value={s.social?.linkedin || ""} onChange={(e) => setIn(["social", "linkedin"], e.target.value)} />
          </div>
        </Section>

        <Section title="SEO">
          <Input label="Default title" value={s.seo?.title || ""} onChange={(e) => setIn(["seo", "title"], e.target.value)} />
          <Textarea label="Meta description" rows={2} value={s.seo?.description || ""} onChange={(e) => setIn(["seo", "description"], e.target.value)} />
          <Input label="Keywords" value={s.seo?.keywords || ""} onChange={(e) => setIn(["seo", "keywords"], e.target.value)} />
        </Section>

        {/* Save — at the bottom, full-width bar */}
        <div className="flex justify-end border-t border-slate-200 pt-5">
          <Button onClick={save} size="lg" disabled={saving}>
            {saving ? <><Spinner /> Saving…</> : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
