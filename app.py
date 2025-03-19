from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/echo', methods=['POST'])
def echo():
    data = request.get_json()
    text = data.get('text', '')
    processed_text = text.strip() if text else "No text provided"
    return jsonify({
        'message': 'Texto recibido correctamente',
        'text': processed_text
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
