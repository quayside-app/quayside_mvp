from flask import Flask
from flask import render_template
from flask import request
from chatGPT import query_chat_gpt

app = Flask(__name__)

@app.route('/')
def main_page():  # put application's code here
    return render_template("main.html")

#take subprompt
#make sure it is a post request
#send to ChatGPT
@app.route('/process', methods = ['POST'])
def process():

    if request.method == 'POST':
        """modify/update the information for <user_id>"""
        # you can use <user_id>, which is a str but could
        # changed to be int or whatever you want, along
        # with your lxml knowledge to make the required
        # changes
        data = request.form # a multidict containing POST
        subprompt = data['prompt']
        return render_template("response.html", chat_gpt_response=query_chat_gpt(subprompt))
    else:
        return "only post supported"


if __name__ == '__main__':
    app.run()
