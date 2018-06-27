from app import app
import os

PROJECT_HOME = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = '{}/image/'.format(PROJECT_HOME)

if __name__ == '__main__':
    app.secret_key = os.urandom(12)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.run(debug=True, port=5000)