from .models import UserProfile, Story, Post, Comment, ChatMessage

def run_seed():
    UserProfile.objects.all().delete()
    Story.objects.all().delete()
    Post.objects.all().delete()
    Comment.objects.all().delete()
    ChatMessage.objects.all().delete()

    # 1. Profiles
    catherine = UserProfile.objects.create(
        username='Catherine13',
        full_name='Catherine Vance',
        avatar_url='/assets/images/avatar-catherine.png',
        cover_url='/assets/images/profile-cover.png',
        bio='My name is Catherine. I like dancing in the rain and travelling all around the world.',
        followers_count=1024,
        following_count=342,
        is_following=False
    )

    claire = UserProfile.objects.create(
        username='ClaireD15',
        full_name='Claire Dangais',
        avatar_url='/assets/images/avatar-claire.png',
        bio='Visual artist & street photographer living between Paris and Tokyo.',
        followers_count=2480,
        following_count=410,
        is_following=True
    )

    farita = UserProfile.objects.create(
        username='SmithFa',
        full_name='Farita Smith',
        avatar_url='/assets/images/avatar-farita.png',
        bio='Architectural minimalist | Coffee enthusiast | Exploring geometric forms.',
        followers_count=1890,
        following_count=312,
        is_following=False
    )

    benjamin = UserProfile.objects.create(
        username='BenjaminM',
        full_name='Benjamin Moore',
        avatar_url='/assets/images/avatar-benjamin.png',
        bio='Product designer & tech explorer.',
        followers_count=980,
        following_count=210,
        is_following=True
    )

    marie = UserProfile.objects.create(
        username='Marie_D',
        full_name='Marie Dupont',
        avatar_url='/assets/images/story-marie.png',
        bio='Botanical curator & aesthetic dreamer.',
        followers_count=1430,
        following_count=195,
        is_following=False
    )

    you = UserProfile.objects.create(
        username='You',
        full_name='You',
        avatar_url='/assets/images/story-you.png',
        bio='Creative coder & full-stack architect.',
        followers_count=3540,
        following_count=480,
        is_following=False
    )

    # 2. Stories
    Story.objects.create(user=you, media_url='/assets/images/story-you.png')
    Story.objects.create(user=benjamin, media_url='/assets/images/story-benjamin.png')
    Story.objects.create(user=farita, media_url='/assets/images/story-farita.png')
    Story.objects.create(user=marie, media_url='/assets/images/story-marie.png')
    Story.objects.create(user=claire, media_url='/assets/images/story-claire.png')

    # 3. Posts
    p1 = Post.objects.create(
        author=claire,
        media_url='/assets/images/post-claire.png',
        caption='Morning brew in the heart of Shibuya. The light today was completely unmatched.',
        likes_count=1420,
        comments_count=38,
        is_liked=True
    )
    Comment.objects.create(
        post=p1,
        author_name='Catherine Vance',
        author_avatar='/assets/images/avatar-catherine.png',
        text='The atmosphere here is pure perfection! Which lens did you use?'
    )
    Comment.objects.create(
        post=p1,
        author_name='Benjamin Moore',
        author_avatar='/assets/images/avatar-benjamin.png',
        text='Amazing lighting!'
    )

    p2 = Post.objects.create(
        author=farita,
        media_url='/assets/images/post-farita.png',
        caption='Golden hour architectural reflections. Minimalist lines meeting organic warmth.',
        likes_count=892,
        comments_count=19,
        is_liked=False
    )
    Comment.objects.create(
        post=p2,
        author_name='Claire Dangais',
        author_avatar='/assets/images/avatar-claire.png',
        text='Sensational symmetry!'
    )

    # 4. Chat Messages (Benjamin Moore & Catherine)
    messages = [
        ("Benjamin Moore", "Catherine Vance", "Hi Catherine ! How are you?", False),
        ("Catherine Vance", "Benjamin Moore", "I’m good and you?", True),
        ("Catherine Vance", "Benjamin Moore", "I’m working on my app design.", True),
        ("Benjamin Moore", "Catherine Vance", "That sounds great! ", False),
        ("Benjamin Moore", "Catherine Vance", "I’m doing good. What are you doing ?", False),
        ("Benjamin Moore", "Catherine Vance", "Let’s get lunch! How about sushi ?", False),
    ]

    for sender, recipient, text, is_me in messages:
        ChatMessage.objects.create(
            sender_name=sender,
            sender_avatar='/assets/images/avatar-benjamin.png' if not is_me else '/assets/images/avatar-catherine.png',
            recipient_name=recipient,
            text=text,
            is_me=is_me
        )

    print("Successfully seeded all Figma prototype data!")
