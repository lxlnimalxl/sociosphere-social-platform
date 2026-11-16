from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserProfileViewSet, StoryViewSet, PostViewSet,
    ChatMessageViewSet, seed_database
)

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'stories', StoryViewSet, basename='story')
router.register(r'posts', PostViewSet, basename='post')
router.register(r'messages', ChatMessageViewSet, basename='message')

urlpatterns = [
    path('', include(router.urls)),
    path('seed/', seed_database, name='seed_database'),
]
