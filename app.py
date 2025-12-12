"""
Simple web server for Databricks App deployment
Serves the Profit Calculator static web application
"""
import os
from flask import Flask, send_from_directory, send_file

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    """Serve the main index.html"""
    return send_file('index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files (CSS, JS, assets, fonts)"""
    return send_from_directory('.', path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)
