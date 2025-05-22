import json
from typing import Dict
from instagrapi import Client
from api.model.payload import ProducerCreate

class Insta():
    def __init__(self, account: ProducerCreate):
        self.client = Client()
        self.username = account.username
        self.password = account.password
        self.verification_code = account.verification_code
        self.session_file = f"insta_session/{self.username}.json"

    def login(self) -> Dict:
        self.client.login(self.username, self.password, verification_code=self.verification_code)
        return self.client.get_settings()