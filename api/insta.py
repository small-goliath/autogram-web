import json
from typing import Dict
from instagrapi import Client
from api.model.payload import InstagramAccount

class Insta():
    def __init__(self, account: InstagramAccount):
        self.client = Client()
        self.username = account.username
        self.password = account.password
        self.verification_code = account.verification_code
        self.session = account.session
        self.session_file = f"insta_session/{self.username}.json"

    def login_with_password(self) -> Dict:
        self.client.login(self.username, self.password, verification_code=self.verification_code)
        return self.client.get_settings()
    
    def login_with_session(self) -> Dict:
        self.client.set_settings(json.loads(self.session))
        return self.client.get_settings()