from django.contrib.auth.models import AbstractUser
from django.db import models
class Hobbies(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=32)

    class Meta:
        verbose_name = 'hobby message'
        verbose_name_plural = verbose_name
class User(AbstractUser):
    id= models.AutoField(primary_key=True)
    image = models.ImageField()
    email = models.EmailField()
    city = models.CharField(max_length=32)
    birth = models.DateTimeField()
    age = models.IntegerField(null=True)
    hobbyString = models.ManyToManyField(to="Hobbies")
    class Meta:
        verbose_name = 'user message'
        verbose_name_plural = verbose_name

class Friends(models.Model):
    FriendsOneID = models.ForeignKey(User,on_delete=models.CASCADE,related_name="user1",null=True)
    FriendsTwoID = models.ForeignKey(User,on_delete=models.CASCADE,related_name="user2",null=True)



