from cloudinary.models import CloudinaryField
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.db import models

from accounts.utils import get_upload_path
from accounts.managers import CustomUserManager

from model_utils import Choices


GENDER_CHOICES = Choices(
    ('male', _('male')),
    ('female', _('female')),
    ('not_specified', _('not specified'))
)


class UserProfile(AbstractUser):
    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    email = models.EmailField(_("email address"), unique=True)
    bio = models.TextField(blank=True, null=True)
    # date_of_birth = models.DateField(default='')
    image = models.ImageField(upload_to=get_upload_path,
                              null=True, blank=True,
                              default='profile_image.png')
    # image = CloudinaryField('image', blank=True, null=True)
    gender = models.CharField(max_length=36, choices=GENDER_CHOICES,
                              default=GENDER_CHOICES.not_specified)
    contacts = models.ManyToManyField("self", blank=True,
                                      related_name="contact",
                                      symmetrical=False)
    blocked_contacts = models.ManyToManyField("self", blank=True,
                                              related_name="blocked",
                                              symmetrical=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return f'{self.username}'


class VerifyCode(models.Model):
    email = models.EmailField()
    code = models.CharField(max_length=4)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.email}: {self.created_at}'
