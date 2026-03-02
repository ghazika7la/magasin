from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Vérifie que l'API fonctionne"""
    return jsonify({
        'status': 'healthy',
        'timestamp': '2024-01-01T00:00:00',
        'version': '1.0.0',
        'env_test': {
            'ga4_property_id': os.getenv('GA4_PROPERTY_ID', 'NOT_SET'),
            'gsc_site_url': os.getenv('GSC_SITE_URL', 'NOT_SET'),
            'credentials_path': os.getenv('GOOGLE_APPLICATION_CREDENTIALS', 'NOT_SET')
        }
    })

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    """Endpoint de test simple"""
    return jsonify({
        'message': 'Backend fonctionne !',
        'python_version': '3.11',
        'flask_version': 'Flask OK'
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Démarrage du serveur sur http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
