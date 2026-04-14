"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdOutlineMail, MdOutlinePhoneIphone } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
};

const cityOptions = ["Detroit", "Montreal", "Toronto", "Washington DC"];

export default function EarlybirdForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const loadingToastId = toast.loading("Submitting your details...");

    try {
      const response = await fetch("/api/earlybird", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.details || result?.error || "Something went wrong."
        );
      }

      toast.dismiss(loadingToastId);
      toast.success("🎉 You’re officially on the guest list.", {
        duration: 4000,
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        city: "",
      });
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit form.",
        {
          duration: 5000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.14),_transparent_30%)]" />
      <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:grid-cols-2">
          <div className="border-b border-white/10 bg-neutral-950/70 px-6 py-10 sm:px-8 md:border-b-0 md:border-r md:px-10 md:py-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-pink-300">
              <HiOutlineSparkles className="text-sm" />
              Exclusive Access
            </div>

            <h2 className="mt-6 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Enter the night before everyone else.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-neutral-300 sm:text-base">
              Join the Yalla Habibi guest list for first access to exclusive
              nightlife events, premium drops, city launches, and VIP
              experiences.
            </p>

            <div className="mt-8 space-y-4 text-sm text-neutral-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Priority invites to curated nightlife events
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Early updates for new city launches
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Guest list access, VIP drops, and exclusive announcements
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xl font-semibold text-white">4</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
                  Cities
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xl font-semibold text-white">VIP</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
                  Access
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xl font-semibold text-white">Night</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
                  Culture
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-10 text-neutral-900 sm:px-8 md:px-10 md:py-12">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-pink-500">
                Guest List Registration
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-neutral-950">
                Reserve your spot
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Fill in your details to get event announcements, early access,
                and city-specific invites.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Email
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 px-4 py-3 transition focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500/20">
                  <MdOutlineMail className="text-lg text-neutral-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Phone Number
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 px-4 py-3 transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
                  <MdOutlinePhoneIphone className="text-lg text-neutral-400" />
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  City
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 px-4 py-3 transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
                  <CiLocationOn className="text-xl text-neutral-400" />
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none"
                  >
                    <option value="">Select a city</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-pink-50 cursor-pointer shadow-[0_10px_30px_rgba(236,72,153,0.25)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Join the Guest List"}
              </button>

              <p className="text-center text-xs leading-5 text-neutral-500">
                By submitting, you agree to receive event updates, early access
                invites, and nightlife announcements from Yalla Habibi.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}