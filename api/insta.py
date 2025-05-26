import json
from typing import Dict
from instagrapi import Client
from instagrapi.types import UserShort
from api.model.entity import Producer
from api.model.payload import InstagramAccount, ProducerCreate

user_id_map = {"gangggi_e_you": 5528659613,
               "kang_mayo": 4337970266,
               "sssungho_hoya": 1187076663,
               "sso._.hani_": 36874395907,
               "terry_k_0225": 511425933,
               "pinkmongkii": 2343222695,
               "hyejin_7931": 1900989323,
               "yehyun__oo": 9199261992,
               "jieunisong": 8528991616,
               "reumssi": 27883669,
               "_misogood": 5764911388,
               "mina.c": 792696615,
               "youngjoo_peach": 1805283700,
               "ssum_nam": 2982986712}

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
    
    def search_followers(self, username: str) -> Dict[str, UserShort]:
        try:
            user_id = user_id_map[username]
            if user_id is None:
                raise Exception("팔로워 조회가 불가능한 유저입니다.")
            return self.client.user_followers(user_id)
        except Exception as e:
            raise Exception(f"{username}의 팔로워 조회를 하지 못했습니다.") from e
    
    def search_followings(self, username: str) -> Dict[str, UserShort]:
        try:
            user_id = user_id_map[username]
            if user_id is None:
                raise Exception("팔로워 조회가 불가능한 유저입니다.")
            return self.client.user_following(user_id)
        except Exception as e:
            raise Exception(f"{username}의 팔로잉 조회를 못했습니다.") from e