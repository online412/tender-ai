"use client";

import { useState, useEffect } from "react";
import { supabase } from './supabaseClient'; // Import our secure vault!

export default function Home() {
  const [language, setLanguage] = useState("EN"); // Default is English
  const [email, setEmail] = useState(""); // The user's email
  const [loading, setLoading] = useState(false); // Is the app sending the email?
  const [sent, setSent] = useState(false); // Did the email send successfully?

  // ✨ THE SMART LOCATION FEATURE ✨
  useEffect(() => {
    const userLang = navigator.language.slice(0, 2).toUpperCase(); 
    if (["EN", "ES", "FR", "DE", "ZH", "AR", "PT"].includes(userLang)) {
      setLanguage(userLang);
    }
  }, []);

  // The Global Translation Vault (7 Core Business Languages)
  const translations = {
    EN: {
      title: "TenderAI",
      subtitle: "The Global AI Co-Pilot for RFPs & Tenders",
      hero: "Win government and corporate contracts in minutes, not weeks. Upload your documents. Let our secure AI write the perfect proposal.",
      cta: "Get Started Securely",
      login: "Sign in with Google",
      magicTitle: "Securely access your dashboard",
      magicPlaceholder: "Enter your business email",
      magicButton: "Send Magic Link",
      magicSuccess: "Check your inbox! We sent a secure login link.",
      feature1: "Military-Grade Security",
      feature1desc: "Zero data retention. Your trade secrets never train AI models.",
      feature2: "Global Language Support",
      feature2desc: "Write and respond in 50+ languages natively.",
      feature3: "Instant Proposal Generation",
      feature3desc: "Upload an RFP, get a completed, formatted response in seconds.",
    },
    ES: {
      title: "TenderAI",
      subtitle: "El Copiloto IA Global para Licitaciones",
      hero: "Gana contratos gubernamentales y corporativos en minutos. Sube tus documentos. Deja que nuestra IA segura escriba la propuesta perfecta.",
      cta: "Comenzar de Forma Segura",
      login: "Iniciar sesión con Google",
      magicTitle: "Accede a tu panel de forma segura",
      magicPlaceholder: "Introduce tu email de empresa",
      magicButton: "Enviar Enlace Mágico",
      magicSuccess: "Revisa tu bandeja de entrada. Hemos enviado un enlace seguro.",
      feature1: "Seguridad de Grado Militar",
      feature1desc: "Retención de datos cero. Tus secretos nunca entrenan modelos de IA.",
      feature2: "Soporte de Idiomas Global",
      feature2desc: "Escribe y responde en más de 50 idiomas de forma nativa.",
      feature3: "Generación Instantánea de Propuestas",
      feature3desc: "Sube una licitación, obtén una respuesta completada en segundos.",
    },
    FR: {
      title: "TenderAI",
      subtitle: "Le Copilote IA Global pour les Appels d'Offres",
      hero: "Gagnez des contrats gouvernementaux et corporatifs en minutes, pas en semaines. Téléchargez vos documents. Laissez notre IA sécurisée écrire la proposition parfaite.",
      cta: "Commencer en Toute Sécurité",
      login: "Se connecter avec Google",
      magicTitle: "Accédez à votre tableau de bord en toute sécurité",
      magicPlaceholder: "Entrez votre email professionnel",
      magicButton: "Envoyer le Lien Magique",
      magicSuccess: "Vérifiez votre boîte de réception ! Nous avons envoyé un lien de connexion sécurisé.",
      feature1: "Sécurité de Grade Militaire",
      feature1desc: "Zéro conservation des données. Vous secrets commerciaux ne entraînent jamais les modèles d'IA.",
      feature2: "Support Linguistique Global",
      feature2desc: "Écrivez et répondez dans plus de 50 langues nativement.",
      feature3: "Génération Instantanée de Propositions",
      feature3desc: "Téléchargez un appel d'offres, obtenez une réponse formatée en secondes.",
    },
    DE: {
      title: "TenderAI",
      subtitle: "Der Globale AI-Copilot für Ausschreibungen",
      hero: "Gewinnen Sie government und corporate Verträge in Minuten, nicht Wochen. Laden Sie Ihre Dokumente hoch. Lassen Sie unsere secure AI das perfekte Angebot schreiben.",
      cta: "Sicher Starten",
      login: "Mit Google anmelden",
      magicTitle: "Greifen Sie sicher auf Ihr Dashboard zu",
      magicPlaceholder: "Geben Sie Ihre Business-E-Mail ein",
      magicButton: "Magischen Link senden",
      magicSuccess: "Überprüfen Sie Ihren Posteingang! Wir haben einen sicheren Login-Link gesendet.",
      feature1: "Militärische Sicherheit",
      feature1desc: "Keine Datenspeicherung. Ihre Geschäftsgeheimnisse trainieren nie AI-Modelle.",
      feature2: "Globale Sprachunterstützung",
      feature2desc: "Schreiben und antworten Sie nativ in über 50 Sprachen.",
      feature3: "Instant Angebotserstellung",
      feature3desc: "Laden Sie eine Ausschreibung hoch, erhalten Sie in Sekunden eine formatierte Antwort.",
    },
    ZH: {
      title: "TenderAI",
      subtitle: "全球招投标 AI 副驾驶",
      hero: "在几分钟内赢得政府和企业合同，而不是几周。上传您的文件。让我们的安全 AI 编写完美的提案。",
      cta: "安全开始",
      login: "使用 Google 登录",
      magicTitle: "安全访问您的仪表板",
      magicPlaceholder: "输入您的企业邮箱",
      magicButton: "发送魔术链接",
      magicSuccess: "请检查您的收件箱！我们已发送一个安全登录链接。",
      feature1: "军事级安全",
      feature1desc: "零数据保留。您的商业机密绝不用于训练 AI 模型。",
      feature2: "全球语言支持",
      feature2desc: "原生支持 50 多种语言的书写和回应。",
      feature3: "即时提案生成",
      feature3desc: "上传招标文件，几秒钟内即可获得格式完整的回复。",
    },
    AR: {
      title: "TenderAI",
      subtitle: "مساعد الذكاء الاصطناعي العالمي للعطاءات",
      hero: "فوز بالعقود الحكومية والشركات في دقائق، وليس أسابيع. قم بتحميل مستنداتك. دع الذكاء الاصطناعي الآمن لدينا يكتب العرض المثالي.",
      cta: "ابدأ بأمان",
      login: "تسجيل الدخول باستخدام Google",
      magicTitle: "الوصول بأمان إلى لوحة التحكم الخاصة بك",
      magicPlaceholder: "أدخل بريدك الإلكتروني للعمل",
      magicButton: "إرسال الرابط السحري",
      magicSuccess: "تحقق من بريدك الوارد! لقد أرسلنا رابط تسجيل دخول آمن.",
      feature1: "أمان عسكري",
      feature1desc: "صفر بقاء البيانات. أسرارك التجارية لا تدرب نماذج الذكاء الاصطناعي أبداً.",
      feature2: "دعم اللغات العالمي",
      feature2desc: "الكتابة والرد بأكثر من 50 لغة بشكل أصلي.",
      feature3: "توليد العطاءات الفوري",
      feature3desc: "قم بتحميل طلب عطاء، واحصل على رد منسق في ثوانٍ.",
    },
    PT: {
      title: "TenderAI",
      subtitle: "O Copiloto IA Global para Licitações",
      hero: "Ganhe contratos governamentais e corporativos em minutos, não semanas. Carregue seus documentos. Deixe nossa IA segura escrever a proposta perfeita.",
      cta: "Comece com Segurança",
      login: "Entrar com Google",
      magicTitle: "Acesse seu painel com segurança",
      magicPlaceholder: "Digite seu e-mail corporativo",
      magicButton: "Enviar Link Mágico",
      magicSuccess: "Verifique sua caixa de entrada! Enviamos um link de login seguro.",
      feature1: "Segurança de Grau Militar",
      feature1desc: "Zero retenção de dados. Seus segredos comerciais nunca treinam modelos de IA.",
      feature2: "Suporte Global de Idiomas",
      feature2desc: "Escreva e responda nativamente em mais de 50 idiomas.",
      feature3: "Geração Instantânea de Propostas",
      feature3desc: "Carregue uma licitação, obtenha uma resposta formatada em segundos.",
    }
  };

  const t = translations[language as keyof typeof translations];

  // The Secure Login Logic!
  const handleMagicLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Tell Supabase to send a secure login link to this email
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin, // Sends them back to your app after they click the link
      },
    });

    if (error) {
      alert(error.message);
    } else {
      setSent(true); // Show the success message!
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glowing Orbs for 3D Depth */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>

      {/* Professional Language Dropdown (Top Right) */}
      <div className="absolute top-6 right-6 z-50">
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="glass-card appearance-none bg-transparent text-white px-4 py-2 rounded-[16px] text-sm font-medium cursor-pointer outline-none border-none"
        >
          <option value="EN" className="bg-gray-900">🇺🇸 English</option>
          <option value="ES" className="bg-gray-900">🇪🇸 Español</option>
          <option value="FR" className="bg-gray-900">🇫🇷 Français</option>
          <option value="DE" className="bg-gray-900">🇩🇪 Deutsch</option>
          <option value="ZH" className="bg-gray-900">🇨🇳 中文</option>
          <option value="AR" className="bg-gray-900">🇸🇦 العربية</option>
          <option value="PT" className="bg-gray-900">🇧🇷 Português</option>
        </select>
      </div>

      {/* Hero Section */}
      <div className="z-10 text-center max-w-4xl mb-16">
        <h1 className="text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300">
          {t.title}
        </h1>
        <p className="text-2xl font-light text-gray-300 mb-8">
          {t.subtitle}
        </p>
        <p className="text-lg text-gray-400 mb-12 leading-relaxed">
          {t.hero}
        </p>
        
        {/* ✨ THE SMOOTH SCROLLING BUTTON ✨ */}
        <button 
          onClick={() => document.getElementById('login-section')?.scrollIntoView({ behavior: 'smooth' })} 
          className="glow-btn text-white text-lg"
        >
          {t.cta}
        </button>
      </div>

      {/* Feature Cards (Glassmorphism) */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="glass-card p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">🛡️ {t.feature1}</h3>
            <p className="text-gray-400 leading-relaxed">{t.feature1desc}</p>
          </div>
        </div>
        
        <div className="glass-card p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">🌍 {t.feature2}</h3>
            <p className="text-gray-400 leading-relaxed">{t.feature2desc}</p>
          </div>
        </div>
        
        <div className="glass-card p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">⚡ {t.feature3}</h3>
            <p className="text-gray-400 leading-relaxed">{t.feature3desc}</p>
          </div>
        </div>
      </div>

      {/* ✨ THE SECURE LOGIN SECTION ✨ */}
      <div id="login-section" className="z-10 mt-16 glass-card p-8 text-center w-full max-w-md">
        
        {/* If the email hasn't been sent yet, show the form */}
        {!sent ? (
          <form onSubmit={handleMagicLogin} className="flex flex-col gap-4">
            <p className="text-gray-400 mb-2">{t.magicTitle}</p>
            <input 
              type="email" 
              placeholder={t.magicPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="glow-btn text-white font-semibold w-full disabled:opacity-50"
            >
              {loading ? "Sending..." : t.magicButton}
            </button>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-3 text-gray-500 text-xs">OR</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Google Placeholder (Coming Soon) */}
            <button className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-3 px-6 rounded-2xl hover:bg-gray-200 transition-all opacity-50 cursor-not-allowed" disabled>
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              {t.login} (Coming Soon)
            </button>
          </form>
        ) : (
          /* If the email was sent, show the success message! */
          <div className="flex flex-col gap-4 items-center">
            <div className="text-5xl">✉️</div>
            <p className="text-violet-400 font-bold text-lg">{t.magicSuccess}</p>
          </div>
        )}
      </div>
    </main>
  );
}