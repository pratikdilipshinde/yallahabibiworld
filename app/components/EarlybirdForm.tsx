"use client";

import { useState } from "react";
import toast from "react-hot-toast";

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
      toast.success("🎉 Your details have been submitted successfully.", {
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
    <section className="bg-white px-4 py-16 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:grid-cols-2">
          <div className="bg-neutral-950 px-6 py-10 text-white sm:px-8 md:px-10">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">
              Early Access
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Join the waitlist and stay ahead.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-neutral-300 sm:text-base">
              Submit your details to receive updates, launch news, and early
              access information for your city.
            </p>

            <div className="mt-8 space-y-4 text-sm text-neutral-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Fast signup experience
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                City-based registration tracking
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Stored directly in Google Sheets
              </div>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-8 md:px-10">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold">Register your interest</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Fill out the form below and we’ll keep you updated.
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
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
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
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
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
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-neutral-900"
                >
                  <option value="">Select a city</option>
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-2xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}