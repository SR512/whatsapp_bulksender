import os

import pandas as pd
from flask import Blueprint, render_template, request, session
from requests.exceptions import HTTPError
from werkzeug.utils import secure_filename

from src.whatsapp_web import web_driver_load, whatsapp_login, sendMessage, sendMediaFile, create_new_folder

web_blueprint = Blueprint('webs', __name__)
from app import app
import json
from urllib.parse import urlencode
from urllib.request import Request, urlopen
from urllib.error import HTTPError

# @web_blueprint.route('/openweb')
# def openweb():
#     whatsapp_web.openWhatsappWeb()
#     return jsonify(result="Whatsapp Web Open Succesfully..!")
#     pass
#
#
#
#
# @web_blueprint.route('/sendText', methods=['POST'])
# def sendText():
#     return render_template('Dashboard.Jinja2')
#     pass

@web_blueprint.route('/', methods=['POST'])
def home():
    if not session.get('logged_in'):
        return render_template('login_vw.Jinja2')
    else:
        return render_template('Dashboard.Jinja2')


@web_blueprint.route('/back')
def back():
    if not session.get('logged_in'):
        return render_template('login_vw.Jinja2')
    else:
        return render_template('Dashboard.Jinja2')


@web_blueprint.route('/media', methods=['GET'])
def media_page():
    if not session.get('logged_in'):
        return render_template('login_vw.Jinja2')
    else:
        return render_template('send_media.Jinja2')


@web_blueprint.route('/login', methods=['POST'])
def login():
    try:
        name = request.form.get('user')
        pwd = request.form.get('password')

        url = 'http://www.krishivgroups.com/api/auth/login'  # Set destination URL here
        post_fields = {'email': name, 'password': pwd}  # Set POST fields here

        requestdata = Request(url, urlencode(post_fields).encode())

        json_obj = urlopen(requestdata).read().decode()
        data = json.loads(json_obj)

        if data['success']['success']:

            for item in data['data']['Balance']:
                if item is None:
                    session['Fail'] = 'You Have No Whatsapp Balance...!'
                    return home()

                else:
                    session['logged_in'] = True
                    session['email'] = str(name)
                    session['type'] = str(item['type'])
                    session['Balance'] = str(item['Balance'])
                    session['Validity'] = str(item['Validity'])
                    session['name'] = str(item['name'])
                    return home()

    except HTTPError:
        session['Fail'] = "Wrong User Name Password..!"
        return home()
        pass


@web_blueprint.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    message = request.form.get('message');
    df = pd.read_excel(file, index_col=None, header=None)

    balance = session.get('Balance')
    balance2 = 0
    if str(balance) == str(balance2):

        session['Fail'] = 'You Have No Whatsapp Balance...!'
        return home()
    else:
        web_driver_load()
        whatsapp_login()
        sendMessage(message, *df[0])

        try:
            name = session.get('name')
            balance = session.get('send')

            url = 'http://www.krishivgroups.com/api/auth/balance'  # Set destination URL here
            post_fields = {'name': name, 'balance': balance}  # Set POST fields here

            requestdata = Request(url, urlencode(post_fields).encode())

            json_obj = urlopen(requestdata).read().decode()
            data = json.loads(json_obj)

            if data['success']['success']:

                return home()
                pass

        except HTTPError:
            return home()
            pass


@web_blueprint.route('/sendMedia', methods=['POST'])
def sendMedia():
    file = request.files['file']
    media = request.files['media']

    balance = session.get('Balance')
    balance2 = 0

    if str(balance) == str(balance2):
        session['Fail'] = 'You Have No Whatsapp Balance...!'
        return home()
    else:
        img_name = secure_filename(media.filename)
        create_new_folder(app.config['UPLOAD_FOLDER'])
        saved_path = os.path.join(app.config['UPLOAD_FOLDER'], img_name)
        app.logger.info("saving {}".format(saved_path))
        media.save(saved_path)

        message = request.form.get('caption')

        df = pd.read_excel(file, index_col=None, header=None)

        web_driver_load()
        whatsapp_login()
        sendMediaFile(message, *df[0], path=saved_path)

    try:
        name = session.get('name')
        balance = session.get('send')

        url = 'http://www.krishivgroups.com/api/auth/balance'  # Set destination URL here
        post_fields = {'name': name, 'balance': balance}  # Set POST fields here

        requestdata = Request(url, urlencode(post_fields).encode())

        json_obj = urlopen(requestdata).read().decode()
        data = json.loads(json_obj)

        if data['success']['success']:
            return home()
            pass

    except HTTPError:
        return home()
        pass


@web_blueprint.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return home()


