from django.db import models

class UserProfile(models.Model):
    username = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=150)
    avatar_url = models.CharField(max_length=500, blank=True)
    cover_url = models.CharField(max_length=500, blank=True)
    bio = models.TextField(blank=True)
    followers_count = models.IntegerField(default=1024)
    following_count = models.IntegerField(default=342)
    is_following = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"@{self.username} ({self.full_name})"

class Story(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='stories')
    media_url = models.CharField(max_length=500)
    is_seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Story by @{self.user.username}"

class Post(models.Model):
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='posts')
    media_url = models.CharField(max_length=500)
    caption = models.TextField(blank=True)
    likes_count = models.IntegerField(default=0)
    comments_count = models.IntegerField(default=0)
    is_liked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Post by @{self.author.username} ({self.id})"

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author_name = models.CharField(max_length=150)
    author_avatar = models.CharField(max_length=500, blank=True)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Comment by {self.author_name} on Post {self.post.id}"

class ChatMessage(models.Model):
    sender_name = models.CharField(max_length=150)
    sender_avatar = models.CharField(max_length=500, blank=True)
    recipient_name = models.CharField(max_length=150)
    text = models.TextField()
    is_me = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.sender_name} -> {self.recipient_name}: {self.text[:20]}"
