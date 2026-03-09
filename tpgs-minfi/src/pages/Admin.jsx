import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Users,
  Activity,
  Settings,
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  Trash2,
  Edit,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  Server,
  HardDrive,
  Cpu,
  Database,
  Bell,
  RefreshCw,
  Key,
  Lock,
  Globe,
  ChevronRight,
  ExternalLink,
  Terminal,
  Download,
  Zap,
} from "lucide-react";
import { clsx } from "clsx";
import { useAppStore, ROLES } from "../store/index.js";
import { teamMembers as allUsers, SYSTEM_LOGS } from "../data/mock.js";
import { toast } from "../store/toastStore.js";
import { useSound } from "../hooks/useSound.js";
import Modal from "../components/ui/Modal.jsx";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

/* ─── Components ───────────────────────────────────────── */

const StatMini = ({ label, value, icon: Icon, color = "emerald" }) => {
  const colorMap = {
    emerald: "text-tpgs-emerald bg-tpgs-emerald/10",
    blue: "text-blue-400 bg-blue-400/10",
    amber: "text-amber-400 bg-amber-400/10",
    purple: "text-purple-400 bg-purple-400/10",
  };
  return (
    <div className="card p-4 flex items-center gap-4">
      <div
        className={clsx(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          colorMap[color],
        )}
      >
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-themed-muted mb-0.5">
          {label}
        </p>
        <p className="text-xl font-black text-themed tracking-tight">{value}</p>
      </div>
    </div>
  );
};

/* ─── Main Admin Page ──────────────────────────────────── */

export default function Admin() {
  const { activeRole } = useAppStore();
  const { playClick } = useSound();
  const isAdmin = activeRole === ROLES.ADMIN;

  const [activeTab, setActiveTab] = useState("overview"); // overview | users | logs | settings

  // ADMIN has full access, TECH has limited access
  const availableTabs = isAdmin
    ? [
        { id: "overview", icon: Activity, label: "État" },
        { id: "users", icon: Users, label: "Utilisateurs" },
        { id: "logs", icon: Terminal, label: "Audit" },
        { id: "settings", icon: Settings, label: "Réglages" },
      ]
    : [
        { id: "overview", icon: Activity, label: "État" },
        { id: "users", icon: Users, label: "Utilisateurs" },
      ];
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Mots-clés pour le filtrage des logs
  const [logFilter, setLogFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    return allUsers.filter(
      (u) =>
        (roleFilter === "all" || u.role === roleFilter) &&
        (u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.matricule.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.department.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [searchQuery, roleFilter]);

  const filteredLogs = useMemo(() => {
    if (logFilter === "all") return SYSTEM_LOGS;
    return SYSTEM_LOGS.filter(
      (l) => l.status === logFilter || l.severity === logFilter,
    );
  }, [logFilter]);

  if (activeRole !== ROLES.TECH && activeRole !== ROLES.ADMIN) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-red-400/10 flex items-center justify-center text-red-400 mb-4 animate-bounce">
          <ShieldAlert size={40} />
        </div>
        <h1 className="text-2xl font-black text-themed">Accès Restreint</h1>
        <p className="text-sm text-themed-muted max-w-md">
          Cette zone est réservée à l'administration technique du Ministère des
          Finances. Veuillez contacter la DSI pour obtenir des privilèges
          élevés.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="btn-primary"
        >
          Retour au Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 animate-fade-in">
      {/* ── Header ───────────────────────────────────── */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-themed">
        <div>
          <h1 className="font-heading font-black text-4xl text-themed tracking-tight flex items-center gap-4">
            <Shield
              size={36}
              className={isAdmin ? "text-red-400" : "text-tpgs-cyan"}
            />
            {isAdmin ? "Administration Système" : "Gestion Technique"}
          </h1>
          <p className="text-sm mt-1 text-themed-muted flex items-center gap-2">
            <Terminal size={14} />{" "}
            {isAdmin
              ? "Back-office de gestion technique & audit sécurisé"
              : "Suivi des formations et inscriptions LMS"}
          </p>
        </div>
        <div className="flex p-1 bg-themed-hover rounded-2xl border border-themed shadow-inner">
          {availableTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                playClick();
                setActiveTab(t.id);
              }}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                activeTab === t.id
                  ? "bg-themed-card text-themed shadow-lg"
                  : "text-themed-muted hover:text-themed",
              )}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Tab: Overview ────────────────────────────── */}
      {activeTab === "overview" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatMini
              label="Uptime Système"
              value="14j 04h 22m"
              icon={RefreshCw}
              color="emerald"
            />
            <StatMini
              label="Utilisateurs Connectés"
              value="45"
              icon={Activity}
              color="blue"
            />
            <StatMini
              label="Charge CPU"
              value="2.4%"
              icon={Cpu}
              color="amber"
            />
            {isAdmin && (
              <StatMini
                label="Stockage Media"
                value="1.2 / 5 TB"
                icon={HardDrive}
                color="purple"
              />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-6">
              <h3 className="section-label mb-6">
                {isAdmin
                  ? "Activité Système (Dernières 24h)"
                  : "Activité Plateforme (Dernières 24h)"}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { t: "00:00", load: 12 },
                      { t: "04:00", load: 8 },
                      { t: "08:00", load: 45 },
                      { t: "12:00", load: 68 },
                      { t: "16:00", load: 52 },
                      { t: "20:00", load: 24 },
                    ]}
                  >
                    <defs>
                      <linearGradient
                        id="adminLoad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={isAdmin ? "#EF4444" : "#06B6D4"}
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor={isAdmin ? "#EF4444" : "#06B6D4"}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="var(--border)"
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="t"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                    />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="load"
                      stroke={isAdmin ? "#EF4444" : "#06B6D4"}
                      fillOpacity={1}
                      fill="url(#adminLoad)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card p-6 flex flex-col justify-between">
              <div>
                <h3 className="section-label mb-4">Statut des Services</h3>
                <div className="space-y-4">
                  {[
                    { name: "Core Engine (Vite)", status: "online", icon: Zap },
                    { name: "LMS Cloud Sync", status: "online", icon: Globe },
                    {
                      name: "Base Administrative",
                      status: "online",
                      icon: Database,
                    },
                    {
                      name: "Système d'Authentification",
                      status: "maintenance",
                      icon: Key,
                    },
                  ].map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-themed-hover/40 border border-themed"
                    >
                      <div className="flex items-center gap-3">
                        <s.icon
                          size={16}
                          className={
                            s.status === "online"
                              ? isAdmin
                                ? "text-red-400"
                                : "text-tpgs-cyan"
                              : "text-amber-400"
                          }
                        />
                        <span className="text-xs font-bold text-themed">
                          {s.name}
                        </span>
                      </div>
                      <span
                        className={clsx(
                          "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg",
                          s.status === "online"
                            ? isAdmin
                              ? "bg-red-400/10 text-red-400"
                              : "bg-tpgs-cyan/10 text-tpgs-cyan"
                            : "bg-amber-400/10 text-amber-400",
                        )}
                      >
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn-ghost w-full mt-6 text-[10px]">
                <RefreshCw size={12} className="mr-2" /> Redémarrer les services
                secondaires
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Tab: User Management ────────────────────── */}
      {activeTab === "users" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-themed-muted group-focus-within:text-tpgs-emerald"
              />
              <input
                className="input pl-12 h-12"
                placeholder="Rechercher par nom, matricule ou service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="select h-12 bg-themed-card min-w-[150px]"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">Tous les rôles</option>
                <option value="operator">Opérateur</option>
                <option value="manager">Manager</option>
                <option value="hrm">RH Manager</option>
                <option value="tech">Technique / Admin</option>
              </select>
              <button className="btn-primary h-12 px-6 shadow-xl shadow-tpgs-emerald/10">
                <UserPlus size={16} /> Créer un compte
              </button>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-themed-hover/50 text-[10px] font-black uppercase tracking-widest text-themed-muted border-b border-themed">
                    <th className="p-4">Utilisateur</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Dernière Connexion</th>
                    <th className="p-4">Statut Sécurité</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-themed">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-themed-hover/30 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-themed-hover flex items-center justify-center font-black text-xs text-tpgs-emerald border border-themed">
                            {user.initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-themed">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-themed-muted font-mono">
                              {user.matricule} · {user.role.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="badge badge-slate">
                          {user.department}
                        </span>
                      </td>
                      <td className="p-4 text-xs font-mono text-themed-muted">
                        {user.lastLogin || "-- -- --"}
                        <p className="text-[9px] opacity-40">{user.ip}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={clsx(
                              "w-2 h-2 rounded-full",
                              user.securityStatus === "safe"
                                ? "bg-tpgs-emerald"
                                : "bg-red-400",
                            )}
                          />
                          <span className="text-[10px] font-bold uppercase">
                            {user.securityStatus === "safe"
                              ? "Vérifié"
                              : "À surveiller"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-tpgs-emerald/10 hover:text-tpgs-emerald rounded-lg">
                            <Edit size={14} />
                          </button>
                          <button className="p-2 hover:bg-red-400/10 hover:text-red-400 rounded-lg">
                            <Lock size={14} />
                          </button>
                          <button className="p-2 hover:bg-red-400/10 hover:text-red-400 rounded-lg">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Tab: Audit Logs ──────────────────────────── */}
      {activeTab === "logs" && isAdmin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {["all", "success", "warning", "failed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setLogFilter(f)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                    logFilter === f
                      ? "bg-themed text-white border-themed"
                      : "bg-themed-card text-themed-muted border-themed hover:border-themed-muted",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="btn-ghost text-xs">
              <Download size={14} className="mr-2" /> Exporter les logs
              (.syslog)
            </button>
          </div>

          <div className="card bg-themed font-mono p-1 overflow-hidden">
            <div className="bg-[#0f172a] p-4 h-[500px] overflow-y-auto space-y-1 custom-scrollbar">
              <p className="text-[10px] text-themed-muted opacity-40 mb-4 tracking-tighter">
                [SYSTEM_SHELL_INIT] Initialisation du flux d'audit en temps
                réel...
              </p>
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex gap-4 text-[11px] group hover:bg-white/5 py-1 px-2 rounded-md transition-colors"
                >
                  <span className="text-themed-muted whitespace-nowrap">
                    [{log.timestamp}]
                  </span>
                  <span
                    className={clsx(
                      "font-black tracking-tight w-24",
                      log.status === "success"
                        ? "text-tpgs-emerald"
                        : log.status === "warning"
                          ? "text-amber-400"
                          : "text-red-400",
                    )}
                  >
                    {log.action}
                  </span>
                  <span className="text-white">
                    USER:{" "}
                    <span className="underline decoration-themed-muted/20 underline-offset-2">
                      {log.user}
                    </span>
                  </span>
                  <span className="text-themed-muted truncate">
                    TARGET: {log.target}
                  </span>
                  <span
                    className={clsx(
                      "ml-auto font-black text-[9px] px-1.5 rounded uppercase tracking-tighter",
                      log.severity === "high"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-white/5 text-themed-muted",
                    )}
                  >
                    {log.severity}
                  </span>
                </div>
              ))}
              <div className="animate-pulse flex items-center gap-2 pt-4">
                <div className="w-1.5 h-3 bg-tpgs-emerald" />
                <span className="text-[10px] text-tpgs-emerald font-black uppercase tracking-[0.2em]">
                  Flux en attente...
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Tab: Settings ────────────────────────────── */}
      {activeTab === "settings" && isAdmin && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="card p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-themed">
              <Shield size={20} className="text-tpgs-emerald" />
              <h3 className="section-label">Sécurité & Gouvernance</h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "Authentification forte (A2F)",
                  desc: "Imposer le code SMS pour les cadres",
                  active: true,
                },
                {
                  label: "Mode Maintenance",
                  desc: "Désactiver l'accès public temporairement",
                  active: false,
                },
                {
                  label: "Chiffrement de bout en bout",
                  desc: "Protection renforcée des livrets individuels",
                  active: true,
                },
                {
                  label: "Geler les budgets",
                  desc: "Bloquer toutes les nouvelles demandes",
                  active: false,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-xs font-bold text-themed">{s.label}</p>
                    <p className="text-[10px] text-themed-muted mt-0.5">
                      {s.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      playClick();
                      toast.info(`${s.label} mis à jour`);
                    }}
                    className={clsx(
                      "w-10 h-5 rounded-full relative transition-all duration-300",
                      s.active ? "bg-tpgs-emerald" : "bg-themed-hover",
                    )}
                  >
                    <div
                      className={clsx(
                        "absolute top-1 w-3 h-3 rounded-full bg-white transition-all",
                        s.active ? "left-6" : "left-1",
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-themed">
              <Globe size={20} className="text-blue-400" />
              <h3 className="section-label">Globalisation & Identité</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-themed-muted mb-2 block">
                  Langue par défaut (Portail)
                </label>
                <select className="select">
                  <option>Français (Cameroun)</option>
                  <option>English (Cameroon)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-themed-muted mb-2 block">
                  Thème visuel imposé
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-3 rounded-xl bg-[#0f172a] border-2 border-tpgs-emerald text-[9px] font-black text-white">
                    OBSIDIAN
                  </button>
                  <button className="p-3 rounded-xl bg-white border border-themed text-[9px] font-black text-slate-800">
                    SNOWY
                  </button>
                  <button className="p-3 rounded-xl bg-slate-800 border border-themed text-[9px] font-black text-white">
                    MINFI-BLUE
                  </button>
                </div>
              </div>
              <div className="pt-4">
                <button className="btn-primary w-full shadow-lg shadow-tpgs-emerald/20">
                  Sauvegarder les configurations
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
