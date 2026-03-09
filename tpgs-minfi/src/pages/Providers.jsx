import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Mail,
  Phone,
  Award,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Plus,
  Eye,
  Edit,
} from "lucide-react";
import { clsx } from "clsx";
import { providers } from "../data/mock.js";
import { useAppStore, ROLES } from "../store/index.js";

export default function Providers() {
  const { t } = useTranslation();
  const { activeRole } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState("all");

  const canEdit = activeRole === ROLES.HRM || activeRole === ROLES.TECH;

  const filteredProviders = providers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterActive === "all" ||
      (filterActive === "active" && p.active) ||
      (filterActive === "inactive" && !p.active);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: providers.length,
    active: providers.filter((p) => p.active).length,
    inactive: providers.filter((p) => !p.active).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {t("nav.providers")}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Annuaire des organismes de formation partenaires du MINFI
          </p>
        </div>
        {canEdit && (
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            Ajouter un prestataire
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl border"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Total
          </p>
          <p
            className="text-2xl font-black mt-1"
            style={{ color: "var(--text-primary)" }}
          >
            {stats.total}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-2xl border"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Actifs
          </p>
          <p className="text-2xl font-black mt-1" style={{ color: "#34D399" }}>
            {stats.active}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl border"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Inactifs
          </p>
          <p className="text-2xl font-black mt-1" style={{ color: "#F87171" }}>
            {stats.inactive}
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            type="text"
            placeholder="Rechercher un prestataire..."
            className="input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterActive("all")}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
              filterActive === "all"
                ? "bg-themed-hover"
                : "hover:bg-themed-hover",
            )}
            style={{
              color:
                filterActive === "all"
                  ? "var(--text-primary)"
                  : "var(--text-muted)",
            }}
          >
            Tous
          </button>
          <button
            onClick={() => setFilterActive("active")}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
              filterActive === "active"
                ? "bg-emerald-400/10 text-emerald-400"
                : "hover:bg-themed-hover",
            )}
            style={{
              color:
                filterActive === "active" ? "#34D399" : "var(--text-muted)",
            }}
          >
            Actifs
          </button>
          <button
            onClick={() => setFilterActive("inactive")}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
              filterActive === "inactive"
                ? "bg-red-400/10 text-red-400"
                : "hover:bg-themed-hover",
            )}
            style={{
              color:
                filterActive === "inactive" ? "#F87171" : "var(--text-muted)",
            }}
          >
            Inactifs
          </button>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProviders.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-5 rounded-2xl border"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border)",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--bg-hover)" }}
                >
                  <Building2 size={20} style={{ color: "#EC4899" }} />
                </div>
                <div>
                  <h3
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {provider.name}
                  </h3>
                  <span
                    className={clsx(
                      "inline-flex items-center gap-1 text-xs font-bold",
                      provider.active ? "text-emerald-400" : "text-red-400",
                    )}
                  >
                    {provider.active ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <XCircle size={12} />
                    )}
                    {provider.active ? "Actif" : "Inactif"}
                  </span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <Award size={14} className="flex-shrink-0" />
                <span className="truncate">{provider.agrement}</span>
              </div>
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-pink-400/20 flex items-center justify-center text-[10px] font-bold text-pink-400">
                  S
                </span>
                <span className="truncate">{provider.specialization}</span>
              </div>
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <Mail size={14} className="flex-shrink-0" />
                <span className="truncate">{provider.email}</span>
              </div>
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <Phone size={14} className="flex-shrink-0" />
                <span className="truncate">{provider.phone}</span>
              </div>
            </div>

            {/* Actions */}
            {canEdit && (
              <div
                className="flex items-center gap-2 mt-4 pt-4 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <button className="btn-ghost flex-1 flex items-center justify-center gap-1 text-xs">
                  <Eye size={14} />
                  Voir
                </button>
                <button className="btn-ghost flex-1 flex items-center justify-center gap-1 text-xs">
                  <Edit size={14} />
                  Modifier
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center py-12">
          <Building2
            size={48}
            className="mx-auto mb-4"
            style={{ color: "var(--text-muted)" }}
          />
          <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
            Aucun prestataire trouvé
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Essayez avec d'autres critères de recherche
          </p>
        </div>
      )}
    </div>
  );
}
