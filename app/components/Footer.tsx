"use client";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="relative bg-black text-neutral-300 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,0,150,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(0,200,255,0.1),_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">

        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              Yalla Habibi
            </h2>

            <p className="mt-4 text-sm text-neutral-400 leading-6">
              Premium nightlife experiences, exclusive parties, and unforgettable vibes.
              Join the movement.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4 text-lg">
              <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
              <SiThreads className="cursor-pointer hover:text-white transition" />
              <FaFacebookF className="cursor-pointer hover:text-blue-500 transition" />
              <FaXTwitter className="cursor-pointer hover:text-neutral-100 transition" />
              <FaYoutube className="cursor-pointer hover:text-red-500 transition" />
            </div>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Events
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition">Upcoming Events</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Past Nights</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">VIP Access</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Book a Table</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Collaborate</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Privacy</a></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Get On The List
            </h3>

            <p className="mt-4 text-sm text-neutral-400">
              Be the first to know about exclusive drops, VIP invites & events.
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/60 px-3 py-2">
              <MdOutlineMail size={18} className="text-neutral-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-500"
              />
            </div>

            <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 py-2 text-sm font-semibold text-white hover:opacity-90 transition">
              Join Now
            </button>
          </div>

        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-neutral-800" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p className="text-neutral-500">
            © {new Date().getFullYear()} Yalla Habibi. All rights reserved.
          </p>

          <p className="text-neutral-500">
            Built with 🔥 by Pratik Shinde
          </p>
        </div>

      </div>
    </footer>
  );
}