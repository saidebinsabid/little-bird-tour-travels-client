"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { useI18n } from "@/i18n/useI18n";
import Rating from "@/components/ui/Rating";
import Button from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Field";
import { formatDate } from "@/utils/format";

export default function ReviewsSection({ refId, refType = "packages" }) {
  const { t, lang } = useI18n();
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const qc = useQueryClient();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data } = useQuery({
    queryKey: ["reviews", refType, refId],
    enabled: Boolean(refId),
    queryFn: async () => (await axiosPublic.get("/reviews", { params: { refId, refType } })).data,
  });
  const reviews = data?.data || [];

  const submit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error(t("form.required"));
    setSubmitting(true);
    try {
      await axiosSecure.post("/reviews", { refId, refType, rating, comment });
      toast.success(lang === "bn" ? "রিভিউ জমা হয়েছে, অনুমোদনের অপেক্ষায়।" : "Review submitted for approval.");
      setComment("");
      qc.invalidateQueries({ queryKey: ["reviews", refType, refId] });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-ink">{lang === "bn" ? "রিভিউ" : "Reviews"}</h2>

      <div className="mt-4 space-y-3">
        {reviews.length ? reviews.map((r) => (
          <div key={r._id} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <Rating value={r.rating} />
              <span className="text-sm font-semibold text-ink">{r.author?.name}</span>
              <span className="text-xs text-muted">{formatDate(r.createdAt)}</span>
            </div>
            <p className="mt-2 text-body">{r.comment}</p>
          </div>
        )) : <p className="text-sm text-muted">{lang === "bn" ? "এখনও কোনো রিভিউ নেই।" : "No reviews yet."}</p>}
      </div>

      {/* Submit */}
      <div className="mt-6 rounded-xl bg-surface p-5">
        {user ? (
          <form onSubmit={submit} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-body">{lang === "bn" ? "রেটিং:" : "Your rating:"}</span>
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setRating(n)} className={`text-2xl ${n <= rating ? "text-amber-400" : "text-slate-300"}`}>★</button>
              ))}
            </div>
            <Textarea placeholder={lang === "bn" ? "আপনার অভিজ্ঞতা লিখুন..." : "Share your experience..."} value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button type="submit" disabled={submitting}>{submitting ? t("common.sending") : (lang === "bn" ? "রিভিউ দিন" : "Submit Review")}</Button>
          </form>
        ) : (
          <p className="text-sm text-body">
            <Link href="/auth/login" className="font-semibold text-brand hover:underline">{t("nav.login")}</Link>{" "}
            {lang === "bn" ? "করে রিভিউ দিন।" : "to leave a review."}
          </p>
        )}
      </div>
    </section>
  );
}
