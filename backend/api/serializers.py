from datetime import timedelta

from django.utils import timezone

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import VerifyCode, UserProfile
from chat.models import Message, Room


class ImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)

    # for CloudinaryField
    # image = serializers.SerializerMethodField()
    #
    # def get_image(self, profile):
    #     try:
    #         request = self.context.get('request')
    #         image_url = profile.profile_image.url
    #         return image_url
    #     except:
    #         return 'none'


class UserLessInfoSerializer(ImageSerializer, serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('id', 'username', 'image')


class UserSerializer(ImageSerializer, serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('id', 'username', 'bio', 'gender', 'image')


class MessageSerializer(serializers.ModelSerializer):
    user = UserLessInfoSerializer()
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'text', 'createdAt', 'user')


class RoomListSerializer(serializers.ModelSerializer):
    total_messages = serializers.IntegerField(source='message.count', read_only=True)
    last_message = serializers.SerializerMethodField()
    first_user = serializers.CharField(source='first_user.username')
    second_user = serializers.CharField(source='second_user.username')

    # first_user = serializers.SerializerMethodField(source='first_user.username')
    # second_user = serializers.SerializerMethodField(source='second_user.username')

    class Meta:
        model = Room
        fields = ('room', 'first_user', 'second_user', 'total_messages', 'last_message')

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     if representation['first_user'] == instance
    #     print(representation['first_user'])
    #     print(instance)
    #     return representation

    # def get_first_user(self, user):
    #     if user == self.user
    #
    # def get_second_user(self, user):
    #     pass

    def get_last_message(self, obj):
        try:
            message = obj.message.latest('created_at')
            serializer = MessageSerializer(message)
            return serializer.data
        except:
            return 'none'


class ContactSerializer(serializers.ModelSerializer):
    contacts = UserLessInfoSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ('contacts',)


class BlockedContactSerializer(serializers.ModelSerializer):
    blocked_contacts = UserLessInfoSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ('blocked_contacts',)


class VerifyCodeSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, email):
        """
        Verify that the mailbox is legal
        """
        one_minute_age = timezone.now() - timedelta(hours=0, minutes=1, seconds=0)
        if VerifyCode.objects.filter(created_at__gt=one_minute_age,
                                     email=email).count():
            raise serializers.ValidationError('Please send again in a minute')
        return email


class UserRegisterSerializer(serializers.ModelSerializer):
    """Serializer for creating user objects."""
    error_messages = {
        'blank': ' Please enter the verification code ',
        'required': ' Please enter the verification code ',
        'min_length': ' The format of the verification code is wrong ',
        'max_length': ' The format of the verification code is wrong ',
    }
    code = serializers.CharField(required=True, allow_blank=False,
                                 min_length=4, max_length=4,
                                 help_text=' Verification Code ',
                                 error_messages=error_messages,
                                 write_only=True)

    # Yes code Fields are validated separately (validate_+ Field name )
    def validate_code(self, code):
        verify_records = VerifyCode.objects.filter(email=self.initial_data['email']).order_by('-created_at')
        if verify_records:
            last_record = verify_records[0]
            # Determine whether the verification code is expired
            five_minutes_ago = timezone.now() - timedelta(hours=0, minutes=5, seconds=0)  # obtain 5 Minutes ago
            if last_record.created_at < five_minutes_ago:
                raise serializers.ValidationError('The verification code is out of date')
                # Determine whether the verification code is correct
            if last_record.code != code:
                raise serializers.ValidationError('Verification code error')
                # You don't have to code Return to the database , Just verification
                # return code
        else:
            raise serializers.ValidationError('Verification code does not exist')
            # attrs： Each field validate After that, the general dict

    def validate(self, attrs):
        # from attrs Delete in code Field
        del attrs['code']
        return attrs

    tokens = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ('email', 'code', 'tokens')

    def get_tokens(self, user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

# todo попробовать сделать get_or_create
    def create(self, validated_data):
        user = UserProfile(
            email=validated_data['email']
        )
        user.save()
        return user
