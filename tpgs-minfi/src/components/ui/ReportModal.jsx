// src/components/ui/ReportModal.jsx
import React, { useState } from "react";
import {
  FileText,
  Clock,
  AlertCircle,
  MessageSquare,
  TrendingUp,
  BookOpen,
  Send,
  CheckCircle,
} from "lucide-react";
import Modal from "./Modal.jsx";

const MODULE_OPTIONS = [
  "Module 1 - Introduction",
  "Module 2 - Fondamentaux",
  "Module 3 - Approfondissement",
  "Module 4 - Cas pratiques",
  "Module 5 - Évaluation",
  "Module 6 - Projet",
  "Module 7 - Révision",
  "Module 8 - Certification",
];

function getInitialData(training, isEditing) {
  if (isEditing && training?.reports?.length > 0) {
    const lastReport = training.reports[training.reports.length - 1];
    return {
      modulesStudied: lastReport.modulesStudied || [],
      timeSpent: lastReport.timeSpent || "",
      difficulties: lastReport.difficulties || "",
      comments: lastReport.comments || "",
      progress: lastReport.progress || training.progress || 0,
    };
  }
  return {
    modulesStudied: [],
    timeSpent: "",
    difficulties: "",
    comments: "",
    progress: training?.progress || 0,
  };
}

export default function ReportModal({
  open,
  onClose,
  training,
  onSubmit,
  isEditing = false,
}) {
  const [formData, setFormData] = useState(() =>
    getInitialData(training, isEditing),
  );
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (formData.modulesStudied.length === 0) {
      newErrors.modulesStudied = "Sélectionnez au moins un module";
    }
    if (!formData.timeSpent || parseFloat(formData.timeSpent) <= 0) {
      newErrors.timeSpent = "Indiquez le temps passé";
    }
    if (!formData.progress && formData.progress !== 0) {
      newErrors.progress = "Indiquez votre progression";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      modulesStudied: formData.modulesStudied,
      timeSpent: parseFloat(formData.timeSpent),
      difficulties: formData.difficulties,
      comments: formData.comments,
      progress: parseInt(formData.progress),
    });
    onClose();
  };

  const toggleModule = (module) => {
    const updated = formData.modulesStudied.includes(module)
      ? formData.modulesStudied.filter((m) => m !== module)
      : [...formData.modulesStudied, module];
    setFormData((prev) => ({ ...prev, modulesStudied: updated }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2">
          <FileText size={20} className="text-tpgs-emerald" />
          {isEditing ? "Modifier le rapport" : "Rapport de suivi"}
        </span>
      }
      subtitle={training?.title}
      size="lg"
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
            {isEditing ? "Mettre à jour" : "Soumettre le rapport"}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Modules étudiés */}
        <div>
          <label className="section-label flex items-center gap-2 mb-3">
            <BookOpen size={14} />
            Modules étudiés <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MODULE_OPTIONS.slice(0, training?.totalModules || 6).map(
              (module) => (
                <button
                  key={module}
                  type="button"
                  onClick={() => toggleModule(module)}
                  className={`p-3 rounded-xl text-left text-xs font-medium transition-all border ${
                    formData.modulesStudied.includes(module)
                      ? "bg-tpgs-emerald/20 border-tpgs-emerald text-tpgs-emerald"
                      : "bg-themed-hover border-themed hover:border-themed-muted text-themed-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {formData.modulesStudied.includes(module) && (
                      <CheckCircle size={14} />
                    )}
                    {module}
                  </span>
                </button>
              ),
            )}
          </div>
          {errors.modulesStudied && (
            <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.modulesStudied}
            </p>
          )}
        </div>

        {/* Temps passé et Progression */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="section-label flex items-center gap-2 mb-3">
              <Clock size={14} />
              Temps passé (heures) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="200"
              step="0.5"
              value={formData.timeSpent}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, timeSpent: e.target.value }))
              }
              className="input"
              placeholder="Ex: 8"
            />
            {errors.timeSpent && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors.timeSpent}
              </p>
            )}
          </div>

          <div>
            <label className="section-label flex items-center gap-2 mb-3">
              <TrendingUp size={14} />
              Progression <span className="text-red-400">*</span>
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-themed-muted">
                  {formData.progress}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={formData.progress}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    progress: parseInt(e.target.value),
                  }))
                }
                className="w-full accent-tpgs-emerald"
              />
              <div className="flex justify-between text-[10px] text-themed-muted font-mono">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            {errors.progress && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors.progress}
              </p>
            )}
          </div>
        </div>

        {/* Difficultés rencontrées */}
        <div>
          <label className="section-label flex items-center gap-2 mb-3">
            <AlertCircle size={14} />
            Difficultés rencontrées
          </label>
          <textarea
            value={formData.difficulties}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, difficulties: e.target.value }))
            }
            className="input min-h-[80px] resize-none"
            placeholder="Décrivez les difficultés rencontrées durante cette période..."
          />
        </div>

        {/* Commentaires */}
        <div>
          <label className="section-label flex items-center gap-2 mb-3">
            <MessageSquare size={14} />
            Commentaires supplémentaires
          </label>
          <textarea
            value={formData.comments}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, comments: e.target.value }))
            }
            className="input min-h-[80px] resize-none"
            placeholder="Observations, questions, suggestions..."
          />
        </div>

        {/* Résumé */}
        <div className="p-4 rounded-xl bg-tpgs-emerald/10 border border-tpgs-emerald/20">
          <h4 className="text-xs font-bold text-tpgs-emerald mb-2">
            Récapitulatif du rapport
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-black text-tpgs-emerald">
                {formData.modulesStudied.length}
              </p>
              <p className="text-[10px] text-themed-muted">Modules</p>
            </div>
            <div>
              <p className="text-lg font-black text-tpgs-emerald">
                {formData.timeSpent || 0}h
              </p>
              <p className="text-[10px] text-themed-muted">Temps</p>
            </div>
            <div>
              <p className="text-lg font-black text-tpgs-emerald">
                {formData.progress}%
              </p>
              <p className="text-[10px] text-themed-muted">Progression</p>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
