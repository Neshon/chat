from django.db import models
from django.db.models import Q
from django.utils.text import slugify

from accounts.models import UserProfile


class RoomManager(models.Manager):
    def create_room_if_none(self, first_user, second_user):
        has_room = Room.objects.filter(Q(first_user=first_user,
                                         second_user=second_user) |
                                       Q(first_user=second_user,
                                         second_user=first_user)).first()
        if not has_room:
            print('not found so creating one ')
            Room.objects.create(first_user=first_user, second_user=second_user)
        return has_room


class Message(models.Model):
    user = models.ForeignKey(UserProfile, related_name='messages',
                             on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return f'{self.user}: {self.text[:10]}'


class Room(models.Model):
    first_user = models.ForeignKey(UserProfile,
                                   on_delete=models.CASCADE,
                                   related_name='first_user',
                                   null=True)
    second_user = models.ForeignKey(UserProfile,
                                    on_delete=models.CASCADE,
                                    related_name="second_user",
                                    null=True
                                    )
    message = models.ManyToManyField(Message, related_name='rooms',
                                     blank=True, symmetrical=False)
    room = models.CharField(max_length=255)
    slug = models.SlugField(
        default='',
        editable=True,
    )

    objects = RoomManager()

    class Meta:
        verbose_name_plural = 'Room'
        unique_together = ['first_user', 'second_user']

    def __str__(self):
        return f'{self.room}'

    def save(self, *args, **kwargs):
        value = self.room
        self.slug = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)
