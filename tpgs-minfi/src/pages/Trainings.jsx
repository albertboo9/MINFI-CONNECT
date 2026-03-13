import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  Pause,
  CheckCircle2,
  Clock,
  ChevronRight,
  Play,
  FileText,
  Calendar,
  AlertTriangle,
  X,
  Send,
  Users,
  Search,
  AlertCircle,
  ExternalLink,
  Check,
  PauseCircle,
  PlayCircle,
  GraduationCap,
  BarChart3,
  Shield,
  Flag,
} from "lucide-react";
import {
  enrolledTrainings as initialEnrolledTrainings,
  TRAINING_STATUS,
  TRAINING_STATUS_CONFIG,
} from "../data/mock.js";
import { clsx } from "clsx";
import { useAppStore, ROLES } from "../store/index.js";
import Modal from "../components/ui/Modal.jsx";
import ReportModal from "../components/ui/ReportModal.jsx";
import PauseModal from "../components/ui/PauseModal.jsx";
import { toast } from "../store/toastStore.js";
import { useSound } from "../hooks/useSound.js";

// Configuration des statuts basée sur le nouveau modèle
const STATUS_CONFIG = {
  [TRAINING_STATUS.PLANNED]: {
    label: "Planifiée",
    badge: "badge-slate",
    icon: Clock,
    color: "#64748B",
  },
  [TRAINING_STATUS.REGISTERED]: {
    label: "Inscrite",
    badge: "badge-blue",
    icon: FileText,
    color: "#3B82F6",
  },
  [TRAINING_STATUS.IN_PROGRESS]: {
    label: "En cours",
    badge: "badge-emerald",
    icon: Play,
    color: "#10B981",
  },
  [TRAINING_STATUS.ON_PAUSE]: {
    label: "En pause",
    badge: "badge-gold",
    icon: PauseCircle,
    color: "#F59E0B",
  },
  [TRAINING_STATUS.DELAYED]: {
    label: "En retard",
    badge: "badge-red",
    icon: AlertTriangle,
    color: "#EF4444",
  },
  [TRAINING_STATUS.COMPLETED]: {
    label: "Terminée",
    badge: "badge-purple",
    icon: Flag,
    color: "#8B5CF6",
  },
  [TRAINING_STATUS.VALIDATED]: {
    label: "Validée",
    badge: "badge-emerald",
    icon: CheckCircle2,
    color: "#059669",
  },
  [TRAINING_STATUS.REJECTED]: {
    label: "Rejetée",
    badge: "badge-red",
    icon: X,
    color: "#DC2626",
  },
};

const FILTER_STATUSES = [
  { key: "all", label: "Toutes" },
  { key: TRAINING_STATUS.IN_PROGRESS, label: "En cours" },
  { key: TRAINING_STATUS.ON_PAUSE, label: "En pause" },
  { key: TRAINING_STATUS.DELAYED, label: "En retard" },
  { key: TRAINING_STATUS.COMPLETED, label: "Terminées" },
  { key: TRAINING_STATUS.VALIDATED, label: "Validées" },
];

/* ─── Carte de Formation ───────────────── */
function TrainingCard({ training, onClick, isTeamView = false }) {
  const cfg =
    STATUS_CONFIG[training.status] || STATUS_CONFIG[TRAINING_STATUS.PLANNED];
  const StatusIcon = cfg.icon;

  // Calculer si la formation nécessite une attention particulière
  const needsAttention = [
    TRAINING_STATUS.DELAYED,
    TRAINING_STATUS.ON_PAUSE,
  ].includes(training.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        "card p-5 cursor-pointer hover:border-tpgs-emerald/30 transition-all group",
        needsAttention && "border-l-4 border-l-amber-500",
      )}
      onClick={() => onClick(training)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={clsx("badge", cfg.badge)}>
              <StatusIcon size={10} /> {cfg.label}
            </span>
            {isTeamView && (
              <span className="badge badge-indigo font-bold tracking-tight">
                {training.employeeName}
              </span>
            )}
            {training.progress > 0 && training.progress < 100 && (
              <span className="text-[10px] font-mono text-themed-muted">
                {training.progress}% • {training.modulesCompleted}/
                {training.totalModules} modules
              </span>
            )}
          </div>
          <h3 className="font-bold text-sm mb-1 group-hover:text-tpgs-emerald transition-colors text-themed">
            {training.title}
          </h3>
          <p className="text-[10px] font-mono text-themed-muted">
            {training.provider}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[
            TRAINING_STATUS.IN_PROGRESS,
            TRAINING_STATUS.ON_PAUSE,
            TRAINING_STATUS.DELAYED,
          ].includes(training.status) && (
            <div className="text-right">
              <span
                className="text-xs font-black font-mono block"
                style={{ color: cfg.color }}
              >
                {training.progress}%
              </span>
              {training.nextReportDate &&
                training.status === TRAINING_STATUS.DELAYED && (
                  <span className="text-[9px] text-red-400">
                    Rapport en retard
                  </span>
                )}
            </div>
          )}
          <ChevronRight
            size={15}
            className="text-themed-muted group-hover:text-tpgs-emerald group-hover:translate-x-1 transition-all"
          />
        </div>
      </div>
      {/* Barre de progression */}
      {[
        TRAINING_STATUS.IN_PROGRESS,
        TRAINING_STATUS.ON_PAUSE,
        TRAINING_STATUS.DELAYED,
      ].includes(training.status) && (
        <div className="mt-4 progress-bar h-2 rounded-full bg-themed-hover overflow-hidden">
          <motion.div
            className="progress-fill h-full rounded-full"
            style={{
              backgroundColor: cfg.color,
              width: `${training.progress}%`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${training.progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      )}
    </motion.div>
  );
}

/* ─── Modale de Détail de Formation ───────────────── */
function TrainingDetailModal({
  training,
  open,
  onClose,
  onAction,
  isOperator = false,
  isTech = false,
}) {
  const { playClick } = useSound();
  const cfg =
    STATUS_CONFIG[training.status] || STATUS_CONFIG[TRAINING_STATUS.PLANNED];
  const StatusIcon = cfg.icon;

  if (!training) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={training.title}
      subtitle={training.provider}
      size="lg"
      footer={
        <div className="flex gap-3 flex-wrap">
          <button onClick={onClose} className="btn-ghost">
            Fermer
          </button>

          {/* Actions pour l'opérateur */}
          {isOperator && training.status === TRAINING_STATUS.PLANNED && (
            <button
              onClick={() => {
                onAction("start", training.id);
                onClose();
              }}
              className="btn-approve"
            >
              <PlayCircle size={16} /> Démarrer la formation
            </button>
          )}

          {isOperator && training.status === TRAINING_STATUS.IN_PROGRESS && (
            <>
              <button
                onClick={() => {
                  onAction("report", training.id);
                  onClose();
                }}
                className="btn-primary"
              >
                <FileText size={16} /> Soumettre un rapport
              </button>
              {training.pauses?.length < 3 && (
                <button
                  onClick={() => {
                    onAction("pause", training.id);
                    onClose();
                  }}
                  className="btn-ghost border border-amber-400 text-amber-400"
                >
                  <PauseCircle size={16} /> Demander une pause
                </button>
              )}
              {training.progress >= 100 && (
                <button
                  onClick={() => {
                    onAction("complete", training.id);
                    onClose();
                  }}
                  className="btn-approve"
                >
                  <Flag size={16} /> Déclarer terminée
                </button>
              )}
            </>
          )}

          {isOperator && training.status === TRAINING_STATUS.ON_PAUSE && (
            <button
              onClick={() => {
                onAction("resume", training.id);
                onClose();
              }}
              className="btn-approve"
            >
              <PlayCircle size={16} /> Reprendre la formation
            </button>
          )}

          {isOperator &&
            training.status === TRAINING_STATUS.COMPLETED &&
            !training.certificate && (
              <button
                onClick={() => {
                  onAction("certificate", training.id);
                  onClose();
                }}
                className="btn-primary"
              >
                <GraduationCap size={16} /> Déposer mon certificat
              </button>
            )}

          {isOperator &&
            training.status === TRAINING_STATUS.VALIDATED &&
            !training.evaluation && (
              <button
                onClick={() => {
                  onAction("evaluate", training.id);
                  onClose();
                }}
                className="btn-primary"
              >
                <BarChart3 size={16} /> Évaluer la formation
              </button>
            )}

          {/* Actions pour le service technique */}
          {isTech && training.status === TRAINING_STATUS.COMPLETED && (
            <>
              <button
                onClick={() => {
                  onAction("validate", training.id);
                  onClose();
                }}
                className="btn-approve"
              >
                <CheckCircle2 size={16} /> Valider la formation
              </button>
              <button
                onClick={() => {
                  onAction("reject", training.id);
                  onClose();
                }}
                className="btn-ghost border border-red-400 text-red-400"
              >
                <X size={16} /> Demander correction
              </button>
            </>
          )}

          {isTech && training.pauses?.some((p) => !p.approved) && (
            <button
              onClick={() => {
                onAction("approvePause", training.id);
                onClose();
              }}
              className="btn-primary"
            >
              <Check size={16} /> Approuver pause
            </button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* En-tête avec statut */}
        <div
          className="flex items-center justify-between p-4 rounded-xl"
          style={{ backgroundColor: `${cfg.color}15` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${cfg.color}20`, color: cfg.color }}
            >
              <StatusIcon size={24} />
            </div>
            <div>
              <p className="font-bold text-themed">{cfg.label}</p>
              <p className="text-xs text-themed-muted">
                {TRAINING_STATUS_CONFIG[training.status]?.description}
              </p>
            </div>
          </div>
          {training.certificate?.verified && (
            <span className="badge badge-emerald flex items-center gap-1">
              <CheckCircle2 size={12} /> Certificat vérifié
            </span>
          )}
        </div>

        {/* Progression et dates */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <p className="section-label mb-1 text-[10px]">Progression</p>
            <p className="text-2xl font-black" style={{ color: cfg.color }}>
              {training.progress}%
            </p>
            <p className="text-[10px] text-themed-muted">
              {training.modulesCompleted}/{training.totalModules} modules
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="section-label mb-1 text-[10px]">Démarrage</p>
            <p className="text-sm font-bold text-themed">
              {training.startDate || "-"}
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="section-label mb-1 text-[10px]">Fin prévue</p>
            <p className="text-sm font-bold text-themed">
              {training.expectedEndDate || "-"}
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="section-label mb-1 text-[10px]">Rapports</p>
            <p className="text-sm font-bold text-themed">
              {training.reports?.length || 0} soumis(s)
            </p>
          </div>
        </div>

        {/* Alertes si formation en retard ou en pause */}
        {training.status === TRAINING_STATUS.DELAYED && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <AlertTriangle size={18} />
              <span className="font-bold text-sm">Formation en retard</span>
            </div>
            <p className="text-xs text-themed-muted">
              Votre progression est insuffisante. Veuillez soumettre un rapport
              de suivi ou demander une pause.
            </p>
          </div>
        )}

        {training.status === TRAINING_STATUS.ON_PAUSE &&
          training.pauses?.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <PauseCircle size={18} />
                <span className="font-bold text-sm">Formation en pause</span>
              </div>
              <p className="text-xs text-themed-muted">
                {training.pauses[training.pauses.length - 1].reason}
              </p>
            </div>
          )}

        {/* Rapports récents */}
        {training.reports && training.reports.length > 0 && (
          <div>
            <p className="section-label flex items-center gap-2 mb-3">
              <FileText size={14} /> Historique des rapports
            </p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {training.reports
                .slice(-3)
                .reverse()
                .map((report, i) => (
                  <div
                    key={report.id}
                    className="card p-3 flex justify-between items-start"
                  >
                    <div>
                      <p className="text-xs font-bold text-themed">
                        {report.date}
                      </p>
                      <p className="text-[10px] text-themed-muted">
                        {report.modulesStudied?.join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-tpgs-emerald">
                        {report.progress}%
                      </span>
                      <p className="text-[9px] text-themed-muted">
                        {report.timeSpent}h
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Pauses */}
        {training.pauses && training.pauses.length > 0 && (
          <div>
            <p className="section-label flex items-center gap-2 mb-3">
              <Pause size={14} /> Historique des pauses
            </p>
            <div className="space-y-2">
              {training.pauses.map((pause, i) => (
                <div
                  key={pause.id}
                  className={clsx(
                    "card p-3 flex justify-between items-center",
                    pause.approved ? "bg-emerald-500/5" : "bg-amber-500/5",
                  )}
                >
                  <div>
                    <p className="text-xs font-bold text-themed">
                      {pause.startDate} → {pause.endDate}
                    </p>
                    <p className="text-[10px] text-themed-muted">
                      {pause.reason}
                    </p>
                  </div>
                  <span
                    className={clsx(
                      "badge",
                      pause.approved ? "badge-emerald" : "badge-gold",
                    )}
                  >
                    {pause.approved ? "Approuvée" : "En attente"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Historique */}
        <div>
          <p className="section-label flex items-center gap-2 mb-3">
            <Clock size={14} /> Journal d'activité
          </p>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {training.history
              ?.slice(-5)
              .reverse()
              .map((entry, i) => (
                <div
                  key={i}
                  className="text-[10px] text-themed-muted border-l-2 border-themed pl-3 py-1"
                >
                  <span className="font-mono">{entry.date}</span>
                  <span className="mx-2">•</span>
                  <span className="font-bold text-themed">{entry.action}</span>
                  <span className="mx-2">•</span>
                  <span>{entry.details}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function Trainings() {
  const {
    activeRole,
    currentUser,
    enrolledTrainings,
    startTraining,
    submitReport,
    requestPause,
    resumeTraining,
    completeTraining,
    validateTraining,
    rejectTraining,
    approvePause,
    submitCertificate,
    submitEvaluation,
  } = useAppStore();
  const { playClick, playSuccess } = useSound();

  const isOperator = activeRole === ROLES.OPERATOR;
  const isManager = activeRole === ROLES.MANAGER || activeRole === ROLES.HRM;
  const isTech = activeRole === ROLES.TECH;

  const [tab, setTab] = useState("mine"); // 'mine' or 'team'
  const [filter, setFilter] = useState("all");
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [reportTrainingId, setReportTrainingId] = useState(null);
  const [pauseTrainingId, setPauseTrainingId] = useState(null);

  // Filtrer les formations selon le contexte
  const myEnrolledTrainings = useMemo(() => {
    // Pour OPERATOR, afficher toutes les formations (données de démo)
    // OU filtrer par nom d'utilisateur
    if (activeRole === ROLES.OPERATOR) {
      // Afficher les formations de Armand Mballa pour la démo
      return enrolledTrainings.filter(
        (t) => t.employeeId === "m1" || t.employeeName === currentUser?.name,
      );
    }
    return enrolledTrainings.filter((t) => t.employeeId === currentUser?.id);
  }, [enrolledTrainings, currentUser, activeRole]);

  const teamEnrolledTrainings = useMemo(() => {
    // Pour les managers/HRM, afficher toutes les formations en cours
    return enrolledTrainings.filter((t) =>
      [
        TRAINING_STATUS.IN_PROGRESS,
        TRAINING_STATUS.ON_PAUSE,
        TRAINING_STATUS.DELAYED,
        TRAINING_STATUS.COMPLETED,
      ].includes(t.status),
    );
  }, [enrolledTrainings]);

  const data = tab === "mine" ? myEnrolledTrainings : teamEnrolledTrainings;

  const filtered = useMemo(() => {
    let result = data;

    // Filtre par statut
    if (filter !== "all") {
      result = result.filter((tr) => tr.status === filter);
    }

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tr) =>
          tr.title.toLowerCase().includes(query) ||
          tr.provider.toLowerCase().includes(query) ||
          (tr.employeeName && tr.employeeName.toLowerCase().includes(query)),
      );
    }

    return result;
  }, [data, filter, searchQuery]);

  // Statistiques
  const stats = useMemo(() => {
    const inProgress = myEnrolledTrainings.filter(
      (t) => t.status === TRAINING_STATUS.IN_PROGRESS,
    ).length;
    const paused = myEnrolledTrainings.filter(
      (t) => t.status === TRAINING_STATUS.ON_PAUSE,
    ).length;
    const delayed = myEnrolledTrainings.filter(
      (t) => t.status === TRAINING_STATUS.DELAYED,
    ).length;
    const completed = myEnrolledTrainings.filter((t) =>
      [TRAINING_STATUS.COMPLETED, TRAINING_STATUS.VALIDATED].includes(t.status),
    ).length;
    return { inProgress, paused, delayed, completed };
  }, [myEnrolledTrainings]);

  // Gestionnaire d'actions
  const handleAction = (action, trainingId) => {
    playClick();

    switch (action) {
      case "start":
        startTraining(trainingId);
        playSuccess();
        toast.success("Formation démarrée !", {
          title: "Bon courage pour votre apprentissage",
        });
        break;
      case "report":
        setReportTrainingId(trainingId);
        setReportModalOpen(true);
        break;
      case "pause":
        setPauseTrainingId(trainingId);
        setPauseModalOpen(true);
        break;
      case "resume":
        resumeTraining(trainingId);
        playSuccess();
        toast.success("Formation reprise !");
        break;
      case "complete":
        completeTraining(trainingId);
        playSuccess();
        toast.success("Formation déclarée terminée", {
          title: "En attente de validation",
        });
        break;
      case "validate":
        validateTraining(trainingId);
        playSuccess();
        toast.success("Formation validée !");
        break;
      case "reject":
        rejectTraining(trainingId, "Documents non conformes");
        toast.warning("Formation renvoyée pour correction");
        break;
      case "approvePause":
        // Approver la première pause non approuvée
        const training = enrolledTrainings.find((t) => t.id === trainingId);
        const pendingPause = training?.pauses?.find((p) => !p.approved);
        if (pendingPause) {
          approvePause(trainingId, pendingPause.id);
          playSuccess();
          toast.success("Pause approuvée");
        }
        break;
      case "certificate":
        toast.info("Dépôt de certificat");
        break;
      case "evaluate":
        toast.info("Formulaire d'évaluation");
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-themed">
        <div>
          <h1 className="font-heading font-black text-3xl text-themed">
            {tab === "mine" ? "Mon Parcours" : "Suivi des Formations"}
          </h1>
          <p className="text-sm mt-1 text-themed-muted">
            {tab === "mine"
              ? `${myEnrolledTrainings.length} formations dans votre parcours`
              : `${teamEnrolledTrainings.length} formations en cours de suivi`}
          </p>
        </div>

        {(isManager || isTech) && (
          <div className="flex p-1 bg-themed-hover rounded-2xl border border-themed">
            <button
              onClick={() => setTab("mine")}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                tab === "mine"
                  ? "bg-themed-card text-themed shadow-sm"
                  : "text-themed-muted hover:text-themed",
              )}
            >
              Mon parcours
            </button>
            <button
              onClick={() => setTab("team")}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                tab === "team"
                  ? "bg-themed-card text-themed shadow-sm"
                  : "text-themed-muted hover:text-themed",
              )}
            >
              <Users size={14} className="inline mr-2" />
              {isTech ? "Toutes les formations" : "Équipe"}
            </button>
          </div>
        )}
      </section>

      {/* Statistiques rapides (pour OPERATOR) */}
      {tab === "mine" && isOperator && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center border-l-4 border-l-emerald-500">
            <p className="text-2xl font-black text-emerald-500">
              {stats.inProgress}
            </p>
            <p className="text-[10px] text-themed-muted uppercase">En cours</p>
          </div>
          <div className="card p-4 text-center border-l-4 border-l-amber-500">
            <p className="text-2xl font-black text-amber-500">{stats.paused}</p>
            <p className="text-[10px] text-themed-muted uppercase">En pause</p>
          </div>
          <div className="card p-4 text-center border-l-4 border-l-red-500">
            <p className="text-2xl font-black text-red-500">{stats.delayed}</p>
            <p className="text-[10px] text-themed-muted uppercase">En retard</p>
          </div>
          <div className="card p-4 text-center border-l-4 border-l-purple-500">
            <p className="text-2xl font-black text-purple-500">
              {stats.completed}
            </p>
            <p className="text-[10px] text-themed-muted uppercase">Terminées</p>
          </div>
        </div>
      )}

      {/* Statistiques superviseur/équipe */}
      {tab === "team" && (isManager || isTech) && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="card p-3 text-center border-l-4 border-l-emerald-500">
            <p className="text-xl font-black text-emerald-500">
              {
                teamEnrolledTrainings.filter(
                  (t) => t.status === TRAINING_STATUS.IN_PROGRESS,
                ).length
              }
            </p>
            <p className="text-[9px] text-themed-muted uppercase">En cours</p>
          </div>
          <div className="card p-3 text-center border-l-4 border-l-amber-500">
            <p className="text-xl font-black text-amber-500">
              {
                teamEnrolledTrainings.filter(
                  (t) => t.status === TRAINING_STATUS.ON_PAUSE,
                ).length
              }
            </p>
            <p className="text-[9px] text-themed-muted uppercase">En pause</p>
          </div>
          <div className="card p-3 text-center border-l-4 border-l-red-500">
            <p className="text-xl font-black text-red-500">
              {
                teamEnrolledTrainings.filter(
                  (t) => t.status === TRAINING_STATUS.DELAYED,
                ).length
              }
            </p>
            <p className="text-[9px] text-themed-muted uppercase">En retard</p>
          </div>
          <div className="card p-3 text-center border-l-4 border-l-purple-500">
            <p className="text-xl font-black text-purple-500">
              {
                teamEnrolledTrainings.filter(
                  (t) => t.status === TRAINING_STATUS.COMPLETED,
                ).length
              }
            </p>
            <p className="text-[9px] text-themed-muted uppercase">À valider</p>
          </div>
          <div className="card p-3 text-center border-l-4 border-l-blue-500">
            <p className="text-xl font-black text-blue-500">
              {
                teamEnrolledTrainings.filter(
                  (t) => t.status === TRAINING_STATUS.VALIDATED,
                ).length
              }
            </p>
            <p className="text-[9px] text-themed-muted uppercase">Validées</p>
          </div>
        </div>
      )}

      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {FILTER_STATUSES.map((s) => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            className={clsx(
              "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              filter === s.key
                ? "bg-tpgs-emerald text-white shadow-lg"
                : "bg-themed-card text-themed-muted border border-themed hover:border-themed-muted",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Barre de recherche (pour vue équipe) */}
      {tab === "team" && (
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-themed-muted"
          />
          <input
            className="input pl-12"
            placeholder="Rechercher un agent ou une formation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Contenu */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="card p-20 text-center opacity-40 animate-fade-in">
            <BookOpen size={48} className="mx-auto text-themed-muted mb-4" />
            <p className="text-sm font-bold text-themed">
              Aucun dossier trouvé pour ce filtre
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((tr, i) => (
              <TrainingCard
                key={tr.id}
                training={tr}
                onClick={setSelectedTraining}
                isTeamView={tab === "team"}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modale de détail */}
      <AnimatePresence>
        {selectedTraining && (
          <TrainingDetailModal
            training={selectedTraining}
            open={!!selectedTraining}
            onClose={() => setSelectedTraining(null)}
            onAction={handleAction}
            isOperator={isOperator}
            isTech={isTech}
          />
        )}
      </AnimatePresence>

      {/* Modale de rapport de suivi */}
      <ReportModal
        open={reportModalOpen}
        onClose={() => {
          setReportModalOpen(false);
          setReportTrainingId(null);
        }}
        training={enrolledTrainings.find((t) => t.id === reportTrainingId)}
        onSubmit={(reportData) => {
          if (reportTrainingId) {
            submitReport(reportTrainingId, reportData);
            playSuccess();
            toast.success("Rapport soumis !", {
              title: "Votre rapport de suivi a été enregistré",
            });
          }
        }}
      />

      {/* Modale de demande de pause */}
      <PauseModal
        open={pauseModalOpen}
        onClose={() => {
          setPauseModalOpen(false);
          setPauseTrainingId(null);
        }}
        training={enrolledTrainings.find((t) => t.id === pauseTrainingId)}
        onSubmit={(pauseData) => {
          if (pauseTrainingId) {
            requestPause(pauseTrainingId, pauseData);
            playSuccess();
            toast.success("Demande de pause soumise !", {
              title: "En attente d'approbation",
            });
          }
        }}
      />
    </div>
  );
}
