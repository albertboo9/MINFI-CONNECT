import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Eye,
  Building2,
  DollarSign,
  Calendar,
  Users,
  Award,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { clsx } from "clsx";
import { trainingRequests } from "../data/mock.js";
import { useAppStore, ROLES } from "../store/index.js";
import { toast } from "../store/toastStore.js";
import Modal from "../components/ui/Modal.jsx";

const CAT_THEMES = {
  job: { label: "Métier", badge: "badge-emerald", color: "#10B981" },
  transversal: { label: "Transversale", badge: "badge-blue", color: "#3B82F6" },
  specific: { label: "Spécifique", badge: "badge-gold", color: "#F59E0B" },
  executive: { label: "Executive", badge: "badge-purple", color: "#8B5CF6" },
};

export default function Validations() {
  const { t } = useTranslation();
  const { activeRole, currentUser } = useAppStore();
  const [requests, setRequests] = useState(
    trainingRequests.filter((r) => r.status === "pending"),
  );
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const stats = {
    pending: requests.length,
    approved: trainingRequests.filter((r) => r.status === "approved").length,
    rejected: trainingRequests.filter((r) => r.status === "rejected").length,
  };

  const handleApprove = (request) => {
    setRequests(requests.filter((r) => r.id !== request.id));
    toast.success(`Formation "${request.title}" approuvée`, {
      title: " Publiée dans le catalogue ✓",
    });
    setShowDetailModal(false);
  };

  const handleReject = (request) => {
    if (!rejectionReason.trim()) {
      toast.error("Veuillez fournir un motif de rejet");
      return;
    }
    setRequests(requests.filter((r) => r.id !== request.id));
    toast.info(`Formation "${request.title}" rejetée`, {
      title: "Motif: " + rejectionReason,
    });
    setRejectionReason("");
    setShowDetailModal(false);
  };

  const openDetail = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const getCategoryBadge = (category) => {
    const theme = CAT_THEMES[category] || CAT_THEMES.transversal;
    return <span className={clsx("badge", theme.badge)}>{theme.label}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {t("nav.validations")}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Valider les demandes de publication des formations
        </p>
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
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-yellow-400/10">
              <Clock size={20} className="text-yellow-400" />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                En attente
              </p>
              <p className="text-2xl font-black" style={{ color: "#FACC15" }}>
                {stats.pending}
              </p>
            </div>
          </div>
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
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-400/10">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Approuvées
              </p>
              <p className="text-2xl font-black" style={{ color: "#34D399" }}>
                {stats.approved}
              </p>
            </div>
          </div>
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
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-400/10">
              <XCircle size={20} className="text-red-400" />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Rejetées
              </p>
              <p className="text-2xl font-black" style={{ color: "#F87171" }}>
                {stats.rejected}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Requests List */}
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
            Demandes en attente
          </h2>
        </div>

        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {requests.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle2
                size={48}
                className="mx-auto mb-4 text-emerald-400"
              />
              <p
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Aucune demande en attente
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                Toutes les demandes ont été traitées
              </p>
            </div>
          ) : (
            requests.map((request) => (
              <div
                key={request.id}
                className="p-4 flex items-center gap-4 hover:bg-themed-hover cursor-pointer transition-colors"
                onClick={() => openDetail(request)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className="font-semibold truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {request.title}
                    </h3>
                    {getCategoryBadge(request.category)}
                  </div>
                  <div
                    className="flex items-center gap-4 mt-1 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span className="flex items-center gap-1">
                      <Building2 size={12} />
                      {request.providerName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {request.submittedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={12} />
                      {request.cost.toLocaleString()} FCF
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDetail(request);
                    }}
                    className="btn-ghost flex items-center gap-1"
                  >
                    <Eye size={14} />
                    Voir
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={selectedRequest?.title || "Détails de la demande"}
        size="lg"
        footer={
          selectedRequest && (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => handleReject(selectedRequest)}
                className="btn-danger flex items-center gap-2"
              >
                <XCircle size={16} />
                Rejeter
              </button>
              <button
                onClick={() => handleApprove(selectedRequest)}
                className="btn-primary flex items-center gap-2"
              >
                <CheckCircle2 size={16} />
                Approuver et publier
              </button>
            </div>
          )
        }
      >
        {selectedRequest && (
          <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {getCategoryBadge(selectedRequest.category)}
                  <span className="badge badge-gray">
                    {selectedRequest.level}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Soumise le {selectedRequest.submittedAt}
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-2xl font-black"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedRequest.cost.toLocaleString()} FCF
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {selectedRequest.isFree
                    ? "Formation gratuite"
                    : "Formation payante"}
                </p>
              </div>
            </div>

            {/* Provider */}
            <div
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: "var(--bg-hover)",
                borderColor: "var(--border)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Prestataire
              </p>
              <p
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {selectedRequest.providerName}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  borderColor: "var(--border)",
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Durée
                </p>
                <p
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedRequest.duration}
                </p>
              </div>
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  borderColor: "var(--border)",
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Heures
                </p>
                <p
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedRequest.hours}
                </p>
              </div>
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  borderColor: "var(--border)",
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Lieu
                </p>
                <p
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedRequest.location}
                </p>
              </div>
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  borderColor: "var(--border)",
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Participants max
                </p>
                <p
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedRequest.maxParticipants}
                </p>
              </div>
            </div>

            {/* Objectives */}
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Objectifs pédagogiques
              </p>
              <ul className="space-y-1">
                {(selectedRequest.objectives || []).map((obj, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <span className="text-emerald-400 mt-0.5">•</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Program */}
            {selectedRequest.program && (
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Programme
                </p>
                <div
                  className="p-4 rounded-xl whitespace-pre-line text-sm"
                  style={{
                    backgroundColor: "var(--bg-hover)",
                    color: "var(--text-primary)",
                  }}
                >
                  {selectedRequest.program}
                </div>
              </div>
            )}

            {/* Certification */}
            {selectedRequest.certification && (
              <div
                className="p-4 rounded-xl border flex items-center gap-3"
                style={{ borderColor: "var(--border)" }}
              >
                <Award size={20} className="text-purple-400" />
                <div>
                  <p
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Certification délivrée
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {selectedRequest.certificationName}
                  </p>
                </div>
              </div>
            )}

            {/* Rejection Reason */}
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Motif de rejet
              </p>
              <textarea
                className="textarea"
                rows={3}
                placeholder="Expliquez pourquoi cette demande est rejetée..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
