from flask import Flask, render_template, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SECRET_KEY'] = '00355225cf522a0d875b24ec777e7d45'
bcrypt = Bcrypt(app)


class MyForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])
    submit = SubmitField('send')


@app.route('/', methods=['GET', 'POST'])
def pysheet():
    form = MyForm()
    if form.validate_on_submit():
        hashed_pwd = str(bcrypt.generate_password_hash(form.password.data))
        data = [form.username.data, form.email.data, hashed_pwd]
        sendData(data)
    return render_template('pysheet.html', form=form)


def sendData(row):
    scope = ['https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name(
        'cred.json', scope)
    client = gspread.authorize(creds)
    sheet = client.open('pysheet').sheet1
    sheet.append_row(row)


if __name__ == '__main__':
    app.run(debug=True)
