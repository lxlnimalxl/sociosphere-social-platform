from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .models import UserProfile, Story, Post, Comment, ChatMessage
from .serializers import (
    UserProfileSerializer, StorySerializer, PostSerializer,
    CommentSerializer, ChatMessageSerializer
)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'username'

    @action(detail=True, methods=['post'])
    def follow(self, request, username=None):
        profile = self.get_object()
        profile.is_following = not profile.is_following
        if profile.is_following:
            profile.followers_count += 1
        else:
            profile.followers_count = max(0, profile.followers_count - 1)
        profile.save()
        return Response({
            'status': 'success',
            'is_following': profile.is_following,
            'followers_count': profile.followers_count
        })

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

    @action(detail=True, methods=['post'])
    def mark_seen(self, request, pk=None):
        story = self.get_object()
        story.is_seen = True
        story.save()
        return Response({'status': 'marked seen'})

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=True, methods=['post'])
    def toggle_like(self, request, pk=None):
        post = self.get_object()
        post.is_liked = not post.is_liked
        if post.is_liked:
            post.likes_count += 1
        else:
            post.likes_count = max(0, post.likes_count - 1)
        post.save()
        return Response({
            'status': 'success',
            'is_liked': post.is_liked,
            'likes_count': post.likes_count
        })

    @action(detail=True, methods=['get', 'post'])
    def comments(self, request, pk=None):
        post = self.get_object()
        if request.method == 'POST':
            author_name = request.data.get('author_name', 'You')
            author_avatar = request.data.get('author_avatar', '')
            text = request.data.get('text', '')
            if not text:
                return Response({'error': 'Comment text required'}, status=status.HTTP_400_BAD_REQUEST)
            comment = Comment.objects.create(
                post=post,
                author_name=author_name,
                author_avatar=author_avatar,
                text=text
            )
            post.comments_count = post.comments.count()
            post.save()
            return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)
        
        comments = post.comments.all()
        return Response(CommentSerializer(comments, many=True).data)

class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        contact = self.request.query_params.get('contact')
        if contact:
            qs = qs.filter(recipient_name__icontains=contact) | qs.filter(sender_name__icontains=contact)
        return qs

@api_view(['POST'])
def seed_database(request):
    """Seed database with default Figma prototype data"""
    from .seed import run_seed
    run_seed()
    return Response({'status': 'database successfully seeded with figma assets'})
