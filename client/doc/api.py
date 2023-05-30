from flask import Flask, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def test():
    return abort(401)


app.run()
