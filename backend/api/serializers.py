from rest_framework import serializers
from .models import UserProfile, Story, Post, Comment, ChatMessage

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class StorySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    full_name = serializers.CharField(source='user.full_name', read_only=True)
    avatar_url = serializers.CharField(source='user.avatar_url', read_only=True)

    class Meta:
        model = Story
        fields = ['id', 'user', 'username', 'full_name', 'avatar_url', 'media_url', 'is_seen', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    author_name = serializers.CharField(source='author.full_name', read_only=True)
    author_avatar = serializers.CharField(source='author.avatar_url', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'id', 'author', 'author_username', 'author_name', 'author_avatar',
            'media_url', 'caption', 'likes_count', 'comments_count',
            'is_liked', 'created_at', 'comments'
        ]

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'
