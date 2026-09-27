"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/');
      } else {
        setSession(data.session);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push('/');
      else setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#050505]">
        <p className="text-gray-400 animate-pulse">Securing your session...</p>
      </main>
    );
  }

  const email = session?.user?.email || "Founder";

  return (
    <main className="min-h-screen bg-[#050505] p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>

      {/* Top Bar */}
      <div className="z-10 flex items-center justify-between max-w-6xl mx-auto mb-12">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300">TenderAI</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm hidden sm:block">{email}</span>
          <button onClick={handleLogout} className="glass-card px-4 py-2 text-sm text-white cursor-pointer">Logout</button>
        </div>
      </div>

      {/* Welcome */}
      <div className="z-10 max-w-6xl mx-auto mb-10">
        <h2 className="text-4xl font-bold text-white mb-2">Welcome back 👋</h2>
        <p className="text-gray-400">Your secure workspace. Everything here is protected by military-grade security.</p>
      </div>

      {/* Workspace Cards */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Link href="/dashboard/vault" className="glass-card p-8 block cursor-pointer">
          <h3 className="text-xl font-bold text-white mb-3">📚 Knowledge Vault</h3>
          <p className="text-gray-400 mb-6">Upload your company info and past proposals. The AI learns YOUR voice.</p>
          <span className="glow-btn text-white text-sm w-full block text-center">Open Vault →</span>
        </Link>

        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-white mb-3">⚡ Proposal Generator</h3>
          <p className="text-gray-400 mb-6">Paste a tender question. Get a winning, formatted answer in seconds.</p>
          <button className="glow-btn text-white text-sm w-full">Coming in Step 6</button>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-white mb-3">📁 My Proposals</h3>
          <p className="text-gray-400 mb-6">Every proposal you generate, saved and versioned here.</p>
          <button className="glow-btn text-white text-sm w-full">Coming in Step 6</button>
        </div>
      </div>
    </main>
  );
}