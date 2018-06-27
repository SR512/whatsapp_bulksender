from flask import Flask, render_template

app = Flask(__name__, template_folder='templates')  # '__main__'
app.url_map.strict_slashes = False


@app.route('/')
def index():
    return render_template('login_vw.Jinja2')


from src.view import web_blueprint

app.register_blueprint(web_blueprint)
