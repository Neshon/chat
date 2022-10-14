from random import choices

from django.core.mail import send_mail
from django.db.models import Q

from rest_framework import viewsets, generics, mixins, status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from core import settings

from . import serializers

from accounts.models import VerifyCode, UserProfile
from chat.models import Message, Room


# todo создание комнаты
class RoomViewSet(viewsets.ReadOnlyModelViewSet, mixins.DestroyModelMixin):
    queryset = Room.objects.all()
    serializer_class = serializers.RoomListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return super().get_queryset().filter(
            Q(first_user_id=self.request.user) |
            Q(second_user_id=self.request.user))

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        room = get_object_or_404(Room, room=instance)
        messages = room.message.all()
        self.perform_destroy(messages)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


# список, детально, обновление, удаление
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(username=self.request.user)

    def get_queryset(self):
        return super().get_queryset().filter(username=self.request.user)


# список, изменение списка
class ContactViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = serializers.ContactSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return super().get_queryset().filter(username=self.request.user)


# список, изменение списка
class BlockedViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = serializers.BlockedContactSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return super().get_queryset().filter(username=self.request.user)


# список, детальное, удаление, изменение сообщения
class MessageViewSet(viewsets.GenericViewSet, mixins.ListModelMixin,
                     mixins.RetrieveModelMixin, mixins.DestroyModelMixin,
                     mixins.UpdateModelMixin):
    queryset = Message.objects.all()
    serializer_class = serializers.MessageSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        room = get_object_or_404(Room, id=self.kwargs['id'])
        return room.message.all()

    def perform_update(self, serializer):
        print(serializer)
        serializer.save(user=self.request.user)


class SendVerifyCode(object):
    @staticmethod
    def send_email_code(code, to_email_address):
        try:
            if settings.DEBUG == 1:
                print(code)
                return code
            else:
                subject = 'xxx System check code',
                message = f'Your verification code is【{code}. ' \
                          f'If I do not operate, Please ignore.',
                success_num = send_mail(subject, message,
                                        from_email=settings.EMAIL_HOST_USER,
                                        recipient_list=[to_email_address],
                                        fail_silently=False)
                return success_num
        except:
            return 0


class VerifyCodeViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    """
    Send verification code
    """
    permission_classes = (AllowAny,)  # Allow everyone to register
    serializer_class = serializers.VerifyCodeSerializer  # Related pre send verification logic

    def generate_code(self):
        """
        Generate 4 Digit verification code , Prevent cracking
        :return:
        """
        seeds = '1234567890'
        code = choices(seeds, k=4)
        return ''.join(code)

    def create(self, request, *args, **kwargs):
        # Self defined create() The content of
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # This step is equivalent to verifying before sending
        # from validated_data In order to get mobile
        email = serializer.validated_data["email"]
        # Random generation code
        code = self.generate_code()
        # Send SMS or email verification code
        sms_status = SendVerifyCode.send_email_code(code=code,
                                                    to_email_address=email)
        if sms_status == 0:
            # Log
            return Response({"msg": " Failed to send mail "},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            code_record = VerifyCode(code=code, email=email)
            # Save verification code
            code_record.save()
        message = f"The verification code has been sent " \
                  f"to {email} Send complete"
        return Response(
            {"msg": message}, status=status.HTTP_201_CREATED
        )


class UserCreateView(generics.CreateAPIView):
    """Handles creating and listing Users."""
    queryset = UserProfile.objects.all()
    serializer_class = serializers.UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = serializers.UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)
