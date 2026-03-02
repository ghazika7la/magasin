from flask import Flask, jsonify
from flask_cors import CORS
import os
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app, origins=['http://localhost:8000', 'http://127.0.0.1:8000', 'http://localhost:5000', 'http://127.0.0.1:5000'])

# Données de test simulées
def generate_test_data():
    """Génère des données de test réalistes"""
    base_date = datetime.now() - timedelta(days=7)
    
    # Données GA4 simulées
    daily_data = []
    for i in range(7):
        date = base_date + timedelta(days=i)
        daily_data.append({
            'date': date.strftime('%Y-%m-%d'),
            'users': random.randint(80, 150),
            'sessions': random.randint(100, 180),
            'pageviews': random.randint(300, 600)
        })
    
    ga4_data = {
        'kpi': {
            'total_users': sum(d['users'] for d in daily_data),
            'total_sessions': sum(d['sessions'] for d in daily_data),
            'total_pageviews': sum(d['pageviews'] for d in daily_data),
            'avg_bounce_rate': round(random.uniform(45, 75), 2),
            'avg_engagement_rate': round(random.uniform(40, 70), 2),
            'pages_per_session': round(random.uniform(2.5, 4.5), 2)
        },
        'daily_data': daily_data,
        'top_pages': [
            {'page': '/', 'pageviews': 450, 'users': 120, 'bounce_rate': 65.5},
            {'page': '/jeux.html', 'pageviews': 320, 'users': 85, 'bounce_rate': 45.2},
            {'page': '/contact', 'pageviews': 180, 'users': 65, 'bounce_rate': 35.8},
            {'page': '/about', 'pageviews': 150, 'users': 45, 'bounce_rate': 28.3},
            {'page': '/blog', 'pageviews': 120, 'users': 38, 'bounce_rate': 42.1}
        ],
        'traffic_sources': [
            {'source': 'organic', 'sessions': 280, 'users': 180},
            {'source': 'direct', 'sessions': 150, 'users': 95},
            {'source': 'social', 'sessions': 80, 'users': 52},
            {'source': 'referral', 'sessions': 60, 'users': 38}
        ]
    }
    
    # Données GSC simulées
    gsc_data = {
        'kpi': {
            'total_clicks': random.randint(200, 400),
            'total_impressions': random.randint(2000, 5000),
            'avg_ctr': round(random.uniform(2.5, 8.5), 2),
            'avg_position': round(random.uniform(8, 25), 2)
        },
        'top_queries': [
            {'query': 'magasin jeux vidéo', 'clicks': 45, 'impressions': 1200, 'ctr': 3.75, 'position': 8.2},
            {'query': 'jeux pas cher', 'clicks': 38, 'impressions': 980, 'ctr': 3.88, 'position': 12.5},
            {'query': 'achat jeux en ligne', 'clicks': 32, 'impressions': 850, 'ctr': 3.76, 'position': 15.3},
            {'query': 'jeux console', 'clicks': 28, 'impressions': 720, 'ctr': 3.89, 'position': 18.7},
            {'query': 'PC gaming', 'clicks': 25, 'impressions': 650, 'ctr': 3.85, 'position': 22.1}
        ],
        'top_pages': [
            {'page': '/', 'clicks': 85, 'impressions': 2200, 'ctr': 3.86, 'position': 7.5},
            {'page': '/jeux.html', 'clicks': 62, 'impressions': 1800, 'ctr': 3.44, 'position': 11.2},
            {'page': '/contact', 'clicks': 28, 'impressions': 750, 'ctr': 3.73, 'position': 16.8}
        ]
    }
    
    # Recommandations simulées
    recommendations = [
        {
            'type': 'high_bounce_rate',
            'title': 'Taux de rebond élevé détecté',
            'description': 'Le taux de rebond moyen est de 65.5%, ce qui est au-dessus du seuil recommandé de 70%.',
            'recommendation': 'Améliorez la pertinence du contenu, optimisez la vitesse de chargement et assurez-vous que les pages répondent aux attentes des visiteurs.',
            'priority': 1,
            'impact': 'high',
            'effort': 'medium'
        },
        {
            'type': 'low_ctr_good_position',
            'title': 'CTR faible pour la requête: "jeux pas cher"',
            'description': 'La requête "jeux pas cher" est en position 12.5 mais n\'a qu\'un CTR de 3.88%.',
            'recommendation': 'Optimisez le titre et la meta description de la page concernée pour augmenter le CTR.',
            'priority': 1,
            'impact': 'high',
            'effort': 'low'
        },
        {
            'type': 'organic_traffic_opportunity',
            'title': 'Opportunité d\'amélioration: /',
            'description': 'La page / reçoit 85 clics organiques mais a un taux de rebond de 65.5%.',
            'recommendation': 'Le contenu attire les visiteurs mais ne les retient pas. Améliorez la pertinence et l\'expérience utilisateur.',
            'priority': 2,
            'impact': 'medium',
            'effort': 'medium'
        }
    ]
    
    return {
        'analytics': ga4_data,
        'searchConsole': gsc_data,
        'recommendations': {
            'total_recommendations': len(recommendations),
            'high_priority': len([r for r in recommendations if r.get('priority') == 1]),
            'medium_priority': len([r for r in recommendations if r.get('priority') == 2]),
            'low_priority': len([r for r in recommendations if r.get('priority') == 3]),
            'recommendations': recommendations
        }
    }

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0',
        'mode': 'test_data'
    })

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    data = generate_test_data()
    return jsonify({
        'success': True,
        'data': data['analytics'],
        'period': '7 jours',
        'last_updated': datetime.now().isoformat()
    })

@app.route('/api/searchconsole', methods=['GET'])
def get_search_console():
    data = generate_test_data()
    return jsonify({
        'success': True,
        'data': data['searchConsole'],
        'period': '7 jours',
        'last_updated': datetime.now().isoformat()
    })

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    data = generate_test_data()
    return jsonify({
        'success': True,
        'data': data['recommendations'],
        'last_updated': datetime.now().isoformat()
    })

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    data = generate_test_data()
    return jsonify({
        'success': True,
        'data': {
            'analytics': data['analytics'],
            'search_console': data['searchConsole'],
            'recommendations': data['recommendations']
        },
        'period': '7 jours',
        'last_updated': datetime.now().isoformat()
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🚀 Backend de test démarré sur http://localhost:{port}")
    print("📊 Données simulées activées")
    app.run(host='0.0.0.0', port=port, debug=True)
