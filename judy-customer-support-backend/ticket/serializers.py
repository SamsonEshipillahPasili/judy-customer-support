from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id','title', 'description', 'is_resolved', 'owner', 'created_at', 'resolved_at']
        read_only_fields = ['id', 'owner', 'created_at', 'resolved_at']
