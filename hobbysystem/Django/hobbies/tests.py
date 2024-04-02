import datetime

from django.test import TestCase
from pytz import UTC

from hobbies.models import User, Hobbies


class AccountTest(TestCase):

    def test_create(self):
        User.objects.create(username='lisi',password=123456,age=26,birth='2021-12-10 12:42:15.344220')
        user = User.objects.get(username='lisi')
        # print(user.password)
        self.assertEqual(user.username,'lisi')
        self.assertEqual(user.password,'123456')
        self.assertEqual(user.age,26)


class LoginTest(TestCase):

    def test_login(self):
        url = 'http://localhost:8000/login'
        params = {}
        params['username'] = 'jack'
        params['password'] = 123456
        response = self.client.get(url,params)
        self.assertEqual(response.status_code,301)

class EditTest(TestCase):

    def test_birth(self):
        User.objects.create(username='lisi',password=123456,age=26,birth='2021-12-10 12:42:15.344220')
        user = User.objects.get(username='lisi')
        user.birth = '2021-12-20 12:42:15.344220'
        user.save()
        user1 = User.objects.get(username='lisi')
        self.assertEqual(user1.birth,datetime.datetime(2021, 12, 20, 12, 42, 15, 344220, tzinfo= UTC))


    def test_hobbies(self):
        Hobbies.objects.create(name='football',id=8)
        hobby = Hobbies.objects.get(id=8)
        self.assertEqual(hobby.name,'football')
        hobby.name = 'basketball'
        hobby.save()
        hobby = Hobbies.objects.get(id=8)
        self.assertEqual(hobby.name,'basketball')