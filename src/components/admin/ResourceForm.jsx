"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Input, Textarea, Select } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Loading";
import ImageUpload from "./ImageUpload";

const CURRENCIES = ["BDT", "USD", "EUR"];
const UNITS = ["per person", "per couple", "per night", "per group"];

// Build the initial editable state from an existing item (or blank for create).
function seedState(fields, item = {}) {
  const s = {};
  fields.forEach((f) => {
    const v = item[f.name];
    switch (f.type) {
      case "i18n":
        s[f.name] = v && typeof v === "object" ? { en: v.en || "", bn: v.bn || "" } : { en: "", bn: "" };
        break;
      case "price":
        s[f.name] = v && typeof v === "object"
          ? { amount: v.amount ?? "", currency: v.currency || "BDT", unit: v.unit || "per person" }
          : { amount: "", currency: "BDT", unit: "per person" };
        break;
      case "boolean":
        s[f.name] = Boolean(v);
        break;
      case "json":
        s[f.name] = v != null ? JSON.stringify(v, null, 2) : "";
        break;
      default:
        s[f.name] = v ?? "";
    }
  });
  return s;
}

// Turn editable state into the API payload (parse json, coerce numbers).
function buildPayload(fields, state) {
  const out = {};
  for (const f of fields) {
    const v = state[f.name];
    if (f.type === "number") {
      if (v !== "" && v != null) out[f.name] = Number(v);
    } else if (f.type === "price") {
      out[f.name] = { amount: Number(v.amount) || 0, currency: v.currency, unit: v.unit };
    } else if (f.type === "json") {
      if (v && v.trim()) out[f.name] = JSON.parse(v); // may throw → caught by caller
    } else if (f.type === "i18n") {
      out[f.name] = v;
    } else if (f.type === "boolean") {
      out[f.name] = v;
    } else {
      out[f.name] = v;
    }
  }
  return out;
}

export default function ResourceForm({ fields, initial, onSubmit, submitting }) {
  const [state, setState] = useState(() => seedState(fields, initial));
  const set = (name, value) => setState((s) => ({ ...s, [name]: value }));

  const submit = (e) => {
    e.preventDefault();
    // Required validation
    for (const f of fields) {
      if (f.required) {
        const v = state[f.name];
        const empty = f.type === "i18n" ? !v?.en : !v;
        if (empty) return toast.error(`${f.label} is required`);
      }
    }
    let payload;
    try {
      payload = buildPayload(fields, state);
    } catch {
      return toast.error("Invalid JSON in one of the fields — please fix it.");
    }
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {fields.map((f) => {
        const v = state[f.name];
        if (f.type === "i18n") {
          const C = f.textarea ? Textarea : Input;
          return (
            <div key={f.name} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <C label={`${f.label} (EN)`} value={v.en} onChange={(e) => set(f.name, { ...v, en: e.target.value })} />
              <C label={`${f.label} (বাং)`} value={v.bn} onChange={(e) => set(f.name, { ...v, bn: e.target.value })} />
            </div>
          );
        }
        if (f.type === "price") {
          return (
            <div key={f.name}>
              <span className="mb-1.5 block text-sm font-medium text-body">{f.label}</span>
              <div className="grid grid-cols-3 gap-2">
                <Input type="number" placeholder="Amount" value={v.amount} onChange={(e) => set(f.name, { ...v, amount: e.target.value })} />
                <Select value={v.currency} onChange={(e) => set(f.name, { ...v, currency: e.target.value })}>
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                </Select>
                <Select value={v.unit} onChange={(e) => set(f.name, { ...v, unit: e.target.value })}>
                  {UNITS.map((u) => <option key={u}>{u}</option>)}
                </Select>
              </div>
            </div>
          );
        }
        if (f.type === "select") {
          return (
            <Select key={f.name} label={f.label} value={v} onChange={(e) => set(f.name, e.target.value)}>
              <option value="">— select —</option>
              {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </Select>
          );
        }
        if (f.type === "boolean") {
          return (
            <label key={f.name} className="flex items-center gap-2 text-sm font-medium text-body">
              <input type="checkbox" checked={v} onChange={(e) => set(f.name, e.target.checked)} className="h-4 w-4 accent-[var(--color-brand)]" />
              {f.label}
            </label>
          );
        }
        if (f.type === "image") {
          return <ImageUpload key={f.name} label={f.label} value={v} onChange={(url) => set(f.name, url)} />;
        }
        if (f.type === "json") {
          return <Textarea key={f.name} label={f.label} rows={4} className="font-mono text-xs" value={v} onChange={(e) => set(f.name, e.target.value)} />;
        }
        if (f.type === "number") {
          return <Input key={f.name} type="number" label={f.label} value={v} onChange={(e) => set(f.name, e.target.value)} />;
        }
        return <Input key={f.name} label={f.label} value={v} onChange={(e) => set(f.name, e.target.value)} required={f.required} />;
      })}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? <><Spinner /> Saving…</> : "Save"}
        </Button>
      </div>
    </form>
  );
}
