import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('cred.json', scope)
client = gspread.authorize(creds)

sheet = client.open('pysheet').sheet1

row = ['username1', 'email', 'password']
sheet.append_row(row)
