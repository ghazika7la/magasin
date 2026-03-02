// Dashboard SEO/IA - Version Autonome avec Données Simulées

// Données simulées intégrées
const mockData = {
    analytics: {
        kpi: {
            total_users: 847,
            total_sessions: 1024,
            total_pageviews: 3456,
            avg_bounce_rate: 65.5,
            avg_engagement_rate: 58.2,
            pages_per_session: 3.37
        },
        daily_data: [
            { date: '2026-02-23', users: 112, sessions: 122, pageviews: 458 },
            { date: '2026-02-24', users: 98, sessions: 108, pageviews: 412 },
            { date: '2026-02-25', users: 125, sessions: 135, pageviews: 487 },
            { date: '2026-02-26', users: 118, sessions: 128, pageviews: 456 },
            { date: '2026-02-27', users: 134, sessions: 145, pageviews: 523 },
            { date: '2026-02-28', users: 142, sessions: 154, pageviews: 589 },
            { date: '2026-03-01', users: 118, sessions: 132, pageviews: 431 }
        ],
        top_pages: [
            { page: '/', pageviews: 450, users: 120, bounce_rate: 65.5 },
            { page: '/jeux.html', pageviews: 320, users: 85, bounce_rate: 45.2 },
            { page: '/contact', pageviews: 180, users: 65, bounce_rate: 35.8 },
            { page: '/about', pageviews: 150, users: 45, bounce_rate: 28.3 },
            { page: '/blog', pageviews: 120, users: 38, bounce_rate: 42.1 }
        ],
        traffic_sources: [
            { source: 'organic', sessions: 280, users: 180 },
            { source: 'direct', sessions: 150, users: 95 },
            { source: 'social', sessions: 80, users: 52 },
            { source: 'referral', sessions: 60, users: 38 }
        ]
    },
    searchConsole: {
        kpi: {
            total_clicks: 233,
            total_impressions: 3900,
            avg_ctr: 5.98,
            avg_position: 22.81
        },
        top_queries: [
            { query: 'magasin jeux vidéo', clicks: 45, impressions: 1200, ctr: 3.75, position: 8.2 },
            { query: 'jeux pas cher', clicks: 38, impressions: 980, ctr: 3.88, position: 12.5 },
            { query: 'achat jeux en ligne', clicks: 32, impressions: 850, ctr: 3.76, position: 15.3 },
            { query: 'jeux console', clicks: 28, impressions: 720, ctr: 3.89, position: 18.7 },
            { query: 'PC gaming', clicks: 25, impressions: 650, ctr: 3.85, position: 22.1 }
        ],
        top_pages: [
            { page: '/', clicks: 85, impressions: 2200, ctr: 3.86, position: 7.5 },
            { page: '/jeux.html', clicks: 62, impressions: 1800, ctr: 3.44, position: 11.2 },
            { page: '/contact', clicks: 28, impressions: 750, ctr: 3.73, position: 16.8 }
        ]
    },
    recommendations: {
        total_recommendations: 3,
        high_priority: 2,
        medium_priority: 1,
        low_priority: 0,
        recommendations: [
            {
                type: 'high_bounce_rate',
                title: 'Taux de rebond élevé détecté',
                description: 'Le taux de rebond moyen est de 65.5%, ce qui est au-dessus du seuil recommandé de 70%.',
                recommendation: 'Améliorez la pertinence du contenu, optimisez la vitesse de chargement et assurez-vous que les pages répondent aux attentes des visiteurs.',
                priority: 1,
                impact: 'high',
                effort: 'medium'
            },
            {
                type: 'low_ctr_good_position',
                title: 'CTR faible pour la requête: "jeux pas cher"',
                description: 'La requête "jeux pas cher" est en position 12.5 mais n\'a qu\'un CTR de 3.88%.',
                recommendation: 'Optimisez le titre et la meta description de la page concernée pour augmenter le CTR.',
                priority: 1,
                impact: 'high',
                effort: 'low'
            },
            {
                type: 'organic_traffic_opportunity',
                title: 'Opportunité d\'amélioration: /',
                description: 'La page / reçoit 85 clics organiques mais a un taux de rebond de 65.5%.',
                recommendation: 'Le contenu attire les visiteurs mais ne les retient pas. Améliorez la pertinence et l\'expérience utilisateur.',
                priority: 2,
                impact: 'medium',
                effort: 'medium'
            }
        ]
    }
};

// Variables globales
let dashboardData = mockData;
let charts = {};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadDashboardData();
});

// Initialisation des écouteurs d'événements
function initializeEventListeners() {
    // Bouton d'actualisation
    document.getElementById('refresh-btn').addEventListener('click', function() {
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Actualisation...';
        loadDashboardData().finally(() => {
            this.disabled = false;
            this.innerHTML = '<i class="fas fa-sync-alt"></i> Actualiser';
        });
    });

    // Sélecteur de période
    document.getElementById('period-select').addEventListener('change', function() {
        loadDashboardData();
    });

    // Boutons des graphiques
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const chartType = this.dataset.chart;
            const metric = this.dataset.metric;
            
            // Mettre à jour les boutons actifs
            document.querySelectorAll(`[data-chart="${chartType}"]`).forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Mettre à jour le graphique
            updateChart(chartType, metric);
        });
    });
}

// Chargement des données du dashboard (simulé)
async function loadDashboardData() {
    showLoading();
    
    try {
        // Simulation de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        updateDashboard();
        hideLoading();
        
    } catch (error) {
        console.error('Erreur de chargement:', error);
        hideLoading();
    }
}

// Mise à jour du dashboard
function updateDashboard() {
    if (!dashboardData) return;
    
    updateKPIs();
    updateCharts();
    updateRecommendations();
    updateTables();
    
    // Afficher le contenu
    document.getElementById('dashboard-content').style.display = 'block';
}

// Mise à jour des KPIs
function updateKPIs() {
    const analytics = dashboardData.analytics;
    const searchConsole = dashboardData.searchConsole;
    
    // KPIs GA4
    if (analytics && analytics.kpi) {
        const kpi = analytics.kpi;
        
        document.getElementById('total-users').textContent = formatNumber(kpi.total_users);
        document.getElementById('total-pageviews').textContent = formatNumber(kpi.total_pageviews);
        document.getElementById('bounce-rate').textContent = formatPercentage(kpi.avg_bounce_rate);
        document.getElementById('engagement-rate').textContent = formatPercentage(kpi.avg_engagement_rate);
    }
    
    // KPIs Search Console
    if (searchConsole && searchConsole.kpi) {
        const kpi = searchConsole.kpi;
        
        document.getElementById('total-clicks').textContent = formatNumber(kpi.total_clicks);
        document.getElementById('total-impressions').textContent = formatNumber(kpi.total_impressions);
        document.getElementById('avg-ctr').textContent = formatPercentage(kpi.avg_ctr);
        document.getElementById('avg-position').textContent = kpi.avg_position.toFixed(1);
    }
}

// Mise à jour des graphiques
function updateCharts() {
    updateTrafficChart();
    updatePagesChart();
    updateSourcesChart();
    updateQueriesChart();
}

// Graphique d'évolution du trafic
function updateTrafficChart() {
    const ctx = document.getElementById('traffic-chart').getContext('2d');
    
    if (charts.traffic) {
        charts.traffic.destroy();
    }
    
    const dailyData = dashboardData.analytics?.daily_data || [];
    
    charts.traffic = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dailyData.map(d => formatDate(d.date)),
            datasets: [{
                label: 'Visiteurs',
                data: dailyData.map(d => d.users),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Pages Vues',
                data: dailyData.map(d => d.pageviews),
                borderColor: '#764ba2',
                backgroundColor: 'rgba(118, 75, 162, 0.1)',
                tension: 0.4,
                fill: true,
                hidden: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Graphique des pages les plus consultées
function updatePagesChart() {
    const ctx = document.getElementById('pages-chart').getContext('2d');
    
    if (charts.pages) {
        charts.pages.destroy();
    }
    
    const topPages = dashboardData.analytics?.top_pages || [];
    const pages = topPages.slice(0, 10);
    
    charts.pages = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: pages.map(p => truncateText(p.page, 30)),
            datasets: [{
                label: 'Pages Vues',
                data: pages.map(p => p.pageviews),
                backgroundColor: '#667eea',
                borderColor: '#667eea',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Graphique des sources de trafic
function updateSourcesChart() {
    const ctx = document.getElementById('sources-chart').getContext('2d');
    
    if (charts.sources) {
        charts.sources.destroy();
    }
    
    const sources = dashboardData.analytics?.traffic_sources || [];
    
    charts.sources = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sources.map(s => s.source),
            datasets: [{
                data: sources.map(s => s.sessions),
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#28a745',
                    '#ffc107',
                    '#dc3545',
                    '#17a2b8'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Graphique des mots-clés
function updateQueriesChart() {
    const ctx = document.getElementById('queries-chart').getContext('2d');
    
    if (charts.queries) {
        charts.queries.destroy();
    }
    
    const topQueries = dashboardData.searchConsole?.top_queries || [];
    const queries = topQueries.slice(0, 10);
    
    charts.queries = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: queries.map(q => truncateText(q.query, 25)),
            datasets: [{
                label: 'Clics',
                data: queries.map(q => q.clicks),
                backgroundColor: '#667eea',
                borderColor: '#667eea',
                borderWidth: 1
            }, {
                label: 'Impressions',
                data: queries.map(q => q.impressions),
                backgroundColor: '#764ba2',
                borderColor: '#764ba2',
                borderWidth: 1,
                hidden: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Mise à jour des graphiques (changement de métrique)
function updateChart(chartType, metric) {
    switch (chartType) {
        case 'traffic':
            updateTrafficChartMetric(metric);
            break;
        case 'pages':
            updatePagesChartSource(metric);
            break;
        case 'queries':
            updateQueriesChartMetric(metric);
            break;
    }
}

// Mise à jour du graphique de trafic par métrique
function updateTrafficChartMetric(metric) {
    const dailyData = dashboardData.analytics?.daily_data || [];
    const chart = charts.traffic;
    
    if (metric === 'users') {
        chart.data.datasets[0].hidden = false;
        chart.data.datasets[1].hidden = true;
    } else {
        chart.data.datasets[0].hidden = true;
        chart.data.datasets[1].hidden = false;
    }
    
    chart.update();
}

// Mise à jour du graphique des pages par source
function updatePagesChartSource(source) {
    const ctx = document.getElementById('pages-chart').getContext('2d');
    
    if (charts.pages) {
        charts.pages.destroy();
    }
    
    let pages = [];
    
    if (source === 'gsc') {
        pages = dashboardData.searchConsole?.top_pages || [];
    } else {
        pages = dashboardData.analytics?.top_pages || [];
    }
    
    pages = pages.slice(0, 10);
    
    charts.pages = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: pages.map(p => truncateText(p.page || p.page, 30)),
            datasets: [{
                label: source === 'gsc' ? 'Clics' : 'Pages Vues',
                data: pages.map(p => p.clicks || p.pageviews),
                backgroundColor: source === 'gsc' ? '#28a745' : '#667eea',
                borderColor: source === 'gsc' ? '#28a745' : '#667eea',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Mise à jour du graphique des requêtes par métrique
function updateQueriesChartMetric(metric) {
    const chart = charts.queries;
    
    if (metric === 'clicks') {
        chart.data.datasets[0].hidden = false;
        chart.data.datasets[1].hidden = true;
    } else {
        chart.data.datasets[0].hidden = true;
        chart.data.datasets[1].hidden = false;
    }
    
    chart.update();
}

// Mise à jour des recommandations
function updateRecommendations() {
    const recommendations = dashboardData.recommendations?.recommendations || [];
    const container = document.getElementById('recommendations-list');
    const countElement = document.getElementById('recommendations-count');
    
    countElement.textContent = recommendations.length;
    
    container.innerHTML = '';
    
    recommendations.forEach(rec => {
        const item = createRecommendationItem(rec);
        container.appendChild(item);
    });
}

// Création d'un élément de recommandation
function createRecommendationItem(recommendation) {
    const div = document.createElement('div');
    div.className = `recommendation-item ${recommendation.priority}-priority`;
    
    const priorityClass = recommendation.priority === 1 ? 'high' : 
                         recommendation.priority === 2 ? 'medium' : 'low';
    
    div.innerHTML = `
        <div class="recommendation-title">${recommendation.title}</div>
        <div class="recommendation-description">${recommendation.description}</div>
        <div class="recommendation-action">${recommendation.recommendation}</div>
        <div class="recommendation-meta">
            <span class="priority-badge ${priorityClass}">Priorité ${recommendation.priority}</span>
            <span>Impact: ${recommendation.impact}</span>
            <span>Effort: ${recommendation.effort}</span>
        </div>
    `;
    
    return div;
}

// Mise à jour des tableaux
function updateTables() {
    updatePagesTable();
    updateQueriesTable();
}

// Mise à jour du tableau des pages
function updatePagesTable() {
    const tbody = document.getElementById('pages-table-body');
    const pages = dashboardData.analytics?.top_pages || [];
    
    tbody.innerHTML = '';
    
    pages.slice(0, 10).forEach(page => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${truncateText(page.page, 40)}</td>
            <td>${formatNumber(page.pageviews)}</td>
            <td>${formatNumber(page.users)}</td>
            <td>${formatPercentage(page.bounce_rate)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Mise à jour du tableau des requêtes
function updateQueriesTable() {
    const tbody = document.getElementById('queries-table-body');
    const queries = dashboardData.searchConsole?.top_queries || [];
    
    tbody.innerHTML = '';
    
    queries.slice(0, 10).forEach(query => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${truncateText(query.query, 30)}</td>
            <td>${formatNumber(query.clicks)}</td>
            <td>${formatNumber(query.impressions)}</td>
            <td>${formatPercentage(query.ctr)}</td>
            <td>${query.position.toFixed(1)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Fonctions utilitaires
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatPercentage(num) {
    return num.toFixed(1) + '%';
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'short', month: 'short' });
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Gestion des états de chargement
function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('dashboard-content').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Export des données
function exportData(type) {
    let data = [];
    let filename = '';
    let headers = [];
    
    switch (type) {
        case 'pages':
            data = dashboardData.analytics?.top_pages || [];
            filename = 'pages-analytics';
            headers = ['Page', 'Pages Vues', 'Visiteurs', 'Taux de Rebond'];
            break;
        case 'queries':
            data = dashboardData.searchConsole?.top_queries || [];
            filename = 'queries-search-console';
            headers = ['Requête', 'Clics', 'Impressions', 'CTR', 'Position'];
            break;
    }
    
    // Création du CSV
    let csv = headers.join(',') + '\n';
    
    data.forEach(item => {
        if (type === 'pages') {
            csv += `"${item.page}",${item.pageviews},${item.users},${item.bounce_rate}\n`;
        } else {
            csv += `"${item.query}",${item.clicks},${item.impressions},${item.ctr},${item.position}\n`;
        }
    });
    
    // Téléchargement
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}
