"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from '../../supabaseClient';

type VaultDoc = {
  id: string;
  document_name: string;
  content: string;
  created_at: string;
};

export default function Vault() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [docs, setDocs] = useState<VaultDoc[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [saving, setSaving] = useState(false);
  const [docName, setDocName] = useState("");
  const [docContent, setDocContent] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // 🔐 THE SECURITY GUARD
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/');
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  const fetchDocs = useCallback(async () => {
    const { data, error } = await supabase
      .from('knowledge_vault')
      .select('id, document_name, content, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Fetch error:", error.message);
    } else if (data) {
      setDocs(data);
    }
    setLoadingDocs(false);
  }, []);

  useEffect(() => {
    if (!checking) {
      fetchDocs();
    }
  }, [checking, fetchDocs]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      setMessageType("error");
      setMessage("Session expired. Please log in again.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from('knowledge_vault')
      .insert({
        user_id: session.user.id,
        document_name: docName.trim(),
        content: docContent,
      });

    if (error) {
      setMessageType("error");
      setMessage("Error: " + error.message);
    } else {
      setMessageType("success");
      setMessage("Saved! The AI will learn from this document.");
      setDocName("");
      setDocContent("");
      await fetchDocs();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('knowledge_vault')
      .delete()
      .eq('id', id);

    if (!error) {
      setDocs(docs.filter((d) => d.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#050505]">
        <p className="text-gray-400 animate-pulse">Securing your session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>

      {/* Top Bar */}
      <div className="z-10 flex items-center justify-between max-w-6xl mx-auto mb-10">
        <Link href="/dashboard" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300">
          TenderAI
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="glass-card px-4 py-2 text-sm text-white cursor-pointer">
            ← Dashboard
          </Link>
          <button onClick={handleLogout} className="glass-card px-4 py-2 text-sm text-white cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="z-10 max-w-6xl mx-auto mb-10">
        <h2 className="text-4xl font-bold text-white mb-2">📚 Knowledge Vault</h2>
        <p className="text-gray-400">
          Feed the AI your company's voice. Paste your company profile, past winning proposals,
          case studies, and technical specs. Only YOU can ever see these.
        </p>
      </div>

      {/* Add Document Form */}
      <div className="z-10 max-w-6xl mx-auto mb-12">
        <form onSubmit={handleSave} className="glass-card p-8 flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white">Add a New Document</h3>
          <input
            type="text"
            placeholder="Document name (e.g. Company Profile 2025)"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            required
            maxLength={100}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
          />
          <textarea
            placeholder="Paste the full content here: company history, services, past projects, certifications, pricing approach..."
            value={docContent}
            onChange={(e) => setDocContent(e.target.value)}
            required
            rows={8}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-y"
          />
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <span className="text-gray-500 text-xs">{docContent.length} characters</span>
            <button
              type="submit"
              disabled={saving || !docName.trim() || !docContent.trim()}
              className="glow-btn text-white font-semibold disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save to Vault"}
            </button>
          </div>
          {message && (
            <p className={messageType === "success" ? "text-violet-400 text-sm font-semibold" : "text-red-400 text-sm font-semibold"}>
              {message}
            </p>
          )}
        </form>
      </div>

      {/* Documents List */}
      <div className="z-10 max-w-6xl mx-auto pb-16">
        <h3 className="text-xl font-bold text-white mb-6">Your Documents ({docs.length})</h3>
        {loadingDocs ? (
          <p className="text-gray-400 animate-pulse">Opening your vault...</p>
        ) : docs.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-400">Your vault is empty. Add your first document above — the richer the vault, the smarter the AI.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {docs.map((doc) => (
              <div key={doc.id} className="glass-card p-6">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h4 className="text-lg font-bold text-white break-words">{doc.document_name}</h4>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-400 hover:text-red-300 text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {doc.content.slice(0, 150)}
                  {doc.content.length > 150 ? "..." : ""}
                </p>
                <p className="text-gray-600 text-xs mt-3">
                  Saved {new Date(doc.created_at).toLocaleDateString()} · {doc.content.length} characters
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}