from django.urls import path, include

from rest_framework.documentation import include_docs_urls
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from . import views


router = DefaultRouter()
router.register('register', views.VerifyCodeViewSet, basename='code')
router.register('rooms', views.RoomViewSet)
router.register(r'rooms/(?P<id>[0-9]+)/messages', views.MessageViewSet)
router.register('profiles', views.ProfileViewSet)
router.register(r'profiles/(?P<id>[0-9]+)/contacts',
                views.ContactViewSet,
                basename='contacts')
router.register(r'profiles/(?P<id>[0-9]+)/blocked_contacts',
                views.BlockedViewSet,
                basename='blocked_contacts')


urlpatterns = [

    path('v1/docs/', include_docs_urls(title='Chat API', public=False)),

    path('v1/register/confirm/',
         views.UserCreateView.as_view(),
         name='token_obtain'),
    path('v1/register/token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    path('v1/register/token/verify/',
         jwt_views.TokenVerifyView.as_view(),
         name='token_verify'),

    path('v1/', include(router.urls))
]
