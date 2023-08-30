import openai
import chatGPT_creds


def query_chat_gpt(input):
    openai.api_key = chatGPT_creds.API_KEY

    # Tells chatGPT how to act
    role = "You are a project management tool called quayside whose mission is to ignite collaborative productivty. You are focused on Quality, accessibility. You make org-work more enjoyable for teams. The key question you are trying to answer is 'what do I work on next?' Honesty and transparancy are important to you."
    
    # Prompt instructions with user input
    prompt = "Break the following input into 3 sub tasks: " + input
    
    # Info sent to chatGPT
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {"role": "system", "content": role},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2,  # Lower makes responses more consistent/litera
        max_tokens = 500
    )

    # chatGPT output message
    output = completion.choices[0].message.content
    
    return output
    