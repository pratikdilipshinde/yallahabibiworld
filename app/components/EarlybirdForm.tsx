"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineSparkles, HiOutlineLockClosed } from "react-icons/hi2";
import {
  MdOutlineMail,
  MdOutlinePhoneIphone,
  MdOutlineArrowOutward,
} from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FiUser } from "react-icons/fi";

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Submitting...");

    try {
      const res = await fetch("/api/earlybird", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error submitting");

      toast.dismiss(loadingToast);
      toast.success("🎉 You're on the list!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        city: "",
      });
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-black px-4 py-6 text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/earlybird-bg.jpg"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-2">

          {/* LEFT → FORM */}
          <div className="rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
            <p className="text-xs uppercase tracking-widest text-pink-300">
              Early Bird Registration
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Reserve your spot
            </h2>

            <p className="mt-2 text-sm text-white/70">
              Fill in your details to get DYSTINCT event early access tickets and city-specific invites. Locations coming soon.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">

              <div className="grid gap-3 sm:grid-cols-2">
                <GlassInput
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  icon={<FiUser />}
                />

                <GlassInput
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  icon={<FiUser />}
                />
              </div>

              <GlassInput
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                icon={<MdOutlineMail />}
              />

              <GlassInput
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                icon={<MdOutlinePhoneIphone />}
              />

              {/* City */}
              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-xl">
                <CiLocationOn className="text-white/70" />
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm outline-none"
                >
                  <option value="">Select City</option>
                  {cityOptions.map((c) => (
                    <option key={c} className="text-black">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                disabled={loading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 py-3 text-sm font-semibold"
              >
                {loading ? "Submitting..." : "Join the List"}
                <MdOutlineArrowOutward />
              </button>

              <div className="flex items-start gap-2 text-xs text-white/60">
                <HiOutlineLockClosed />
                <p>By submitting, you agree to receive event updates, early access invites, and nightlife announcements from Yalla Habibi.</p>
              </div>
            </form>
          </div>

          {/* RIGHT → CONTENT */}
          <div className="rounded-[28px] border border-white/20 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-2 text-xs uppercase text-pink-300">
              <HiOutlineSparkles />
              Exclusive
            </div>

            <h2 className="mt-4 text-3xl font-semibold leading-tight">
              Enter the night <span className="block text-pink-400">before everyone</span>
              <span className="block text-purple-400">else.</span>
            </h2>

            <p className="mt-4 text-sm text-white/70">
              Join the Yalla Habibi early bird list for first access to exclusive DYSTINCT events, premium drops and VIP experiences.
            </p>

            <div className="mt-6 space-y-3">
              <Feature title="Priority invites to curated DYSTINCT events" />
              <Feature title="Early bird access, VIP drops, and exclusive announcements" />
              {/* <Feature title="City Launches" /> */}
            </div>

            {/* <div className="mt-6 grid grid-cols-3 gap-2">
              <Stat value="4" label="Cities" />
              <Stat value="VIP" label="Access" />
              <Stat value="100%" label="Exclusive" />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Glass Input ---------- */

function GlassInput({ name, value, onChange, placeholder, icon }: any) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-xl">
      <span className="text-white/70">{icon}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-white/50"
      />
    </div>
  );
}

/* ---------- Feature ---------- */

function Feature({ title }: any) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm backdrop-blur-xl">
      {title}
    </div>
  );
}

/* ---------- Stat ---------- */

function Stat({ value, label }: any) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-center backdrop-blur-xl">
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-[10px] uppercase text-white/60">{label}</p>
    </div>
  );
}