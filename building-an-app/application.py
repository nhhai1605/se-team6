from flask import Flask, redirect, url_for, render_template, request, session, abort, make_response, flash
import requests
from datetime import datetime, timedelta
import re
application = app = Flask(__name__)
app.secret_key = 'se-team6'
app.permanent_session_lifetime = timedelta(minutes=10)
#API Gateway
regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'

def check(email):
    valid = False
    if(re.search(regex, email)):
        valid = True
    return valid
    
@app.route('/', methods = ['POST', 'GET'])
def index():
    return render_template('index.html')

@app.route('/login', methods = ['POST', 'GET'])
def login():
    if 'currentEmail' not in session:
        if request.method == 'POST':
            approved = False
            email = request.form['email']
            password = request.form['password']
            if(email == "admin@gmail.com" and password == "admin" and check(email) == True):
                session['currentEmail'] = email
                session['currentCart'] = ""
                session['cartQuantity'] = 0
                flash("Login succeeded as " + email)
                return redirect(url_for('index'))
            else:
                flash("Email or password is invalid! Try again!")
                return redirect(url_for('login'))
        else:
            return render_template('login.html')
    else:
        return redirect(url_for('index'))

@app.route('/logout')
def logout():
    if 'currentEmail' in session:
        session.pop('currentEmail', None)
        session.pop('currentCart', None)
        session.pop('cartQuantity', None)
        flash("Logout succeeded")
        return redirect(url_for('login'))
    else: 
        return render_template('index.html')

@app.route('/register', methods = ['POST', 'GET'])
def register():
    if request.method == 'POST':
        registered = False
        email = request.form['email']
        password = request.form['password']
        repeatpassword = request.form['repeatpassword']
        if(check(email) == True):
            if(repeatpassword == password):
                registered = True
                if(registered):
                    flash("Registered succeed! Please verify your email to login!")
                    return redirect(url_for('login'))
                else:
                    flash("Email is already existed!")
                    return redirect(url_for('register'))
            else:
                flash("Passwords don't match")
                return redirect(url_for('register'))
        else:
            flash("Email is invalid!")
            return redirect(url_for('register'))
    else:
        return render_template('register.html')       
@app.route('/user/<pageEmailRoute>', methods = ['POST', 'GET'])
def user(pageEmailRoute):
    userExisted = True
    if userExisted:
        posts = []
        return render_template('user.html', pageEmail = pageEmailRoute, posts = posts)
    else:
        return abort(404)
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)