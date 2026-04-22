"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Instagram,
  MapPin,
  Phone,
  Clock,
  ChevronDown,
  Menu,
  X,
  Send,
  Star,
  Flame,
  Heart,
  Sparkles,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ===== DATA ===== */

const menuItems = [
  {
    name: "Nutella Strawberry",
    desc: "Crepes lembut dengan olesan Nutella premium dan potongan stroberi segar, ditaburi gula halus.",
    price: "Rp 25.000",
    image: "/mykrepz-menu1.png",
    badge: "Best Seller",
    badgeColor: "bg-[#AD4B34]",
  },
  {
    name: "Banana Chocolate",
    desc: "Perpaduan sempurna crepes dengan irisan pisang raja, saus cokelat Belgian, dan whipped cream.",
    price: "Rp 22.000",
    image: "/mykrepz-menu2.png",
    badge: "Favorit",
    badgeColor: "bg-[#F9C779] text-[#2D1810]",
  },
  {
    name: "Savory Cheese Ham",
    desc: "Crepes gurih dengan keju mozzarella leleh, ham premium, dan sayuran segar pilihan.",
    price: "Rp 28.000",
    image: "/mykrepz-menu3.png",
    badge: "Savory",
    badgeColor: "bg-[#8B6F5E]",
  },
  {
    name: "Matcha Red Bean",
    desc: "Crepes dengan es krim matcha Jepang, kacang merah, dan saus matcha autentik.",
    price: "Rp 30.000",
    image: "/mykrepz-menu4.png",
    badge: "New Menu",
    badgeColor: "bg-emerald-600",
  },
];

const testimonials = [
  {
    name: "Rina Sari",
    text: "Crepes-nya juara banget! Nutella Strawberry-nya itu ngulik banget, pasti balik lagi!",
    rating: 5,
  },
  {
    name: "Budi Hartono",
    text: "PO buat ultah anak, semua tamu suka. Porsinya banyak, rasanya premium banget!",
    rating: 5,
  },
  {
    name: "Diana Putri",
    text: "Matcha Red Bean-nya endes pol! Topping banyak, crepes-nya tipis dan crispy. Love it!",
    rating: 5,
  },
];

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Menu", href: "#menu" },
  { label: "Kontak", href: "#kontak" },
];

/* ===== ANIMATION VARIANTS ===== */

const easeInOut = [0.42, 0, 0.58, 1];
const springConfig = { type: "spring", stiffness: 100, damping: 20 };

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeInOut" },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.1, ease: "easeInOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeInOut },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

/* ===== ANIMATED COUNTER HOOK ===== */

function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (startOnView && !inView) return;
    if (started.current) return;
    started.current = true;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, inView, startOnView]);

  return { count, ref };
}

/* ===== MARQUEE BANNER ===== */

function MarqueeBanner() {
  const items = [
    "Nutella Strawberry", "Banana Chocolate", "Savory Cheese Ham",
    "Matcha Red Bean", "Oreo Dream", "Mango Tango", "Tiramisu",
    "Caramel Bliss", "Avocado Crunch", "Red Velvet",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-3 bg-[#AD4B34] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#AD4B34] via-transparent to-[#AD4B34] z-10 pointer-events-none" />
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: [0, -2400] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-white/90 font-semibold text-sm flex items-center gap-2">
            <Star className="w-3 h-3 text-[#F9C779] fill-[#F9C779]" />
            {item}
            <Star className="w-3 h-3 text-[#F9C779] fill-[#F9C779]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ===== NAVBAR ===== */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-[#FFF8EC]/90 backdrop-blur-xl shadow-lg shadow-[#AD4B34]/5 py-2"
            : "bg-transparent py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.a
              href="#beranda"
              className="flex items-center gap-2 sm:gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <img
                  src="/mykrepz-logo.png"
                  alt="MY KREP'Z Logo"
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-cover shadow-md"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F9C779] rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-extrabold text-lg sm:text-xl tracking-wide transition-colors duration-500 ${
                    scrolled ? "text-[#AD4B34]" : "text-white"
                  }`}
                  style={{ textShadow: scrolled ? "none" : "0 2px 10px rgba(0,0,0,0.3)" }}
                >
                  MY KREP&apos;Z
                </span>
                <span
                  className={`text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-500 ${
                    scrolled ? "text-[#8B6F5E]" : "text-white/70"
                  }`}
                >
                  Premium Crepes
                </span>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                    scrolled
                      ? "text-[#8B6F5E] hover:text-[#AD4B34] hover:bg-[#FEEFE0]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-3">
                <Button
                  size="sm"
                  className="bg-[#AD4B34] hover:bg-[#8B3A28] text-white font-bold rounded-full px-6 shadow-md shadow-[#AD4B34]/25 hover:shadow-lg hover:shadow-[#AD4B34]/35 transition-all duration-300"
                  asChild
                >
                  <a href="#kontak">Pesan Sekarang</a>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Toggle */}
            <motion.button
              className={`md:hidden p-2 rounded-xl transition-colors duration-300 ${
                scrolled ? "text-[#AD4B34] hover:bg-[#FEEFE0]" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-white rounded-2xl shadow-2xl shadow-black/10 border border-[#F0DCC8] overflow-hidden"
          >
            <div className="p-6 space-y-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, ease: "easeInOut" }}
                  className="block text-[#2D1810] font-semibold py-3 px-4 rounded-xl hover:bg-[#FEEFE0] hover:text-[#AD4B34] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button className="w-full bg-[#AD4B34] hover:bg-[#8B3A28] text-white font-bold rounded-xl mt-4 py-6 shadow-lg shadow-[#AD4B34]/20">
                  <a href="#kontak" onClick={() => setMobileOpen(false)}>
                    Pesan Sekarang
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ===== HERO SECTION ===== */

function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 400], [1, 0.9]);

  return (
    <section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src="/mykrepz-hero.png"
          alt="Crepes Banner"
          className="w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2D1810]/70 via-[#AD4B34]/30 to-[#2D1810]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#AD4B34]/20 via-transparent to-[#AD4B34]/20" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#F9C779]/20 rounded-full animate-float-slow" />
      <div className="absolute top-40 right-16 w-14 h-14 bg-[#AD4B34]/15 rounded-full animate-float-medium" />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-[#FEEFE0]/10 rounded-full animate-float-fast" />
      <div className="absolute top-60 left-1/3 w-10 h-10 bg-[#F9C779]/15 rounded-full animate-float-medium" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-60 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-float-slow" style={{ animationDelay: "2s" }} />

      {/* Decorative corner shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 border-t-2 border-l-2 border-[#F9C779]/30 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 border-b-2 border-r-2 border-[#F9C779]/30 rounded-br-3xl" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2">
            <Sparkles className="w-4 h-4 text-[#F9C779]" />
            <span className="text-white/90 text-sm font-medium">Premium Crepes Since 2024</span>
            <Flame className="w-4 h-4 text-[#AD4B34]" />
          </div>
        </motion.div>

        {/* Main title with stagger effect */}
        <div className="overflow-hidden mb-4 sm:mb-6">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
          >
            MY KREP&apos;Z
          </motion.h1>
        </div>

        {/* Subtitle with underline decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeInOut" }}
          className="mb-4 sm:mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#F9C779]" />
            <p className="text-[#F9C779] font-semibold text-sm sm:text-base tracking-[0.3em] uppercase">
              Handcrafted with Love
            </p>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#F9C779]" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeInOut" }}
          className="text-base sm:text-lg md:text-xl text-white/85 font-light mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Nikmati crepes lezat dengan topping premium pilihan.
          Dibuat segar langsung di depan mata Anda!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: "easeInOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-[#AD4B34] hover:bg-[#8B3A28] text-white font-bold text-lg rounded-full px-8 sm:px-10 py-6 sm:py-7 shadow-xl shadow-[#AD4B34]/40 hover:shadow-2xl hover:shadow-[#AD4B34]/50 transition-all duration-300 animate-pulse-glow"
              asChild
            >
              <a href="#menu">
                <span className="flex items-center gap-2">
                  Lihat Menu
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#F9C779]/60 text-white hover:bg-[#F9C779]/20 hover:border-[#F9C779] font-bold text-lg rounded-full px-8 sm:px-10 py-6 sm:py-7 backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <a href="#kontak">Hubungi Kami</a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs font-medium tracking-wider">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="text-[#F9C779]" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ===== ABOUT SECTION ===== */

function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { count: menuCount, ref: ref1 } = useCounter(50, 2000);
  const { count: customerCount, ref: ref2 } = useCounter(10000, 2500);
  const { count: ratingCount, ref: ref3 } = useCounter(49, 2000);

  return (
    <section id="tentang" className="relative py-20 sm:py-28 bg-[#FFF8EC] overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 blob bg-[#F9C779]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 blob bg-[#AD4B34]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FEEFE0]/50 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Rotating border decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#AD4B34] via-[#F9C779] to-[#AD4B34] rounded-3xl animate-spin-slow opacity-20" />

              <div className="relative bg-white p-3 rounded-3xl shadow-2xl shadow-[#AD4B34]/10">
                <img
                  src="/mykrepz-logo.png"
                  alt="MY KREP'Z Logo"
                  className="w-full rounded-2xl"
                />
              </div>

              {/* Floating accent cards */}
              <motion.div
                className="absolute -top-6 -right-6 bg-[#AD4B34] text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-[#AD4B34]/30 animate-float-medium"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-[#F9C779]" fill="#F9C779" />
                  Premium Quality
                </span>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-[#F9C779] text-[#2D1810] font-bold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-[#F9C779]/30 animate-float-slow"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" fill="#2D1810" />
                  Est. 2024
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#FEEFE0] border border-[#F9C779]/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Flame className="w-4 h-4 text-[#AD4B34]" />
              <span className="text-[#AD4B34] text-sm font-semibold">Tentang Kami</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2D1810] mb-6 leading-tight">
              Passion dalam Setiap{" "}
              <span className="relative inline-block">
                <span className="text-gradient">Lipatan Crepes</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="#F9C779" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <p className="text-[#8B6F5E] leading-relaxed mb-5 text-base sm:text-lg">
              <strong className="text-[#2D1810]">MY KREP&apos;Z</strong> hadir sebagai destinasi
              crepes premium yang menghadirkan pengalaman kuliner istimewa. Kami percaya bahwa
              setiap crepes yang kami buat harus sempurna — dari adonan yang tipis dan renyah,
              hingga topping premium yang dipilih dengan teliti.
            </p>
            <p className="text-[#8B6F5E] leading-relaxed mb-8 text-base sm:text-lg">
              Dengan bahan-bahan berkualitas tinggi dan resep turun-temurun, kami menghadirkan
              perpaduan rasa yang unik dan tak terlupakan. Setiap gigitan adalah perjalanan
              rasa yang akan membuat Anda kembali lagi dan lagi.
            </p>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              <div ref={ref1} className="relative text-center p-4 sm:p-5 bg-white rounded-2xl shadow-md shadow-[#AD4B34]/5 border border-[#F0DCC8] overflow-hidden group card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-[#AD4B34]/5 to-[#F9C779]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-2xl sm:text-4xl font-black text-[#AD4B34] mb-1">
                    {menuCount}+
                  </div>
                  <div className="text-xs sm:text-sm text-[#8B6F5E] font-medium">Varian Menu</div>
                </div>
              </div>
              <div ref={ref2} className="relative text-center p-4 sm:p-5 bg-white rounded-2xl shadow-md shadow-[#AD4B34]/5 border border-[#F0DCC8] overflow-hidden group card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-[#AD4B34]/5 to-[#F9C779]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-2xl sm:text-4xl font-black text-[#F9C779] mb-1">
                    {customerCount >= 1000 ? `${(customerCount / 1000).toFixed(customerCount >= 10000 ? 0 : 1)}K` : customerCount}+
                  </div>
                  <div className="text-xs sm:text-sm text-[#8B6F5E] font-medium">Pelanggan</div>
                </div>
              </div>
              <div ref={ref3} className="relative text-center p-4 sm:p-5 bg-white rounded-2xl shadow-md shadow-[#AD4B34]/5 border border-[#F0DCC8] overflow-hidden group card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-[#AD4B34]/5 to-[#F9C779]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-2xl sm:text-4xl font-black text-[#AD4B34] mb-1">
                    {(ratingCount / 10).toFixed(1)}★
                  </div>
                  <div className="text-xs sm:text-sm text-[#8B6F5E] font-medium">Rating</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===== MENU SECTION ===== */

function MenuSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="menu" className="relative py-20 sm:py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-[#FFF8EC]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23AD4B34%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-80 h-80 blob bg-[#F9C779]" />
      <div className="absolute bottom-20 -right-20 w-60 h-60 blob bg-[#AD4B34]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#FEEFE0] border border-[#F9C779]/30 rounded-full px-4 py-1.5 mb-6">
            <Star className="w-4 h-4 text-[#F9C779]" fill="#F9C779" />
            <span className="text-[#AD4B34] text-sm font-semibold">Menu Pilihan</span>
            <Star className="w-4 h-4 text-[#F9C779]" fill="#F9C779" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2D1810] mb-4">
            Menu <span className="text-gradient">Favorit</span> Kami
          </h2>
          <p className="text-[#8B6F5E] text-base sm:text-lg max-w-2xl mx-auto">
            Temukan berbagai pilihan crepes lezat dengan topping premium yang
            bikin nagih. Dari manis hingga gurih, semua ada di sini!
          </p>
        </motion.div>

        {/* Menu Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {menuItems.map((item, index) => (
            <motion.div key={item.name} variants={staggerItem}>
              <div className="group relative bg-white rounded-3xl shadow-md shadow-[#AD4B34]/5 border border-[#F0DCC8]/60 overflow-hidden card-hover">
                {/* Image */}
                <div className="relative img-zoom">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 sm:h-60 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`${item.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Price overlay on hover */}
                  <motion.div
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-[#AD4B34] font-black text-lg">{item.price}</span>
                  </motion.div>
                </div>

                {/* Content */}
                <CardContent className="p-5 sm:p-6">
                  <h3 className="font-bold text-lg sm:text-xl text-[#2D1810] mb-2 group-hover:text-[#AD4B34] transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-[#8B6F5E] text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.desc}
                  </p>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-[#AD4B34] hover:bg-[#8B3A28] text-white font-bold rounded-xl py-5 shadow-md shadow-[#AD4B34]/20 hover:shadow-lg hover:shadow-[#AD4B34]/30 transition-all duration-300">
                      <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Pesan Sekarang
                      </a>
                    </Button>
                  </motion.div>
                </CardContent>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10 sm:mt-14"
        >
          <p className="text-[#8B6F5E] text-sm">
            * Harga dapat berubah sewaktu-waktu. Hubungi kami untuk info promo terbaru!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== TESTIMONIAL SECTION ===== */

function TestimonialSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 sm:py-28 bg-[#AD4B34] overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B3A28] via-[#AD4B34] to-[#C76B56] animate-gradient-x" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F9C779]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="text-center mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <Heart className="w-4 h-4 text-[#F9C779]" fill="#F9C779" />
            <span className="text-white/90 text-sm font-semibold">Testimoni Pelanggan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Kata <span className="text-[#F9C779]">Mereka</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((t, i) => (
            <motion.div key={t.name} variants={staggerItem}>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 card-hover group">
                {/* Quote mark */}
                <div className="absolute -top-4 left-6 bg-[#F9C779] text-[#2D1810] w-8 h-8 rounded-full flex items-center justify-center font-serif font-black text-xl shadow-lg">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 pt-2">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#F9C779]" fill="#F9C779" />
                  ))}
                </div>

                <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F9C779]/30 flex items-center justify-center text-[#F9C779] font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">Pelanggan MY KREP&apos;Z</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ===== CONTACT SECTION ===== */

function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Alamat Bisnis",
      detail: "Jl. Kuliner Raya No. 88, Blok C3, Jakarta Selatan 12345",
      color: "from-[#AD4B34]/10 to-[#F9C779]/10",
      iconColor: "text-[#AD4B34]",
    },
    {
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "WhatsApp / Telepon",
      detail: "+62 812-3456-7890",
      link: "https://wa.me/6281234567890",
      color: "from-green-50 to-green-100/50",
      iconColor: "text-green-600",
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Jam Operasional",
      detail: "Setiap Hari: 10.00 - 22.00 WIB",
      color: "from-blue-50 to-blue-100/50",
      iconColor: "text-blue-600",
    },
    {
      icon: <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Instagram",
      detail: "@mykrepz.official",
      link: "https://instagram.com/mykrepz.official",
      color: "from-pink-50 to-purple-100/50",
      iconColor: "text-pink-600",
    },
    {
      icon: <Send className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "TikTok",
      detail: "@mykrepz",
      link: "https://tiktok.com/@mykrepz",
      color: "from-gray-50 to-gray-100/50",
      iconColor: "text-gray-800",
    },
  ];

  return (
    <section id="kontak" className="relative py-20 sm:py-28 bg-[#FFF8EC] overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-20 left-10 w-72 h-72 blob bg-[#F9C779]" />
      <div className="absolute bottom-10 right-10 w-60 h-60 blob bg-[#AD4B34]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="text-center mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#FEEFE0] border border-[#F9C779]/30 rounded-full px-4 py-1.5 mb-6">
            <Send className="w-4 h-4 text-[#AD4B34]" />
            <span className="text-[#AD4B34] text-sm font-semibold">Hubungi Kami</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2D1810] mb-4">
            Pemesanan &{" "}
            <span className="relative inline-block">
              <span className="text-gradient">PO</span>
            </span>
          </h2>
          <p className="text-[#8B6F5E] text-base sm:text-lg max-w-2xl mx-auto">
            Tertarik untuk memesan atau ingin PO dalam jumlah besar untuk acara
            khusus? Hubungi kami melalui salah satu channel di bawah ini!
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {contactInfo.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              {item.link ? (
                <motion.a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block"
                >
                  <div className={`relative p-6 sm:p-7 bg-gradient-to-br ${item.color} rounded-3xl border border-[#F0DCC8]/60 shadow-md overflow-hidden group`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className={`inline-flex p-3 rounded-2xl bg-white shadow-md mb-4 ${item.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-[#2D1810] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#8B6F5E] text-sm">{item.detail}</p>
                    </div>
                  </div>
                </motion.a>
              ) : (
                <div className={`relative p-6 sm:p-7 bg-gradient-to-br ${item.color} rounded-3xl border border-[#F0DCC8]/60 shadow-md`}>
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-2xl bg-white shadow-md mb-4 ${item.iconColor}`}>
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-[#2D1810] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#8B6F5E] text-sm">{item.detail}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* PO Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeInOut" }}
          className="mt-12 sm:mt-16 relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#AD4B34] via-[#C76B56] to-[#AD4B34] animate-gradient-x" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M50%2050c0-5.523%204.477-10%2010-10s10%204.477%2010%2010-4.477%2010-10%2010c0%205.523-4.477%2010-10%2010s-10-4.477-10-10%204.477-10%2010-10%2010%204.477%2010%2010-4.477%2010-10%2010M10%2010c0-5.523%204.477-10%2010-10s10%204.477%2010%2010-4.477%2010-10%2010c0%205.523-4.477%2010-10%2010s-10-4.477-10-10%204.477-10%2010-10%2010%204.477%2010%2010-4.477%2010-10%2010%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

          <div className="relative p-8 sm:p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="inline-block bg-[#F9C779] text-[#2D1810] text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-lg"
            >
              SPECIAL OFFER
            </motion.div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-4">
              Menerima PO untuk Berbagai Acara!
            </h3>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Kami menerima pemesanan dalam jumlah besar (Pre-Order) untuk
              ulang tahun, arisan, gathering kantor, bazaar, dan acara spesial
              lainnya. Hubungi kami minimal 2 hari sebelum acara untuk
              pemesanan khusus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-[#AD4B34] hover:bg-[#FEEFE0] font-bold rounded-full px-8 sm:px-10 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20MY%20KREP'Z!%20Saya%20ingin%20pesan%20crepes."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Pesan via WhatsApp
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/40 text-white hover:bg-white/15 font-bold rounded-full px-8 sm:px-10 py-6 backdrop-blur-sm transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://instagram.com/mykrepz.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="w-5 h-5" />
                    Follow Instagram
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== FOOTER ===== */

function Footer() {
  return (
    <footer className="relative bg-[#2D1810] text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-[#AD4B34] via-[#F9C779] to-[#AD4B34]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/mykrepz-logo.png"
                alt="MY KREP'Z"
                className="w-11 h-11 rounded-xl shadow-md"
              />
              <div>
                <span className="font-extrabold text-xl text-white">MY KREP&apos;Z</span>
                <p className="text-[10px] text-[#F9C779] tracking-[0.2em] uppercase font-semibold">Premium Crepes</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Premium crepes dengan topping pilihan terbaik. Dibuat segar
              dengan cinta dan passion untuk setiap pelanggan.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://instagram.com/mykrepz.official"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#E1306C]/20 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#E1306C] transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://tiktok.com/@mykrepz"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
              >
                <Send className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-green-500/20 border border-white/10 flex items-center justify-center text-white/60 hover:text-green-400 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-[#F9C779] uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-300"
                  >
                    <span className="text-[#AD4B34]">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-[#F9C779] uppercase tracking-wider">Jam Buka</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex justify-between">
                <span>Senin - Jumat</span>
                <span className="text-white/70 font-medium">10:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sabtu - Minggu</span>
                <span className="text-white/70 font-medium">09:00 - 23:00</span>
              </li>
            </ul>
            <div className="mt-5 inline-flex items-center gap-2 bg-[#AD4B34]/20 border border-[#AD4B34]/30 rounded-xl px-3 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-semibold">OPEN NOW</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-[#F9C779] uppercase tracking-wider">Kontak</h4>
            <div className="space-y-4 text-sm text-white/50">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#AD4B34] shrink-0 mt-0.5" />
                <span>Jl. Kuliner Raya No. 88, Jakarta Selatan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#AD4B34] shrink-0" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#AD4B34] shrink-0" />
                <span>@mykrepz.official</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <p>&copy; 2024 MY KREP&apos;Z. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#AD4B34]" fill="#AD4B34" /> for crepes lovers
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ===== SCROLL TO TOP BUTTON ===== */

function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#AD4B34] hover:bg-[#8B3A28] text-white rounded-full shadow-xl shadow-[#AD4B34]/30 flex items-center justify-center transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ===== MAIN PAGE ===== */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MarqueeBanner />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
