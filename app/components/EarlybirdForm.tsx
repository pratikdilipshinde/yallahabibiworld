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
    <section className="relative overflow-hidden px-4 py-5 md:py-12 text-white sm:px-6 lg:px-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/earlybird-bg.jpg"
          alt="Event background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(34,211,238,0.14),_transparent_28%)]" />
      </div>

      {/* Glow Blobs */}
      <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/20 bg-white/8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm md:grid-cols-2">
          
          {/* Left Form */}
          <div className="bg-white/18 px-6 py-10 backdrop-blur-2xl sm:px-8 md:px-10 md:py-12">
            <div className="">
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/75">
                  Early Bird Registration
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-white">
                  Reserve your spot
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Fill in your details to get DYSTINCT event early access tickets
                   and city-specific invites. Locations coming soon.

                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-white/85"
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
                      placeholder="Enter first name"
                      className="w-full rounded-2xl border border-white/70 bg-white/30 px-4 py-3 text-white placeholder:text-white/85 outline-none backdrop-blur-3xl transition focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-white/85"
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
                      placeholder="Enter last name"
                      className="w-full rounded-2xl border border-white/70 bg-white/30 px-4 py-3 text-white placeholder:text-white/85 outline-none backdrop-blur-3xl transition focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-white/85"
                  >
                    Email
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/30 px-4 py-3 backdrop-blur-3xl transition focus-within:border-white/40 focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-white/20">
                    <MdOutlineMail className="text-lg text-white/85" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent text-white placeholder:text-white/85 outline-none"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-sm font-medium text-white/85"
                  >
                    Phone Number
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/30 px-4 py-3 backdrop-blur-3xl transition focus-within:border-white/40 focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-white/20">
                    <MdOutlinePhoneIphone className="text-lg text-white/85" />
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent text-white placeholder:text-white/85 outline-none"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-white/85"
                  >
                    City
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/30 px-4 py-3 backdrop-blur-3xl transition focus-within:border-white/40 focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-white/20">
                    <CiLocationOn className="text-xl text-white/85" />
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent text-white outline-none"
                    >
                      <option value="" className="text-black">
                        Select a city
                      </option>
                      {cityOptions.map((city) => (
                        <option key={city} value={city} className="text-black">
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl cursor-pointer bg-gradient-to-r from-pink-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,255,255,0.18)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Join the List"}
                </button>

                <p className="text-center text-xs leading-5 text-white/60">
                  By submitting, you agree to receive event updates, early
                  access invites, and nightlife announcements from Yalla Habibi.
                </p>
              </form>
            </div>
          </div>
          {/* Right Content */}
          <div className="border-b border-white/10 bg-black/20 px-6 py-10 backdrop-blur-xl sm:px-8 md:border-b-0 md:border-r md:px-10 md:py-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-white/90 backdrop-blur-xl">
              <HiOutlineSparkles className="text-sm" />
              Exclusive
            </div>

            <h2 className="mt-6 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Enter the night before everyone else.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/75 sm:text-base">
              Join the Yalla Habibi early bird list for first access to
              exclusive DYSTINCT events, premium drops and VIP
              experiences.
            </p>

            <div className="mt-8 space-y-4 text-sm text-white/85">
              <div className="rounded-2xl border border-white/70 bg-white/30 p-4 backdrop-blur-3xl">
                Priority invites to curated DYSTINCT events
              </div>
              {/* <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
                Early updates for new city launches
              </div> */}
              <div className="rounded-2xl border border-white/70 bg-white/30 p-4 backdrop-blur-3xl">
                Early bird access, VIP drops, and exclusive announcements
              </div>
            </div>

            {/* <div className="mt-10 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-xl">
                <p className="text-xl font-semibold text-white">4</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
                  Cities
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-xl">
                <p className="text-xl font-semibold text-white">VIP</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
                  Access
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-xl">
                <p className="text-xl font-semibold text-white">Night</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
                  Culture
                </p>
              </div>
            </div> */}
          </div>

          
        </div>
      </div>
    </section>
  );
}