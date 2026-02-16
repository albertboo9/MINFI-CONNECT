import { BookOpen, Award, ShieldCheck, Landmark, Scale, FileText, ClipboardCheck, BarChart3 } from 'lucide-react';

export const academyTrainings = [
    {
        id: 'bts-compta',
        title: "BTS Comptabilité & Gestion",
        category: "Comptabilité",
        level: "Bac+2",
        duration: "24 Mois",
        image: "public/academy_accounting_premium_1771263298556.png",
        icon: BookOpen,
        shortDesc: "Maîtriser les fondements de la comptabilité générale et analytique pour les organisations.",
        description: "Ce parcours intensif prépare les futurs cadres comptables aux réalités du terrain. Vous apprendrez à gérer les flux financiers, à élaborer des bilans et à conseiller la direction sur la santé financière de l'entité.",
        objectives: [
            "Maîtriser l'enregistrement des opérations comptables",
            "Élaborer les états financiers de synthèse",
            "Analyser les coûts et les marges",
            "Gérer les relations avec les banques et l'administration"
        ],
        program: [
            { module: "Comptabilité Générale I & II", hours: "120h" },
            { module: "Droit des Sociétés", hours: "60h" },
            { module: "Fiscalité des Entreprises", hours: "80h" },
            { module: "Comptabilité Analytique", hours: "100h" }
        ],
        outcomes: "Comptable, Auditeur Junior, Gestionnaire de Paie."
    },
    {
        id: 'dess-fiscalite',
        title: "DESS Fiscalité Appliquée",
        category: "Fiscalité",
        level: "Bac+5",
        duration: "12 Mois",
        image: "public/academy_taxation_digital_1771263315962.png",
        icon: Award,
        shortDesc: "Expertise de haut niveau sur le Code Général des Impôts et l'optimisation fiscale.",
        description: "Destiné aux juristes et économistes, ce diplôme de spécialisation offre une maîtrise complète de l'environnement fiscal camerounais et international.",
        objectives: [
            "Interpréter avec précision le Code Général des Impôts",
            "Gérer les contentieux fiscaux complexes",
            "Mettre en place des stratégies d'optimisation légale",
            "Réaliser des audits de conformité fiscale"
        ],
        program: [
            { module: "Fiscalité Directe (IRPP, IS)", hours: "90h" },
            { module: "TVA & Taxes Indirectes", hours: "70h" },
            { module: "Droit Fiscal International", hours: "60h" },
            { module: "Contentieux & Procédures", hours: "80h" }
        ],
        outcomes: "Inspecteur des Impôts, Conseil Fiscal, Avocat Fiscaliste."
    },
    {
        id: 'dip-tresor',
        title: "Diplôme Supérieur du Trésor",
        category: "Trésorerie",
        level: "Concours",
        duration: "36 Mois",
        image: "public/academy_customs_logistics_v3_1771263427999.png", // Temporarily reusing customs if treasury fails
        icon: ShieldCheck,
        shortDesc: "Le parcours d'excellence pour les futurs comptables publics de l'État.",
        description: "Formation d'élite intégrant les dimensions de gestion de la liquidité souveraine, de comptabilité publique et de contrôle budgétaire.",
        objectives: [
            "Assurer la garde et la conservation des fonds publics",
            "Exécuter les dépenses et recettes de l'État",
            "Gérer la dette publique et la trésorerie",
            "Produire le compte de gestion annuel"
        ],
        program: [
            { module: "Comptabilité Publique Approfondie", hours: "150h" },
            { module: "Gestion de la Dette & Actifs", hours: "80h" },
            { module: "Contrôle Interne & Audit Public", hours: "100h" },
            { module: "Économie Monétaire", hours: "70h" }
        ],
        outcomes: "Trésorier Payeur Général, Comptable Public, Auditeur au Trésor."
    },
    {
        id: 'mana-douanes',
        title: "Management Douanier & Logistique",
        category: "Douanes",
        level: "Bac+3",
        duration: "18 Mois",
        image: "public/academy_customs_logistics_v3_1771263427999.png",
        icon: Scale,
        shortDesc: "Expertise sur les flux internationaux, le transit et les régimes douaniers.",
        description: "Comprendre les enjeux du commerce transfrontalier, la sécurisation des recettes douanières et la facilitation des échanges.",
        objectives: [
            "Maîtriser les procédures de dédouanement (Sydonia)",
            "Classifier les marchandises (SH)",
            "Évaluer la valeur en douane",
            "Gérer les régimes économiques et le transit"
        ],
        program: [
            { module: "Droit Douanier & Contentieux", hours: "110h" },
            { module: "Techniques de Commerce International", hours: "90h" },
            { module: "Tarif Extérieur Commun", hours: "80h" },
            { module: "Logistique & Supply Chain", hours: "100h" }
        ],
        outcomes: "Inspecteur des Douanes, Responsable Logistique, Commissionnaire en Douane."
    },
    {
        id: 'audit-control',
        title: "Audit & Contrôle de Gestion",
        category: "Audit",
        level: "Bac+5",
        duration: "24 Mois",
        image: "public/academy_accounting_premium_1771263298556.png",
        icon: ClipboardCheck,
        shortDesc: "Garantir la performance et la transparence des organisations publiques et privées.",
        description: "Apprenez à concevoir des tableaux de bord, à piloter la performance et à détecter les zones de risques opérationnels.",
        objectives: [
            "Concevoir et piloter un système de contrôle de gestion",
            "Réaliser des missions d'audit interne",
            "Mesurer la performance par des KPIs pertinents",
            "Accompagner le changement organisationnel"
        ],
        program: [
            { module: "Audit Opérationnel & Financier", hours: "100h" },
            { module: "Tableaux de Bord & Pilotage", hours: "90h" },
            { module: "Évaluation de l'Entreprise", hours: "70h" },
            { module: "Management des Risques", hours: "80h" }
        ],
        outcomes: "Auditeur Interne, Chef Comptable, Contrôleur de Gestion."
    }
];
