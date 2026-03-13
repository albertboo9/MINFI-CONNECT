// src/components/ui/PauseModal.jsx
import React, { useState } from "react";
import {
  Pause,
  Calendar,
  FileText,
  AlertCircle,
  Send,
  Clock,
  Heart,
  Briefcase,
  Users,
  HelpCircle,
} from "lucide-react";
import Modal from "./Modal.jsx";

const PAUSE_REASONS = [
  { value: "sante", label: "Santé / Maladie", icon: Heart },
  { value: "familial", label: "Raisons familiales", icon: Users },
  { value: "professionnel", label: "Motif professionnel", icon: Briefcase },
  { value: "autre", label: "Autre motif", icon: HelpCircle },
];

export default function PauseModal({ open, onClose, training, onSubmit }) {
  const [formData, setFormData] = useState({
    reason: "",
    startDate: "",
    endDate: "",
    justification: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.reason) {
      newErrors.reason = "Sélectionnez un motif";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Indiquez la date de début";
    }
    if (!formData.endDate) {
      newErrors.endDate = "Indiquez la date de fin";
    }
    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    ) {
      newErrors.endDate = "La date de fin doit être après le début";
    }
    if (!formData.justification || formData.justification.length < 10) {
      newErrors.justification =
        "Veuillez fournir une justification (min 10 caractères)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      reason: formData.reason,
      startDate: formData.startDate,
      endDate: formData.endDate,
      justification: formData.justification,
    });
    onClose();
  };

  const calculateDuration = () => {
    if (!formData.startDate || !formData.endDate) return null;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  };

  const duration = calculateDuration();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2">
          <Pause size={20} className="text-amber-400" />
          Demande de pause
        </span>
      }
      subtitle={training?.title}
      size="md"
      footer={
        <div className="flex gap-3 flex-wrap">
          <button type="button" onClick={onClose} className="btn-ghost">
            Annuler
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn-primary flex items-center gap-2"
          >
            <Send size={16} />
            Soumettre la demande
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Info sur les pauses */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <p className="text-xs text-amber-400">
            <strong>Note:</strong> Vous pouvez demander jusqu'à 3 pauses par
            formation. Actuellement: {training?.pauses?.length || 0}/3 pauses
            demandées.
          </p>
        </div>

        {/* Motif */}
        <div>
          <label className="section-label flex items-center gap-2 mb-3">
            <Briefcase size={14} />
            Motif de la pause <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PAUSE_REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, reason: r.value }))
                  }
                  className={`p-3 rounded-xl text-left text-xs font-medium transition-all border flex items-center gap-2 ${
                    formData.reason === r.value
                      ? "bg-amber-400/20 border-amber-400 text-amber-400"
                      : "bg-themed-hover border-themed hover:border-themed-muted text-themed-muted"
                  }`}
                >
                  <Icon size={16} />
                  {r.label}
                </button>
              );
            })}
          </div>
          {errors.reason && (
            <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.reason}
            </p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="section-label flex items-center gap-2 mb-3">
              <Calendar size={14} />
              Date de début <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="input"
            />
            {errors.startDate && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors.startDate}
              </p>
            )}
          </div>

          <div>
            <label className="section-label flex items-center gap-2 mb-3">
              <Calendar size={14} />
              Date de fin <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="input"
            />
            {errors.endDate && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors.endDate}
              </p>
            )}
          </div>
        </div>

        {/* Justification */}
        <div>
          <label className="section-label flex items-center gap-2 mb-3">
            <FileText size={14} />
            Justification <span className="text-red-400">*</span>
          </label>
          <textarea
            value={formData.justification}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                justification: e.target.value,
              }))
            }
            className="input min-h-[100px] resize-none"
            placeholder="Veuillez justifier votre demande de pause..."
          />
          {errors.justification && (
            <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.justification}
            </p>
          )}
        </div>

        {/* Résumé */}
        {duration && (
          <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20">
            <h4 className="text-xs font-bold text-amber-400 mb-2">
              Récapitulatif de la demande
            </h4>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-lg font-black text-amber-400">
                  {duration} jour{duration > 1 ? "s" : ""}
                </p>
                <p className="text-[10px] text-themed-muted">Durée</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-amber-400">
                  {formData.startDate} → {formData.endDate}
                </p>
                <p className="text-[10px] text-themed-muted">Période</p>
              </div>
            </div>
          </div>
        )}

        {/* Avertissement */}
        <div className="p-3 rounded-xl bg-themed-hover border border-themed">
          <p className="text-[10px] text-themed-muted">
            <Clock size={12} className="inline mr-1" />
            Votre demande sera soumise pour approbation au service formation.
            Pendant la pause, vous ne pourrez pas avancer dans votre formation.
          </p>
        </div>
      </form>
    </Modal>
  );
}
