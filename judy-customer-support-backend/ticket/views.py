from django.db.models import QuerySet
from rest_framework import viewsets
from .models import Ticket
from .serializers import TicketSerializer

class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer

    def get_queryset(self) -> QuerySet:
        user = self.request.user
        return Ticket.objects.filter(owner=user)


    def perform_create(self, serializer: TicketSerializer) -> None:
        serializer.save(owner=self.request.user)
