"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  MapPin,
  Phone,
  Clock,
  ChevronDown,
  Menu,
  X,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  {
    name: "Nutella Strawberry",
    desc: "Crepes lembut dengan olesan Nutella premium dan potongan stroberi segar, ditaburi gula halus.",
    price: "Rp 25.000",
    image: "/mykrepz-menu1.png",
    badge: "Best Seller",
  },
  {
    name: "Banana Chocolate",
    desc: "Perpaduan sempurna crepes dengan irisan pisang raja, saus cokelat Belgian, dan whipped cream.",
    price: "Rp 22.000",
    image: "/mykrepz-menu2.png",
    badge: "Favorit",
  },
  {
    name: "Savory Cheese Ham",
    desc: "Crepes gurih dengan keju mozzarella leleh, ham premium, dan sayuran segar pilihan.",
    price: "Rp 28.000",
    image: "/mykrepz-menu3.png",
    badge: "Savory",
  },
  {
    name: "Matcha Red Bean",
    desc: "Crepes dengan es krim matcha Jepang, kacang merah, dan saus matcha autentik.",
    price: "Rp 30.000",
    image: "/mykrepz-menu4.png",
    badge: "New Menu",
  },
];

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Menu", href: "#menu" },
  { label: "Kontak", href: "#kontak" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#beranda" className="flex items-center gap-2 sm:gap-3">
            <img
              src="/mykrepz-logo.png"
              alt="MY KREP'Z Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />
            <span
              className={`font-bold text-lg sm:text-xl transition-colors ${
                scrolled ? "text-amber-900" : "text-white"
              }`}
            >
              MY KREP&apos;Z
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full px-5"
              asChild
            >
              <a href="#kontak">Pesan Sekarang</a>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={scrolled ? "text-gray-800" : "text-white"} size={24} />
            ) : (
              <Menu className={scrolled ? "text-gray-800" : "text-white"} size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-xl border-t"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-gray-700 font-medium py-2 hover:text-amber-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full mt-2">
              <a href="#kontak" onClick={() => setMobileOpen(false)}>
                Pesan Sekarang
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/mykrepz-hero.png"
          alt="Crepes Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 text-sm px-4 py-1 mb-6 backdrop-blur-sm">
            ✨ Premium Crepes Since 2024
          </Badge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight">
            MY KREP&apos;Z
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-amber-100 font-light mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Nikmati crepes lezat dengan topping premium pilihan. Dibuat segar
            langsung di depan mata Anda!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg rounded-full px-8 py-6 shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="#menu">Lihat Menu</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 font-bold text-lg rounded-full px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="#kontak">Hubungi Kami</a>
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="text-white/60" size={32} />
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="tentang" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img
                src="/mykrepz-logo.png"
                alt="MY KREP'Z Logo"
                className="w-full max-w-sm mx-auto rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white font-bold text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg">
                🥞 Est. 2024
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4 text-amber-700 bg-amber-50 border-amber-200">
              Tentang Kami
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Passion dalam Setiap{" "}
              <span className="text-amber-600">Lipatan Crepes</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-base sm:text-lg">
              <strong>MY KREP&apos;Z</strong> hadir sebagai destinasi crepes premium
              yang menghadirkan pengalaman kuliner istimewa. Kami percaya bahwa
              setiap crepes yang kami buat harus sempurna — dari adonan yang
              tipis dan renyah, hingga topping premium yang dipilih dengan teliti.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-base sm:text-lg">
              Dengan bahan-bahan berkualitas tinggi dan resep turun-temurun,
              kami menghadirkan perpaduan rasa yang unik dan tak terlupakan.
              Setiap gigitan adalah perjalanan rasa yang akan membuat Anda
              kembali lagi dan lagi.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 sm:p-4 bg-amber-50 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-amber-600">50+</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Varian Menu</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-amber-50 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-amber-600">10K+</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Pelanggan</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-amber-50 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-amber-600">4.9★</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  return (
    <section id="menu" className="py-16 sm:py-24 bg-gradient-to-b from-amber-50/50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-amber-700 bg-amber-100 border-amber-200">
            Menu Pilihan
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menu <span className="text-amber-600">Favorit</span> Kami
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Temukan berbagai pilihan crepes lezat dengan topping premium yang
            bikin nagih. Dari manis hingga gurih, semua ada di sini!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-2xl">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-semibold shadow-md">
                    {item.badge}
                  </Badge>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-600 font-bold text-lg">
                      {item.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-4 shadow-md hover:shadow-lg transition-all"
                    >
                      Pesan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <p className="text-gray-500 text-sm">
            * Harga dapat berubah sewaktu-waktu. Hubungi kami untuk info promo terbaru!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Alamat Bisnis",
      detail: "Jl. Kuliner Raya No. 88, Blok C3, Jakarta Selatan 12345",
    },
    {
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "WhatsApp / Telepon",
      detail: "+62 812-3456-7890",
      link: "https://wa.me/6281234567890",
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Jam Operasional",
      detail: "Setiap Hari: 10.00 - 22.00 WIB",
    },
    {
      icon: <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Instagram",
      detail: "@mykrepz.official",
      link: "https://instagram.com/mykrepz.official",
    },
    {
      icon: <Send className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "TikTok",
      detail: "@mykrepz",
      link: "https://tiktok.com/@mykrepz",
    },
  ];

  return (
    <section id="kontak" className="py-16 sm:py-24 bg-gradient-to-b from-amber-900 to-amber-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className="mb-4 bg-amber-500/20 text-amber-200 border-amber-400/30">
            Hubungi Kami
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pemesanan & <span className="text-amber-400">PO</span>
          </h2>
          <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto">
            Tertarik untuk memesan atau ingin PO dalam jumlah besar untuk acara
            khusus? Hubungi kami melalui salah satu channel di bawah ini!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 sm:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="text-amber-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-amber-100/70 text-sm">{item.detail}</p>
                </a>
              ) : (
                <div className="p-5 sm:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="text-amber-400 mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-base sm:text-lg text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-amber-100/70 text-sm">{item.detail}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-3">
            🎉 Menerima PO untuk Berbagai Acara!
          </h3>
          <p className="text-amber-100/80 text-sm sm:text-base max-w-2xl mx-auto mb-5">
            Kami menerima pemesanan dalam jumlah besar (Pre-Order) untuk
            ulang tahun, arisan, gathering kantor, bazaar, dan acara spesial
            lainnya. Hubungi kami minimal 2 hari sebelum acara untuk
            pemesanan khusus.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-full px-6 sm:px-8 shadow-lg"
              asChild
            >
              <a
                href="https://wa.me/6281234567890?text=Halo%20MY%20KREP'Z!%20Saya%20ingin%20pesan%20crepes."
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Pesan via WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-pink-400/50 text-pink-200 hover:bg-pink-500/10 font-bold rounded-full px-6 sm:px-8 transition-all"
              asChild
            >
              <a
                href="https://instagram.com/mykrepz.official"
                target="_blank"
                rel="noopener noreferrer"
              >
                📸 Follow Instagram
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/mykrepz-logo.png"
                alt="MY KREP'Z"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-bold text-xl">MY KREP&apos;Z</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium crepes dengan topping pilihan terbaik. Dibuat segar
              dengan cinta dan passion untuk setiap pelanggan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-amber-400">
              Navigasi
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-base mb-4 text-amber-400">
              Ikuti Kami
            </h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/mykrepz.official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @mykrepz.official
              </a>
              <a
                href="https://tiktok.com/@mykrepz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors"
              >
                <Send className="w-4 h-4" />
                @mykrepz
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-green-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +62 812-3456-7890
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-sm">
          <p>&copy; 2024 MY KREP&apos;Z. All rights reserved.</p>
          <p>Made with ❤️ for crepes lovers everywhere</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
