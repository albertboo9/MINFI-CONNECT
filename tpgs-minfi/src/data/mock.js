// src/data/mock.js — Comprehensive mock data for all TPGS roles

/* ── COMPETENCY FRAMEWORK ─────────────────────────────── */
export const competencyFramework = {
    behavioral: [
        { id: 'b1', label: 'Communication & Collaboration', weight: 20 },
        { id: 'b2', label: 'Respect des Procédures', weight: 20 },
        { id: 'b3', label: 'Initiative & Autonomie', weight: 20 },
        { id: 'b4', label: 'Présence & Ponctualité', weight: 20 },
        { id: 'b5', label: 'Travail en Équipe', weight: 20 },
    ],
    technical: [
        { id: 't1', label: 'Maîtrise des Textes Fiscaux', weight: 30 },
        { id: 't2', label: 'Outils Informatiques MINFI', weight: 20 },
        { id: 't3', label: 'Gestion Budgétaire', weight: 25 },
        { id: 't4', label: 'Rédaction Administrative', weight: 25 },
    ],
};

/* ── TRAININGS CATALOGUE ─────────────────────────────── */
export const catalogue = [
    { id: 'c1', title: 'Fiscalité Digitale & Télédéclaration', category: 'job', modality: 'elearning', duration: '16h', cost: 0, provider: 'MINFI Interne', certification: 'Attestation MINFI', description: 'Maîtriser les outils de télédéclaration et les nouvelles obligations fiscales numériques.' },
    { id: 'c2', title: 'Gestion Axée sur les Résultats (GAR)', category: 'transversal', modality: 'classroom', duration: '3 jours', cost: 150000, provider: 'CEFAM', certification: 'Attestation CEFAM', description: 'Approche de gestion par objectifs adaptée au contexte de l\'administration publique camerounaise.' },
    { id: 'c3', title: 'Leadership & Management Public', category: 'executive', modality: 'blended', duration: '5 jours', cost: 450000, provider: 'ENAM', certification: 'Certificat ENAM', description: 'Développer les compétences managériales des cadres dirigeants du MINFI.' },
    { id: 'c4', title: 'Excel Avancé pour Contrôleurs de Gestion', category: 'specific', modality: 'classroom', duration: '2 jours', cost: 80000, provider: 'Softeam Cameroun', certification: 'Attestation Softeam', description: 'Tableaux croisés dynamiques, Power Query, et automatisation pour le contrôle de gestion.' },
    { id: 'c5', title: 'Lutte Contre le Blanchiment de Capitaux', category: 'job', modality: 'elearning', duration: '8h', cost: 0, provider: 'ANIF / MINFI', certification: 'Certification ANIF', description: 'Obligations réglementaires et procédures de détection des flux financiers suspects.' },
    { id: 'c6', title: 'Marchés Publics & Commande de l\'État', category: 'transversal', modality: 'blended', duration: '4 jours', cost: 200000, provider: 'ARMP', certification: 'Certificat ARMP', description: 'Procédures de passation, suivi et contrôle des marchés publics.' },
    { id: 'c7', title: 'Anglais Professionnel Niveau Intermédiaire', category: 'transversal', modality: 'elearning', duration: '40h', cost: 35000, provider: 'Speaky Pro', certification: 'Score TOEIC', description: 'Communiquer efficacement en anglais dans un contexte professionnel et diplomatique.' },
    { id: 'c8', title: 'Optimisation Fiscale PME', category: 'specific', modality: 'classroom', duration: '2 jours', cost: 120000, provider: 'Cabinet Fiscalis', certification: 'Attestation Fiscalis', description: 'Stratégies d\'optimisation légale pour les petites et moyennes entreprises.' },
];

/* ── OPERATOR — My Trainings ─────────────────────────── */
export const myTrainings = [
    { id: 't1', title: 'Fiscalité Digitale & Télédéclaration', category: 'job', modality: 'elearning', provider: 'MINFI Interne', progress: 65, status: 'inProgress', startDate: '2026-01-15', endDate: '2026-03-01', pausesUsed: 1, modules: 8, modulesCompleted: 5, certification: null, lastReport: '2026-02-28' },
    { id: 't2', title: 'Lutte Contre le Blanchiment de Capitaux', category: 'job', modality: 'elearning', provider: 'ANIF / MINFI', progress: 100, status: 'validated', startDate: '2025-09-01', endDate: '2025-10-15', pausesUsed: 0, modules: 4, modulesCompleted: 4, certification: '/certs/anif-cert.pdf', lastReport: '2025-10-15' },
    { id: 't3', title: 'Anglais Professionnel Niveau Intermédiaire', category: 'transversal', modality: 'elearning', provider: 'Speaky Pro', progress: 20, status: 'paused', startDate: '2026-02-01', endDate: '2026-05-30', pausesUsed: 2, modules: 12, modulesCompleted: 2, certification: null, lastReport: '2026-02-10' },
];

/* ── OPERATOR — My Requests ───────────────────────────── */
export const myRequests = [
    { id: 'r1', title: 'Excel Avancé pour Contrôleurs de Gestion', date: '2026-02-15', status: 'approved', priority: 'high', justification: 'Améliorer la production des tableaux de bord budgétaires.', managerComment: 'Approuvée — Formation alignée avec le plan de performance.' },
    { id: 'r2', title: 'Optimisation Fiscale PME', date: '2026-01-20', status: 'pending', priority: 'medium', justification: 'Renforcer mes compétences dans le suivi des PME assujetties.', managerComment: null },
    { id: 'r3', title: 'Leadership & Management Public', date: '2025-11-02', status: 'rejected', priority: 'low', justification: 'Aspirer à plus de responsabilités managériales.', managerComment: 'Rejetée — Formation executive réservée aux cadres N+2 et au-dessus.' },
];

/* ── TEAM DATA (Manager) ─────────────────────────────── */
export const teamMembers = [
    { id: 'm1', name: 'Armand Mballa', matricule: '125847-A', grade: 'Inspecteur des Impôts', score: 78, scoreN1: 71, trainingsCompleted: 3, trainingsPending: 1, certifications: 2, alertsCount: 0, status: 'active' },
    { id: 'm2', name: 'Sylvie Abena', matricule: '189234-B', grade: 'Vérificatrice des Impôts', score: 85, scoreN1: 80, trainingsCompleted: 5, trainingsPending: 0, certifications: 4, alertsCount: 0, status: 'active' },
    { id: 'm3', name: 'Paul-Éric Nkodo', matricule: '201456-C', grade: 'Agent des Impôts', score: 54, scoreN1: 60, trainingsCompleted: 1, trainingsPending: 2, certifications: 0, alertsCount: 2, status: 'at_risk' },
    { id: 'm4', name: 'Marie-Claire Owona', matricule: '97845-D', grade: 'Contrôleuse des Impôts', score: 91, scoreN1: 88, trainingsCompleted: 7, trainingsPending: 0, certifications: 5, alertsCount: 0, status: 'top' },
    { id: 'm5', name: 'Bertrand Fouda', matricule: '115632-E', grade: 'Agent des Impôts', score: 62, scoreN1: 58, trainingsCompleted: 2, trainingsPending: 1, certifications: 1, alertsCount: 1, status: 'active' },
];

/* ── PENDING REQUESTS (Manager to validate) ──────────── */
export const pendingRequests = [
    { id: 'pr1', agentName: 'Armand Mballa', agentScore: 78, trainingTitle: 'Excel Avancé pour Contrôleurs de Gestion', modality: 'classroom', cost: 80000, priority: 'high', date: '2026-02-15', justification: 'Améliorer la production des tableaux de bord budgétaires.' },
    { id: 'pr2', agentName: 'Paul-Éric Nkodo', agentScore: 54, trainingTitle: 'Gestion Axée sur les Résultats (GAR)', modality: 'classroom', cost: 150000, priority: 'critical', date: '2026-02-10', justification: 'Améliorer la gestion des objectifs et la performance globale.' },
    { id: 'pr3', agentName: 'Bertrand Fouda', agentScore: 62, trainingTitle: 'Anglais Professionnel Niveau Intermédiaire', modality: 'elearning', cost: 35000, priority: 'low', date: '2026-02-20', justification: 'Préparer la participation à une mission internationale.' },
];

/* ── PLAN N+1 (DRH) ───────────────────────────────────── */
export const planN1 = {
    year: 2026,
    budget: { total: 15000000, allocated: 9850000, spent: 2400000 },
    entries: [
        { id: 'p1', title: 'Fiscalité Digitale & Télédéclaration', category: 'job', modality: 'elearning', beneficiaries: 45, cost: 0, status: 'engaged', direction: 'Direction des Impôts', period: 'T1 2026' },
        { id: 'p2', title: 'Gestion Axée sur les Résultats (GAR)', category: 'transversal', modality: 'classroom', beneficiaries: 30, cost: 4500000, status: 'engaged', direction: 'Toutes Directions', period: 'T1-T2 2026' },
        { id: 'p3', title: 'Leadership & Management Public', category: 'executive', modality: 'blended', beneficiaries: 12, cost: 5400000, status: 'planned', direction: 'Directions Centrales', period: 'T2 2026' },
        { id: 'p4', title: 'Lutte Contre le Blanchiment', category: 'job', modality: 'elearning', beneficiaries: 80, cost: 0, status: 'engaged', direction: 'Direction du Trésor', period: 'T1 2026' },
        { id: 'p5', title: 'Excel Avancé Contrôleurs de Gestion', category: 'specific', modality: 'classroom', beneficiaries: 8, cost: 640000, status: 'pending', direction: 'DAAF', period: 'T3 2026' },
        { id: 'p6', title: 'Marchés Publics & Commande de l\'État', category: 'transversal', modality: 'blended', beneficiaries: 20, cost: 4000000, status: 'planned', direction: 'Direction Douanes', period: 'T2-T3 2026' },
    ],
};

/* ── N vs N-1 Comparison Data (Charts) ──────────────── */
export const comparisonData = [
    { quarter: 'T1', nMinus1: 12, n: 18 },
    { quarter: 'T2', nMinus1: 25, n: 32 },
    { quarter: 'T3', nMinus1: 18, n: 28 },
    { quarter: 'T4', nMinus1: 14, n: 22 },
];

export const budgetComparisonData = [
    { label: 'Direction des Impôts', nMinus1: 3200000, n: 4100000 },
    { label: 'Direction du Trésor', nMinus1: 2100000, n: 2800000 },
    { label: 'Direction des Douanes', nMinus1: 1800000, n: 2400000 },
    { label: 'DAAF', nMinus1: 900000, n: 1200000 },
    { label: 'DRH', nMinus1: 600000, n: 950000 },
];

export const completionTrendData = [
    { month: 'Sep', rate: 62 }, { month: 'Oct', rate: 70 }, { month: 'Nov', rate: 68 },
    { month: 'Déc', rate: 74 }, { month: 'Jan', rate: 78 }, { month: 'Fév', rate: 82 },
];

export const categoryDistribution = [
    { name: 'Métier', value: 38, color: '#10B981' },
    { name: 'Transversale', value: 30, color: '#3B82F6' },
    { name: 'Spécifique', value: 22, color: '#F59E0B' },
    { name: 'Executive', value: 10, color: '#8B5CF6' },
];

/* ── ALERTS ──────────────────────────────────────────── */
export const systemAlerts = [
    { id: 'a1', type: 'warning', message: 'Paul-Éric Nkodo — Rapport hebdomadaire non soumis depuis 12 jours', date: '2026-03-01', role: 'manager' },
    { id: 'a2', type: 'danger', message: '3 formations engagées non démarrées depuis + de 30 jours', date: '2026-03-02', role: 'hrm' },
    { id: 'a3', type: 'info', message: 'Deadline saisie évaluations annuelles : 15 mars 2026', date: '2026-03-03', role: 'manager' },
    { id: 'a4', type: 'warning', message: 'Certificat ANIF — Bertrand Fouda non téléversé (formation terminée le 01/03)', date: '2026-03-02', role: 'tech' },
    { id: 'a5', type: 'success', message: 'Marie-Claire Owona a obtenu la Certification ARMP — Marchés Publics', date: '2026-03-01', role: 'manager' },
];

/* ── GLOBAL KPIs (Director) ─────────────────────────── */
export const globalKPIs = {
    totalStaff: 847,
    trainedThisYear: 312,
    completionRate: 78,
    certObtained: 205,
    budgetRate: 66,
    alertsActive: 14,
    avgScoreMinistry: 74,
    avgScoreN1: 69,
};
