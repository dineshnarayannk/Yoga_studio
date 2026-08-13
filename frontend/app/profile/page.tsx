"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Settings as SettingsIcon, 
  Calendar, 
  Flame, 
  Clock, 
  Sparkles, 
  Award, 
  Check, 
  Bell, 
  Shield, 
  LogOut, 
  Edit3, 
  Save, 
  ChevronRight,
  Heart,
  Phone,
  Mail,
  Activity
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

function ProfileContent() {
  const { user, loading, openAuthModal, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tab State
  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState<"overview" | "classes" | "settings">(
    initialTab === "settings" ? "settings" : initialTab === "classes" ? "classes" : "overview"
  );

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "settings") setActiveTab("settings");
    else if (tabParam === "classes") setActiveTab("classes");
    else setActiveTab("overview");
  }, [searchParams]);

  // Form State for Settings
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [emergencyContact, setEmergencyContact] = useState("Sarah Morgan (+1 555-987-6543)");
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [primaryGoal, setPrimaryGoal] = useState("Flexibility & Stress Relief");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 3000);
  };

  // If loading, show peaceful skeleton spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-astrian-oat dark:bg-[#121413] pt-32 pb-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-astrian-sage border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-astrian-charcoal/60 dark:text-gray-400">Loading your wellness space...</p>
        </div>
      </div>
    );
  }

  // Guest State - Prompt to Sign In
  if (!user) {
    return (
      <div className="min-h-screen bg-astrian-oat dark:bg-[#121413] pt-32 pb-24 text-astrian-charcoal dark:text-gray-100 font-sans transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Card className="p-10 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-astrian-sage/10 text-astrian-sage flex items-center justify-center mb-6">
              <User className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold font-display mb-3 text-astrian-charcoal dark:text-gray-100">
              Sign In to View Profile
            </h1>
            <p className="text-astrian-charcoal/70 dark:text-gray-300 font-light mb-8 max-w-md">
              Please sign in to manage your practice schedule, view booked sessions, and update your personal wellness preferences.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => openAuthModal()}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4.5 w-4.5" /> Sign In / Sign Up
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const upcomingClasses = [
    {
      id: "b1",
      title: "Vinyasa Flow",
      instructor: "Elena Rostova",
      time: "Wed, 07:00 AM - 08:00 AM",
      location: "Main Sanctuary Studio A",
      status: "Confirmed"
    },
    {
      id: "b2",
      title: "Restorative Yin",
      instructor: "Sarah Jenkins",
      time: "Fri, 07:00 PM - 08:15 PM",
      location: "Zen Lotus Lounge B",
      status: "Confirmed"
    }
  ];

  const practiceHistory = [
    { title: "Hatha Harmony", instructor: "Marcus Vance", date: "Jul 18, 2026", duration: "75 mins" },
    { title: "Core Power Elements", instructor: "Darius Coleman", date: "Jul 15, 2026", duration: "60 mins" },
    { title: "Pranayama & Meditation", instructor: "Sarah Jenkins", date: "Jul 12, 2026", duration: "45 mins" }
  ];

  return (
    <div className="min-h-screen bg-astrian-oat dark:bg-[#121413] pt-32 pb-24 text-astrian-charcoal dark:text-gray-100 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Profile Banner Card */}
        <Card className="p-8 md:p-10 mb-8 border-astrian-clay dark:border-white/10 bg-white dark:bg-[#1c1f1d] shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              {/* User Avatar */}
              <div className="h-20 w-20 rounded-full overflow-hidden relative border-2 border-astrian-sage/30 bg-astrian-sage/10 dark:bg-astrian-sage/20 flex items-center justify-center shrink-0">
                {user.profile_image ? (
                  <Image
                    src={user.profile_image}
                    alt={user.name || "User Avatar"}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                ) : (
                  <span className="font-bold text-3xl text-astrian-sage dark:text-astrian-leaf uppercase">
                    {user.name ? user.name.charAt(0) : "U"}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold font-display text-astrian-charcoal dark:text-gray-100">
                    {user.name}
                  </h1>
                  <span className="text-xs font-semibold uppercase tracking-wider text-astrian-sage dark:text-astrian-leaf bg-astrian-sage/10 dark:bg-astrian-sage/20 px-3 py-1 rounded-full">
                    Active Member
                  </span>
                </div>
                <p className="text-sm text-astrian-charcoal/60 dark:text-gray-400 font-light mt-1">
                  {user.email}
                </p>
                <p className="text-xs text-astrian-charcoal/40 dark:text-gray-500 mt-1">
                  Member since July 2026 • Wellness District Studio
                </p>
              </div>
            </div>

            {/* Quick Action */}
            <div className="flex gap-3 w-full md:w-auto">
              <Button
                variant={activeTab === "settings" ? "primary" : "secondary"}
                size="sm"
                onClick={() => {
                  setActiveTab("settings");
                  router.push("/profile?tab=settings");
                }}
                className="flex items-center gap-2"
              >
                <SettingsIcon className="h-4 w-4" /> Settings
              </Button>
              <button
                onClick={() => logout()}
                className="px-4 py-2 text-xs font-semibold text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>

          </div>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex border-b border-astrian-clay/60 dark:border-white/10 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              setActiveTab("overview");
              router.push("/profile");
            }}
            className={`pb-4 px-6 text-sm font-semibold transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === "overview"
                ? "text-astrian-sage dark:text-astrian-leaf"
                : "text-astrian-charcoal/60 dark:text-gray-400 hover:text-astrian-charcoal"
            }`}
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" /> Overview & Stats
            </div>
            {activeTab === "overview" && (
              <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-astrian-sage dark:bg-astrian-leaf" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("classes");
              router.push("/profile?tab=classes");
            }}
            className={`pb-4 px-6 text-sm font-semibold transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === "classes"
                ? "text-astrian-sage dark:text-astrian-leaf"
                : "text-astrian-charcoal/60 dark:text-gray-400 hover:text-astrian-charcoal"
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Booked Classes ({upcomingClasses.length})
            </div>
            {activeTab === "classes" && (
              <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-astrian-sage dark:bg-astrian-leaf" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("settings");
              router.push("/profile?tab=settings");
            }}
            className={`pb-4 px-6 text-sm font-semibold transition-colors relative cursor-pointer whitespace-nowrap ${
              activeTab === "settings"
                ? "text-astrian-sage dark:text-astrian-leaf"
                : "text-astrian-charcoal/60 dark:text-gray-400 hover:text-astrian-charcoal"
            }`}
          >
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" /> Account Settings
            </div>
            {activeTab === "settings" && (
              <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-astrian-sage dark:bg-astrian-leaf" />
            )}
          </button>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW & STATS */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Practice Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <Flame className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-astrian-charcoal/40 dark:text-gray-500">Current Streak</p>
                    <p className="text-2xl font-bold font-display text-astrian-charcoal dark:text-gray-100">4 Days</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-astrian-sage/10 text-astrian-sage flex items-center justify-center shrink-0">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-astrian-charcoal/40 dark:text-gray-500">Classes Attended</p>
                    <p className="text-2xl font-bold font-display text-astrian-charcoal dark:text-gray-100">14 Sessions</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-astrian-charcoal/40 dark:text-gray-500">Total Practice</p>
                    <p className="text-2xl font-bold font-display text-astrian-charcoal dark:text-gray-100">18.5 Hours</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-astrian-charcoal/40 dark:text-gray-500">Favorite Style</p>
                    <p className="text-2xl font-bold font-display text-astrian-charcoal dark:text-gray-100">Vinyasa Flow</p>
                  </div>
                </Card>
              </div>

              {/* Two Column Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Upcoming Classes Preview */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-display text-astrian-charcoal dark:text-gray-100">Upcoming Sessions</h3>
                    <Link href="/schedule" className="text-xs font-semibold text-astrian-sage hover:underline flex items-center gap-1">
                      Explore Timetable <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {upcomingClasses.map((item) => (
                      <Card key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-astrian-sage bg-astrian-sage/10 px-2.5 py-0.5 rounded-md">
                            {item.status}
                          </span>
                          <h4 className="text-lg font-bold font-display text-astrian-charcoal dark:text-gray-100">{item.title}</h4>
                          <p className="text-xs text-astrian-charcoal/60 dark:text-gray-400 font-light flex items-center gap-2">
                            <span>Instructor: {item.instructor}</span> • <span>{item.location}</span>
                          </p>
                          <p className="text-xs font-medium text-astrian-sage dark:text-astrian-leaf">{item.time}</p>
                        </div>
                        <Button variant="secondary" size="sm" onClick={() => setActiveTab("classes")}>
                          Manage Ticket
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* History Log */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-display text-astrian-charcoal dark:text-gray-100">Recent Activity</h3>
                  <Card className="p-6 space-y-4">
                    {practiceHistory.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-astrian-clay/40 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="text-sm font-bold text-astrian-charcoal dark:text-gray-100">{item.title}</p>
                          <p className="text-xs text-astrian-charcoal/50 dark:text-gray-400">{item.instructor} • {item.duration}</p>
                        </div>
                        <span className="text-xs font-medium text-astrian-charcoal/40 dark:text-gray-500">{item.date}</span>
                      </div>
                    ))}
                  </Card>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: BOOKED CLASSES */}
          {activeTab === "classes" && (
            <motion.div
              key="classes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-display text-astrian-charcoal dark:text-gray-100">My Booked Sessions</h2>
                  <p className="text-sm text-astrian-charcoal/60 dark:text-gray-400 font-light">View and manage your upcoming reserved yoga studio slots.</p>
                </div>
                <Link href="/schedule">
                  <Button variant="primary" size="sm" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Book New Session
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingClasses.map((item) => (
                  <Card key={item.id} className="p-6 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                          {item.status}
                        </span>
                        <span className="text-xs text-astrian-charcoal/40 dark:text-gray-500">Ticket ID: #{item.id}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold font-display text-astrian-charcoal dark:text-gray-100 mb-2">{item.title}</h3>
                      <p className="text-sm font-medium text-astrian-sage dark:text-astrian-leaf mb-4">{item.time}</p>
                      
                      <div className="space-y-1.5 text-xs text-astrian-charcoal/70 dark:text-gray-300 font-light">
                        <p><strong>Guide:</strong> {item.instructor}</p>
                        <p><strong>Studio Space:</strong> {item.location}</p>
                        <p><strong>Studio Pass:</strong> Free Trial Session</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-astrian-clay/60 dark:border-white/5 flex gap-3">
                      <Button variant="secondary" size="sm" className="w-full">
                        Reschedule
                      </Button>
                      <button className="w-full py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 rounded-xl transition-colors cursor-pointer">
                        Cancel Slot
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: ACCOUNT SETTINGS */}
          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold font-display text-astrian-charcoal dark:text-gray-100">Account & Practice Settings</h2>
                <p className="text-sm text-astrian-charcoal/60 dark:text-gray-400 font-light">Customize your personal details, yoga preferences, and notifications.</p>
              </div>

              {isSavedSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm font-semibold"
                >
                  <Check className="h-5 w-5" />
                  Your settings have been saved successfully!
                </motion.div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-8">
                
                {/* Personal Information */}
                <Card className="p-8 space-y-6">
                  <h3 className="text-lg font-bold font-display text-astrian-charcoal dark:text-gray-100 flex items-center gap-2">
                    <User className="h-5 w-5 text-astrian-sage" /> Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-astrian-clay dark:border-white/10 bg-astrian-oat/50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 text-sm focus:border-astrian-sage outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="emailAddr" className="block text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="emailAddr"
                        value={user.email || ""}
                        disabled
                        className="w-full px-4 py-3 rounded-2xl border border-astrian-clay/50 dark:border-white/5 bg-astrian-clay/20 dark:bg-[#121413]/50 text-astrian-charcoal/50 dark:text-gray-500 text-sm outline-none cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneNo" className="block text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phoneNo"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-astrian-clay dark:border-white/10 bg-astrian-oat/50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 text-sm focus:border-astrian-sage outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="emContact" className="block text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        id="emContact"
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-astrian-clay dark:border-white/10 bg-astrian-oat/50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 text-sm focus:border-astrian-sage outline-none"
                      />
                    </div>
                  </div>
                </Card>

                {/* Practice Preferences */}
                <Card className="p-8 space-y-6">
                  <h3 className="text-lg font-bold font-display text-astrian-charcoal dark:text-gray-100 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-astrian-sage" /> Yoga & Wellness Preferences
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="skillSelect" className="block text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Experience Level
                      </label>
                      <select
                        id="skillSelect"
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-astrian-clay dark:border-white/10 bg-astrian-oat/50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 text-sm focus:border-astrian-sage outline-none cursor-pointer"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="goalSelect" className="block text-xs font-semibold text-astrian-charcoal/70 dark:text-gray-300 uppercase tracking-wider mb-2">
                        Primary Goal
                      </label>
                      <select
                        id="goalSelect"
                        value={primaryGoal}
                        onChange={(e) => setPrimaryGoal(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-astrian-clay dark:border-white/10 bg-astrian-oat/50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 text-sm focus:border-astrian-sage outline-none cursor-pointer"
                      >
                        <option value="Flexibility & Stress Relief">Flexibility & Stress Relief</option>
                        <option value="Core Strength & Toning">Core Strength & Toning</option>
                        <option value="Breath & Meditation Depth">Breath & Meditation Depth</option>
                        <option value="Overall Well-being">Overall Well-being</option>
                      </select>
                    </div>
                  </div>
                </Card>

                {/* Notifications & Security */}
                <Card className="p-8 space-y-6">
                  <h3 className="text-lg font-bold font-display text-astrian-charcoal dark:text-gray-100 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-astrian-sage" /> Notifications & Reminders
                  </h3>

                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="text-sm font-semibold text-astrian-charcoal dark:text-gray-100">Email Class Reminders</p>
                        <p className="text-xs text-astrian-charcoal/60 dark:text-gray-400">Receive booking confirmations and 2-hour class reminders.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        className="h-5 w-5 accent-astrian-sage rounded cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer border-t border-astrian-clay/60 dark:border-white/5 pt-4">
                      <div>
                        <p className="text-sm font-semibold text-astrian-charcoal dark:text-gray-100">SMS Updates</p>
                        <p className="text-xs text-astrian-charcoal/60 dark:text-gray-400">Get instant text alerts for schedule or instructor changes.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={smsNotifications}
                        onChange={(e) => setSmsNotifications(e.target.checked)}
                        className="h-5 w-5 accent-astrian-sage rounded cursor-pointer"
                      />
                    </label>
                  </div>
                </Card>

                {/* Submit button */}
                <div className="flex justify-end">
                  <Button type="submit" variant="primary" size="lg" className="flex items-center gap-2">
                    <Save className="h-4.5 w-4.5" /> Save Profile Changes
                  </Button>
                </div>

              </form>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-astrian-oat dark:bg-[#121413] pt-32 pb-24 flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-astrian-sage border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
