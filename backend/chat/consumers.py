import json

from asgiref.sync import sync_to_async

from channels.generic.websocket import AsyncWebsocketConsumer

from django.core.serializers.json import DjangoJSONEncoder

from accounts.models import UserProfile
from .models import Message, Room


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        print(self.scope)
        self.room_group_name = f'chat_{self.room_name}'

        # Join room
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from web socket
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        username = data['username']
        room = data['room']
        message_id = await self.save_message(username, room, message)
        message_date_added = await self.get_message_info(message_id)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'room': room,
                'message': {
                    'id': message_id,
                    'createdAt': DjangoJSONEncoder().default(message_date_added),
                    'text': message,
                    'user': {
                        'username': username,
                    },
                }
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        print(type(event))
        print(event)
        room = event['room']
        message = event['message']
        # username = event['user']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'room': room,
            'message': message,
            # 'username': username
        }))

    @sync_to_async
    def save_message(self, username, room, text):
        user = UserProfile.objects.get(username=username)

        messages = Message.objects.create(user=user, text=text)
        # print(messages)
        current_room, created = Room.objects.get_or_create(room=room)
        # print(current_room.message)

        current_room.message.add(messages.id)
        current_room.save()
        return messages.id

    @sync_to_async
    def get_message_info(self, message_id):
        message_obj = Message.objects.get(id=message_id)
        message_date = message_obj.created_at

        return message_date
