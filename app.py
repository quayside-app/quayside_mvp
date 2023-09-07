"""Module running the app"""
from flask import Flask, render_template, request
from chatGPT import query_chat_gpt

app = Flask(__name__)

@app.route('/')
def main_page() -> str:
    """
    function that displays the main page
    :return: a string containing main.html
    """
    return render_template("main.html")

@app.route('/process', methods=['POST'])
def process() -> str:
    """
    a function that processes the post request

    :return: a string containing the content
    """
    if request.method == 'POST':
        data = request.form
        subprompt = data['prompt']
        return render_template("response.html", chat_gpt_response=query_chat_gpt(subprompt))

    return "Only POST requests are supported"

if __name__ == '__main__':
    app.run()
