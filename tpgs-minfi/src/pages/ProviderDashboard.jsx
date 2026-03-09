import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Send,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Eye,
  Trash2,
  Building2,
  Mail,
  Phone,
  Award,
} from "lucide-react";
import { clsx } from "clsx";
import { trainingRequests, providers } from "../data/mock.js";
import { useAppStore, ROLES } from "../store/index.js";
import { toast } from "../store/toastStore.js";
import Modal from "../components/ui/Modal.jsx";

const CAT_THEMES = {
  job: { label: "Métier", badge: "badge-emerald", color: "#10B981" },
  transversal: { label: "Transversale", badge: "badge-blue", color: "#3B82F6" },
  specific: { label: "Spécifique", badge: "badge-gold", color: "#F59E0B" },
  executive: { label: "Executive", badge: "badge-purple", color: "#8B5CF6" },
};

const LEVELS = [
  { value: "Débutant", label: "Débutant" },
  { value: "Intermédiaire", label: "Intermédiaire" },
  { value: "Avancé", label: "Avancé" },
  { value: "Expert", label: "Expert" },
  { value: "Tous niveaux", label: "Tous niveaux" },
];

const emptyForm = {
  title: "",
  category: "transversal",
  level: "Intermédiaire",
  duration: "",
  hours: "",
  cost: 0,
  isFree: false,
  location: "",
  isOnline: false,
  objectives: "",
  program: "",
  prerequisites: "",
  targetAudience: "",
  maxParticipants: 20,
  certification: false,
  certificationName: "",
};

function ProposeTrainingModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const { t } = useTranslation();
  const { currentUser } = useAppStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.duration || !form.location) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    onSubmit({
      ...form,
      providerId: currentUser.id || "p1",
      providerName: currentUser.name || "Cabinet Alpha Formation",
      source: "provider",
      status: "pending",
      submittedAt: new Date().toISOString().split("T")[0],
    });
    toast.success("Formation proposée avec succès", {
      title: "En attente de validation ✓",
    });
    setForm(emptyForm);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Proposer une formation"
      subtitle="Soumettre une nouvelle formation au catalogue MINFI"
      size="lg"
      footer={
        <>
          <button onClick={onClose} className="btn-ghost">
            Annuler
          </button>
          <button type="submit" form="propose-form" className="btn-primary">
            Soumettre
          </button>
        </>
      }
    >
      <form
        id="propose-form"
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="section-label mb-1.5 block">
              Titre de la formation *
            </label>
            <input
              className="input"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Ex: Excel Avancé - Fonctions avancées"
            />
          </div>

          <div>
            <label className="section-label mb-1.5 block">Catégorie *</label>
            <select
              className="input"
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
            >
              {Object.entries(CAT_THEMES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="section-label mb-1.5 block">Niveau *</label>
            <select
              className="input"
              value={form.level}
              onChange={(e) =>
                setForm((f) => ({ ...f, level: e.target.value }))
              }
            >
              {LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="section-label mb-1.5 block">Durée *</label>
            <input
              className="input"
              value={form.duration}
              onChange={(e) =>
                setForm((f) => ({ ...f, duration: e.target.value }))
              }
              placeholder="Ex: 3 jours"
            />
          </div>

          <div>
            <label className="section-label mb-1.5 block">Heures</label>
            <input
              className="input"
              value={form.hours}
              onChange={(e) =>
                setForm((f) => ({ ...f, hours: e.target.value }))
              }
              placeholder="Ex: 21h"
            />
          </div>

          <div>
            <label className="section-label mb-1.5 block">Coût (FCFA)</label>
            <input
              type="number"
              className="input"
              value={form.cost}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  cost: parseInt(e.target.value) || 0,
                  isFree: parseInt(e.target.value) === 0,
                }))
              }
              placeholder="0"
            />
          </div>

          <div className="flex items-center gap-4 pt-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFree}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    isFree: e.target.checked,
                    cost: e.target.checked ? 0 : f.cost,
                  }))
                }
                className="w-4 h-4 accent-tpgs-emerald"
              />
              <span className="text-xs font-bold text-themed">
                Formation gratuite
              </span>
            </label>
          </div>

          <div className="col-span-2">
            <label className="section-label mb-1.5 block">Lieu *</label>
            <input
              className="input"
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              placeholder="Ex: Yaoundé - Siège MINFI"
            />
          </div>

          <div className="col-span-2 flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isOnline}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isOnline: e.target.checked }))
                }
                className="w-4 h-4 accent-tpgs-blue"
              />
              <span className="text-xs font-bold text-themed">
                Disponible en ligne
              </span>
            </label>
          </div>

          <div className="col-span-2">
            <label className="section-label mb-1.5 block">
              Objectifs pédagogiques *
            </label>
            <textarea
              className="textarea"
              rows={3}
              value={form.objectives}
              onChange={(e) =>
                setForm((f) => ({ ...f, objectives: e.target.value }))
              }
              placeholder="列出 les objectifs de la formation (un par ligne)"
            />
          </div>

          <div className="col-span-2">
            <label className="section-label mb-1.5 block">
              Programme détaillé
            </label>
            <textarea
              className="textarea"
              rows={4}
              value={form.program}
              onChange={(e) =>
                setForm((f) => ({ ...f, program: e.target.value }))
              }
              placeholder="Décrivez le programme jour par jour"
            />
          </div>

          <div>
            <label className="section-label mb-1.5 block">Prérequis</label>
            <input
              className="input"
              value={form.prerequisites}
              onChange={(e) =>
                setForm((f) => ({ ...f, prerequisites: e.target.value }))
              }
              placeholder="Ex: Connaissance de base Excel"
            />
          </div>

          <div>
            <label className="section-label mb-1.5 block">Public cible</label>
            <input
              className="input"
              value={form.targetAudience}
              onChange={(e) =>
                setForm((f) => ({ ...f, targetAudience: e.target.value }))
              }
              placeholder="Ex: Agents des services financiers"
            />
          </div>

          <div>
            <label className="section-label mb-1.5 block">
              Participants max
            </label>
            <input
              type="number"
              className="input"
              value={form.maxParticipants}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  maxParticipants: parseInt(e.target.value) || 20,
                }))
              }
            />
          </div>

          <div className="flex items-center gap-4 pt-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.certification}
                onChange={(e) =>
                  setForm((f) => ({ ...f, certification: e.target.checked }))
                }
                className="w-4 h-4 accent-tpgs-purple"
              />
              <span className="text-xs font-bold text-themed">
                Délivrance d'une certification
              </span>
            </label>
          </div>

          {form.certification && (
            <div className="col-span-2">
              <label className="section-label mb-1.5 block">
                Nom de la certification
              </label>
              <input
                className="input"
                value={form.certificationName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, certificationName: e.target.value }))
                }
                placeholder="Ex: Certificat de compétence Excel Avancé"
              />
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default function ProviderDashboard() {
  const { t } = useTranslation();
  const { currentUser } = useAppStore();
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [proposals, setProposals] = useState(
    trainingRequests.filter(
      (r) => r.providerId === "p1" || r.providerName.includes("Alpha"),
    ),
  );

  const stats = {
    total: proposals.length,
    pending: proposals.filter((p) => p.status === "pending").length,
    approved: proposals.filter((p) => p.status === "approved").length,
    rejected: proposals.filter((p) => p.status === "rejected").length,
  };

  const handleSubmitProposal = (formData) => {
    const newProposal = {
      ...formData,
      id: `req-${Date.now()}`,
      objectives: formData.objectives.split("\n").filter((o) => o.trim()),
    };
    setProposals([newProposal, ...proposals]);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        icon: Clock,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        label: "En attente",
      },
      approved: {
        icon: CheckCircle2,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        label: "Approuvée",
      },
      rejected: {
        icon: XCircle,
        color: "text-red-400",
        bg: "bg-red-400/10",
        label: "Rejetée",
      },
    };
    const badge = badges[status];
    const Icon = badge.icon;
    return (
      <span
        className={clsx(
          "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold",
          badge.bg,
          badge.color,
        )}
      >
        <Icon size={12} />
        {badge.label}
      </span>
    );
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
            {t("nav.proposeTraining")}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {currentUser.name} - {currentUser.grade}
          </p>
        </div>
        <button
          onClick={() => setShowProposeModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Proposer une formation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
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
            En attente
          </p>
          <p className="text-2xl font-black mt-1" style={{ color: "#FACC15" }}>
            {stats.pending}
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
            Approuvées
          </p>
          <p className="text-2xl font-black mt-1" style={{ color: "#34D399" }}>
            {stats.approved}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
            Rejetées
          </p>
          <p className="text-2xl font-black mt-1" style={{ color: "#F87171" }}>
            {stats.rejected}
          </p>
        </motion.div>
      </div>

      {/* Proposals List */}
      <div
        className="rounded-2xl border"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
        }}
      >
        <div
          className="p-4 border-b flex items-center gap-2"
          style={{ borderColor: "var(--border)" }}
        >
          <FileText size={18} style={{ color: "var(--text-muted)" }} />
          <h2
            className="font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {t("nav.myProposals")}
          </h2>
        </div>

        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {proposals.length === 0 ? (
            <div className="p-8 text-center">
              <p style={{ color: "var(--text-muted)" }}>Aucune proposition</p>
              <button
                onClick={() => setShowProposeModal(true)}
                className="btn-ghost mt-4"
              >
                Proposer une formation
              </button>
            </div>
          ) : (
            proposals.map((proposal) => (
              <div key={proposal.id} className="p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className="font-semibold truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {proposal.title}
                    </h3>
                    {getStatusBadge(proposal.status)}
                  </div>
                  <div
                    className="flex items-center gap-4 mt-1 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span>{proposal.category}</span>
                    <span>•</span>
                    <span>{proposal.duration}</span>
                    <span>•</span>
                    <span>{proposal.cost.toLocaleString()} FCF</span>
                    <span>•</span>
                    <span>Soumis le {proposal.submittedAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-themed-hover">
                    <Eye size={16} style={{ color: "var(--text-muted)" }} />
                  </button>
                  {proposal.status === "pending" && (
                    <button className="p-2 rounded-lg hover:bg-themed-hover">
                      <Trash2
                        size={16}
                        style={{ color: "var(--text-muted)" }}
                      />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ProposeTrainingModal
        open={showProposeModal}
        onClose={() => setShowProposeModal(false)}
        onSubmit={handleSubmitProposal}
      />
    </div>
  );
}
