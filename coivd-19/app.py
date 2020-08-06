import urllib.request
from flask import Flask, render_template
import json

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    data = getData()
    return render_template('index.html', data=data)


def getData():
    url = 'https://api.covid19api.com/summary'

    with urllib.request.urlopen(url) as response:
        html = response.read()
    data = json.loads(html.decode('utf-8'))
    return data


if __name__ == "__main__":
    app.run(debug=True)
