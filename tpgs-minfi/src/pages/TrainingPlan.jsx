import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  GraduationCap,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  Download,
  FileText,
  FileSpreadsheet,
  ChevronRight,
  X,
  Calendar,
  Building2,
} from "lucide-react";
import { clsx } from "clsx";
import { trainingPlan } from "../data/mock.js";
import { useAppStore, ROLES } from "../store/index.js";

const StatCard = ({ label, value, icon: Icon, color = "emerald", subtext }) => {
  const colorMap = {
    emerald: "text-tpgs-emerald bg-tpgs-emerald/10",
    blue: "text-blue-400 bg-blue-400/10",
    amber: "text-amber-400 bg-amber-400/10",
    purple: "text-purple-400 bg-purple-400/10",
    red: "text-red-400 bg-red-400/10",
  };
  return (
    <div className="card p-5 flex items-center gap-4">
      <div
        className={clsx(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          colorMap[color],
        )}
      >
        <Icon size={22} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-themed-muted mb-0.5">
          {label}
        </p>
        <p className="text-2xl font-black text-themed tracking-tight">
          {value}
        </p>
        {subtext && <p className="text-[9px] text-themed-muted">{subtext}</p>}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusMap = {
    completed: {
      label: "Terminée",
      color: "bg-tpgs-emerald/10 text-tpgs-emerald",
    },
    inProgress: { label: "En cours", color: "bg-blue-400/10 text-blue-400" },
    pending: { label: "En attente", color: "bg-amber-400/10 text-amber-400" },
  };
  const s = statusMap[status] || statusMap.pending;
  return (
    <span
      className={clsx(
        "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg",
        s.color,
      )}
    >
      {s.label}
    </span>
  );
};

export default function TrainingPlan() {
  const { t } = useTranslation();
  const { activeRole } = useAppStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const isHRM = activeRole === ROLES.HRM || activeRole === ROLES.DIRECTOR;

  const departments = useMemo(() => {
    const deps = [...new Set(trainingPlan.map((t) => t.department))];
    return ["all", ...deps];
  }, []);

  const filteredTrainings = useMemo(() => {
    return trainingPlan.filter((t) => {
      const matchSearch =
        t.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        t.training.toLowerCase().includes(search.toLowerCase()) ||
        t.department.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      const matchDept =
        departmentFilter === "all" || t.department === departmentFilter;
      return matchSearch && matchStatus && matchDept;
    });
  }, [search, statusFilter, departmentFilter]);

  const stats = useMemo(() => {
    const total = trainingPlan.length;
    const completed = trainingPlan.filter(
      (t) => t.status === "completed",
    ).length;
    const inProgress = trainingPlan.filter(
      (t) => t.status === "inProgress",
    ).length;
    const pending = trainingPlan.filter((t) => t.status === "pending").length;
    const totalCost = trainingPlan.reduce((acc, t) => acc + t.cost, 0);
    return { total, completed, inProgress, pending, totalCost };
  }, []);

  const exportToCSV = () => {
    const headers = [
      "Employé",
      "Département",
      "Formation",
      "Prestataire",
      "Coût (FCFA)",
      "Statut",
      "Date début",
      "Date fin",
    ];
    const rows = filteredTrainings.map((t) => [
      t.employeeName,
      t.department,
      t.training,
      t.provider,
      t.cost.toString(),
      t.status,
      t.startDate,
      t.endDate,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `plan_formation_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    alert("Fonctionnalité PDF à implémenter avec une bibliothèque comme jsPDF");
  };

  return (
    <div className="space-y-8 pb-20 animate-fade-in">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-themed">
        <div>
          <h1 className="font-heading font-black text-3xl text-themed tracking-tight flex items-center gap-3">
            <GraduationCap size={32} className="text-tpgs-gold" />
            {t("nav.trainingPlan") || "Plan de Formation"}
          </h1>
          <p className="text-sm mt-1 text-themed-muted">
            Vue d'ensemble des formations en cours et planifiées
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="btn-ghost flex items-center gap-2"
          >
            <FileSpreadsheet size={16} />
            <span className="hidden sm:inline">CSV</span>
          </button>
          <button
            onClick={exportToPDF}
            className="btn-ghost flex items-center gap-2"
          >
            <FileText size={16} />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label="Total Formations"
          value={stats.total}
          icon={GraduationCap}
          color="emerald"
        />
        <StatCard
          label="En Cours"
          value={stats.inProgress}
          icon={Clock}
          color="blue"
        />
        <StatCard
          label="Terminées"
          value={stats.completed}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          label="En Attente"
          value={stats.pending}
          icon={Calendar}
          color="amber"
        />
        <StatCard
          label="Coût Total"
          value={(stats.totalCost / 1000000).toFixed(1) + "M"}
          icon={DollarSign}
          color="purple"
          subtext="FCFA"
        />
      </section>

      {/* Filters */}
      <section className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-themed-muted"
          />
          <input
            className="input pl-12 h-12 text-sm font-bold"
            placeholder="Rechercher par employé, formation ou service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="select h-12 bg-themed-card min-w-[150px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="inProgress">En cours</option>
          <option value="completed">Terminée</option>
          <option value="pending">En attente</option>
        </select>
        <select
          className="select h-12 bg-themed-card min-w-[200px]"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          {departments.map((d) => (
            <option key={d} value={d}>
              {d === "all" ? "Tous les services" : d}
            </option>
          ))}
        </select>
      </section>

      {/* Table */}
      <section className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-themed-hover/50 text-[10px] font-black uppercase tracking-widest text-themed-muted border-b border-themed">
                <th className="p-4">Employé</th>
                <th className="p-4">Service</th>
                <th className="p-4">Formation</th>
                <th className="p-4">Prestataire</th>
                <th className="p-4">Coût</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Période</th>
                <th className="p-4">Progression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-themed">
              {filteredTrainings.map((training) => (
                <tr
                  key={training.id}
                  className="hover:bg-themed-hover/30 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-themed-hover flex items-center justify-center font-black text-xs text-tpgs-gold border border-themed">
                        {training.employeeInitials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-themed">
                          {training.employeeName}
                        </p>
                        <p className="text-[10px] text-themed-muted font-mono">
                          {training.id.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="badge badge-slate">
                      {training.department}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-semibold text-themed max-w-[200px] truncate">
                      {training.training}
                    </p>
                    <p className="text-[10px] text-themed-muted mt-0.5">
                      {training.provider}
                    </p>
                  </td>
                  <td className="p-4 text-sm text-themed-muted">
                    {training.provider}
                  </td>
                  <td className="p-4">
                    <span
                      className={clsx(
                        "text-sm font-bold",
                        training.cost === 0
                          ? "text-tpgs-emerald"
                          : "text-themed",
                      )}
                    >
                      {training.cost === 0
                        ? " Gratuit"
                        : training.cost.toLocaleString() + " F"}
                    </span>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={training.status} />
                  </td>
                  <td className="p-4 text-xs font-mono text-themed-muted">
                    {training.startDate} - {training.endDate}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-themed-hover rounded-full overflow-hidden max-w-[80px]">
                        <div
                          className={clsx(
                            "h-full rounded-full transition-all",
                            training.progress === 100
                              ? "bg-tpgs-emerald"
                              : "bg-tpgs-blue",
                          )}
                          style={{ width: `${training.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-themed-muted w-8">
                        {training.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTrainings.length === 0 && (
          <div className="p-12 text-center">
            <GraduationCap
              size={48}
              className="mx-auto mb-4 text-themed-muted opacity-30"
            />
            <p className="text-sm text-themed-muted">
              Aucune formation trouvée
            </p>
          </div>
        )}
      </section>

      {/* Summary Footer */}
      <section className="flex items-center justify-between text-xs text-themed-muted">
        <p>
          Affichage de {filteredTrainings.length} sur {stats.total} formations
        </p>
        <p>
          Coût total affiché :{" "}
          {filteredTrainings
            .reduce((acc, t) => acc + t.cost, 0)
            .toLocaleString()}{" "}
          FCA
        </p>
      </section>
    </div>
  );
}
