from flask import Flask, render_template, request
from chatGPT import query_chat_gpt

app = Flask(__name__)

@app.route('/')
def main_page():
    return render_template("main.html")

@app.route('/process', methods=['POST'])
def process():
    if request.method == 'POST':
        data = request.form
        subprompt = data['prompt']
        return render_template("response.html", chat_gpt_response=query_chat_gpt(subprompt))
    else:
        return "Only POST requests are supported"

if __name__ == '__main__':
    app.run()
