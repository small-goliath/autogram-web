import json
from instagrapi import Client
from api.model.payload import AccountCreate

class Insta():
    def __init__(self, account: AccountCreate):
        self.client = Client()
        self.username = account.username
        self.password = account.password
        self.verification_code = account.verification_code
        self.session_file = f"insta_session/{self.username}.json"

    def login(self):
        try:
            with open(self.session_file, 'r', encoding='utf-8') as f:
                content = json.load(f)
                self.client.set_settings(content)
        except FileNotFoundError:
            self.client.login(self.username, self.password, verification_code=self.verification_code)
        finally:
            self.client.dump_settings(self.session_file)