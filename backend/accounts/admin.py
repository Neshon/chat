from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import VerifyCode, UserProfile


class UserAdmin(BaseUserAdmin):

    fieldsets = (
        (None, {'fields': ('email', 'username', 'bio', 'image', 'gender', 'contacts', 'blocked_contacts')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
          'classes': ('wide', ),
          'fields': ('email', ),
        }),
    )
    list_display = ['email', 'is_staff']
    search_fields = ('email',)
    ordering = ('email', )


admin.site.register(VerifyCode)
admin.site.register(UserProfile, UserAdmin)
