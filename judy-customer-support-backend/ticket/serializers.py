from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.Serializer):
    class Meta:
        model = Ticket
        fields = ['title', 'description', 'is_resolved', 'owner', 'created_at', 'resolved_at']
        read_only_fields = ['owner', 'created_at', 'resolved_at']
