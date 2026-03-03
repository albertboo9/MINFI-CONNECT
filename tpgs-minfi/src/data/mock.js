// src/data/mock.js

/**
 * TPGS Unified Mock Data Repository
 * Consolidated for V0+ Role-based Workflows
 */

export const teamMembers = [
    { id: 'm1', name: 'Armand Mballa', initials: 'AM', grade: 'Inspecteur Principal', matricule: 'IP88-01', score: 82, scoreN1: 78, status: 'top', trainingsCompleted: 4, department: 'Direction des Impôts' },
    { id: 'm2', name: 'Cécile Atangana', initials: 'CA', grade: 'Contrôleur', matricule: 'CT92-45', score: 65, scoreN1: 70, status: 'at_risk', trainingsCompleted: 2, department: 'Direction des Douanes' },
    { id: 'm3', name: 'Jean-Luc Balla', initials: 'JB', grade: 'Administrateur Civ.', matricule: 'AC12-99', score: 91, scoreN1: 85, status: 'top', trainingsCompleted: 6, department: 'DSI' },
    { id: 'm4', name: 'Sophie Nkoa', initials: 'SN', grade: 'Ingénieur SI', matricule: 'IS23-11', score: 78, scoreN1: 76, status: 'active', trainingsCompleted: 3, department: 'DSI' },
    { id: 'm5', name: 'Marc Etoga', initials: 'ME', grade: 'Secrétaire Adm.', matricule: 'SA05-22', score: 55, scoreN1: 58, status: 'at_risk', trainingsCompleted: 1, department: 'DRH' }
];

export const catalogue = [
    { id: 'c1', title: 'Audit Financier Supérieur', provider: 'ENAM', hours: '45h', category: 'job', level: 'Expert', isFree: false, price: 150000, duration: '5 jours' },
    { id: 'c2', title: 'Cybersécurité Offensive', provider: 'TPGS-Cloud', hours: '20h', category: 'specific', level: 'Avancé', isFree: true, price: 0, duration: '3 jours' },
    { id: 'c3', title: 'Management Agile MINFI', provider: 'Cabinet Performance', hours: '12h', category: 'transversal', level: 'Intermédiaire', isFree: false, price: 45000, duration: '2 jours' },
    { id: 'c4', title: 'Droit OHADA Révisé', provider: 'Faculté de Droit', hours: '30h', category: 'job', level: 'Tous niveaux', isFree: true, price: 0, duration: '4 jours' },
    { id: 'c5', title: 'Data Analytics & Power BI', provider: 'MINFI-Academy', hours: '25h', category: 'specific', level: 'Avancé', isFree: false, price: 85000, duration: '3 jours' }
];

export const myTrainings = [
    { id: 'mt1', title: 'Audit Financier Supérieur', progress: 45, status: 'inProgress', provider: 'ENAM', modality: 'elearning' },
    { id: 'mt2', title: 'Management Agile', progress: 100, status: 'validated', provider: 'Cabinet Performance', modality: 'blended' }
];

export const myRequests = [
    { id: 'r1', title: 'Intelligence Artificielle & SI', status: 'pending', date: '15/02/2026', priority: 'medium', justification: 'Besoin pour l\'automatisation des processus.' },
    { id: 'r2', title: 'Anglais Technique', status: 'approved', date: '01/02/2026', priority: 'high', justification: 'Indispensable pour la lecture des documentations techniques.', managerComment: 'Validé pour la session de Mars.' }
];

export const pendingRequests = [
    {
        id: 'p1',
        agentName: 'Marc Etoga',
        agentScore: 72,
        trainingTitle: 'Excel Avancé',
        date: '12/02/2026',
        priority: 'medium',
        cost: 0,
        justification: 'Améliorer le reporting mensuel.'
    },
    {
        id: 'p2',
        agentName: 'Cécile Atangana',
        agentScore: 65,
        trainingTitle: 'Droit OHADA',
        date: '14/02/2026',
        priority: 'high',
        cost: 150000,
        justification: 'Nécessaire pour les nouveaux contentieux.'
    }
];

export const teamTrainings = [
    { id: 'tt1', agentName: 'Marc Etoga', title: 'Excel Avancé', progress: 65, status: 'inProgress', provider: 'Formation Interne', modality: 'elearning' },
    { id: 'tt2', agentName: 'Jean-Luc Balla', title: 'Audit Financier', progress: 85, status: 'inProgress', provider: 'ENAM', modality: 'elearning' },
    { id: 'tt3', agentName: 'Cécile Atangana', title: 'Gestion Douanière', progress: 10, status: 'inProgress', provider: 'Douanes-Sch', modality: 'classroom' }
];

export const planN1 = {
    budget: { total: 450000000, allocated: 320000000 },
    entries: [
        { id: 'e1', title: 'Masterclass Fiscalité 2026', category: 'job', beneficiaries: 120, direction: 'DGI', cost: 12000000, period: 'T1 - Février', status: 'engaged' },
        { id: 'e2', title: 'Sécurité Réseau LAN', category: 'specific', beneficiaries: 15, direction: 'DSI', cost: 4500000, period: 'T1 - Mars', status: 'planned' },
        { id: 'e3', title: 'Leadership Féminin', category: 'transversal', beneficiaries: 45, direction: 'DRH', cost: 6000000, period: 'T2 - Mai', status: 'pending' },
        { id: 'e4', title: 'Audit Comptes Publics', category: 'job', beneficiaries: 60, direction: 'DGB', cost: 0, period: 'T1 - Avril', status: 'engaged' }
    ]
};

export const comparisonData = [
    { quarter: 'T1', nMinus1: 120, n: 145 },
    { quarter: 'T2', nMinus1: 150, n: 168 },
    { quarter: 'T3', nMinus1: 130, n: 155 },
    { quarter: 'T4', nMinus1: 180, n: 210 }
];

export const budgetComparisonData = [
    { label: 'Dir. Impôts', nMinus1: 45000000, n: 52000000 },
    { label: 'Dir. Douanes', nMinus1: 38000000, n: 41000000 },
    { label: 'DSI', nMinus1: 25000000, n: 34000000 },
    { label: 'DRH', nMinus1: 18000000, n: 22000000 },
    { label: 'Budget Etat', nMinus1: 85000000, n: 95000000 }
];

export const categoryDistribution = [
    { name: 'Métier', value: 45, color: '#10B981' },
    { name: 'Transversal', value: 25, color: '#3B82F6' },
    { name: 'Spécifique', value: 20, color: '#F59E0B' },
    { name: 'Executive', value: 10, color: '#8B5CF6' }
];

export const competencyFramework = {
    behavioral: [
        { id: 'b1', label: 'Leadership', weight: 20 },
        { id: 'b2', label: 'Communication', weight: 15 },
        { id: 'b3', label: 'Éthique & Intégrité', weight: 30 }
    ],
    technical: [
        { id: 't1', label: 'Maîtrise Excel', weight: 10 },
        { id: 't2', label: 'Audit Financier', weight: 25 }
    ]
};
