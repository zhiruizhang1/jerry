import json

# coding=utf-8
from django.http import HttpResponse, JsonResponse

# Create your views here.
from django.shortcuts import redirect
from django.urls import reverse

from hobbies import models
from hobbies.models import User, Hobbies, Friends



def login(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    user = models.User.objects.get(username=username)
    res = {}
    id = ''
    print(username)
    print(password)
    if user == None:
        message = 'user not exist'
    else:
        if user.password == password:
            message = 'ok'
            id = user.id
            name = username
        else:
            message = ''
    res['code'] = 200
    res['msg'] = message
    res['id'] = id
    res['username'] = username
    return HttpResponse(json.dumps(res, ensure_ascii=False),content_type='application/json')


def addUser(request,user):
    user.save()
    return HttpResponse("<p>data add success！</p>")

def updateUserById(request,user,hobby_list):
    user1 = User.objects.get(userID=user.userID)
    user1.username = user.username
    user1.password = user.password
    user1.city = user.city
    user1.email = user.email
    user1.phone = user.phone
    for hobby in hobby_list:
        user1.hobby.add(hobby)
    user1.save()
    return HttpResponse(user1)

def deleteUserById(request,id):
    user = User.objects.get(id=id)
    user.delete()
    user.save()
    return HttpResponse("delete success")

def addHobby(request,hobby):
    hobby.save()
    return HttpResponse("add success")


def updateHobbyById(request,hobby):
    hobby1 = Hobbies.objects.get(id=hobby.HobbiesID)
    hobby1.name = hobby.name
    hobby1.save()
    return HttpResponse("update success")


def deleteHobbyById(request,id):
    hobby = Hobbies.objects.get(id=id)
    hobby.delete()
    hobby.save()
    return HttpResponse("delete success")


def selectAllHobbies(request):
    return redirect(reverse('AllHobbies'))

def addFriend(request):
    friend = Friends()
    oneID = int(request.GET.get('oneID'))
    print(oneID)
    user1 = User.objects.get(id=oneID)
    twoID = int(request.GET.get('twoID'))
    print(twoID)
    user2 = User.objects.get(id=twoID)
    friend.FriendsOneID = user1
    friend.FriendsTwoID = user2
    friend.save()
    return HttpResponse("<p>friend add success！</p>")


def selectAllHobbiesAndUser():
    users = models.User.objects.all().values("id", "username", "email", "city", "age", "hobbyString__name")
    finUsers = {}
    for user in users:
        if user['id'] not in finUsers.keys():
            finUsers[user['id']] = user
        else:
            finUsers[user['id']]['hobbyString__name'] += ("," + user['hobbyString__name'])
    for finUser in finUsers:
        # finUser[finUser['id']]['hobbyString'] = finUser[finUser['id']]['hobbyString__name']
        finUsers[finUser]['hobbyString'] = finUsers[finUser]['hobbyString__name']
        finUsers[finUser].pop('hobbyString__name')

    return finUsers

def selectUserByHobby(request):
    hobby = request.GET.get('hobby')
    print(hobby)
    if hobby=="":
        users = User.objects.values("id", "username", "email", "city", "age","hobbyString__name", "hobbyString__id")
    else:
        users = User.objects.filter(hobbyString__id=hobby).values("id", "username", "email", "city", "age", "hobbyString__name","hobbyString__id")
    finUsers = {}
    for user in users:
        if user['id'] not in finUsers.keys():
            finUsers[user['id']] = user
        else:
            finUsers[user['id']]['hobbyString__name'] += ("," + user['hobbyString__name'])
    finUsers_list = []
    for finUser in finUsers:
        finUsers[finUser]['hobbyString'] = finUsers[finUser]['hobbyString__name']
        finUsers[finUser].pop('hobbyString__name')
        finUsers_list.append(finUsers[finUser])
    res = change(finUsers_list)
    return HttpResponse(json.dumps(res,ensure_ascii=False))


def change(list):
    res = {}
    res['code'] = 200
    res['msg'] = 'ok'
    res['data'] = list
    return res

def selectAllUser(request):
    users = selectAllHobbiesAndUser()
    user_list = []
    for user in users.values():
        user_list.append(user)
    res = change(user_list)
    return HttpResponse(json.dumps(res, ensure_ascii=False))


def selectUserByAge(request):
    startAge = int(request.GET.get('startAge'))
    print(startAge)
    endAge = int(request.GET.get('endAge'))
    print(endAge)
    city = request.GET.get('city')
    print(city)
    users = selectAllHobbiesAndUser()
    delete = []
    for key in users.keys():
        if city == "" or city == None:
            if users[key]['age'] not in range(startAge, endAge + 1):
                delete.append(key)
        else:
            if users[key]['age'] not in range(startAge, endAge + 1) or users[key]['city'] != city:
                delete.append(key)
    for dele in delete:
        users.pop(dele)
    users_list = []
    for user in users:
        users_list.append(users[user])
    res = change(users_list)
    return HttpResponse(json.dumps(res, ensure_ascii=False))


def selectHobbies(request):
    hobbies_list = models.Hobbies.objects.all().values('id', 'name')
    hobbies = []
    for hobby in hobbies_list:
        hobbies.append(hobby)
    res = {}
    res['code'] = 200
    res['msg'] = "ok"
    res['data'] = hobbies
    return HttpResponse(json.dumps(res, ensure_ascii=False), content_type='application/json')