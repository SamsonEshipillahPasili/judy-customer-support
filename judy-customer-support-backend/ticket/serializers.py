from rest_framework import serializers
from rest_framework.validators import ValidationError

from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id','title', 'description', 'is_resolved', 'owner', 'created_at', 'resolved_at']
        read_only_fields = ['id', 'owner', 'created_at', 'resolved_at']

    def validate(self, attrs):
        if not self.instance:
            return attrs

        if self.instance.is_resolved:
            raise ValidationError('You cannot update a resolved ticket')
