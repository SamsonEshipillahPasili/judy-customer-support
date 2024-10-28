from collections import namedtuple
from typing import Mapping, Any

from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient


from . import utils as test_utils
from ..models import Ticket

TicketTuple = namedtuple(
    'TicketTuple',
    [
        'id',
        'title',
        'description',
        'is_resolved',
        'owner',
        'created_at',
        'resolved_at',
    ]
)


def _convert_ticket_object_to_tuple(ticket: Ticket) -> TicketTuple:
    return TicketTuple(
        id=ticket.id,
        title=ticket.title,
        description=ticket.description,
        is_resolved=ticket.is_resolved,
        owner=ticket.owner.id,
        created_at=test_utils.format_datetime(ticket.created_at),
        resolved_at=test_utils.format_datetime(ticket.resolved_at),
    )

def _convert_ticket_payload_to_tuple(ticket: Mapping[str, Any]) -> TicketTuple:
    return TicketTuple(
        id=ticket['id'],
        title=ticket['title'],
        description=ticket['description'],
        is_resolved=ticket['is_resolved'],
        owner=ticket['owner'],
        created_at=ticket['created_at'],
        resolved_at=ticket['resolved_at'],
    )


class TestListTickets(TestCase):
    NUM_TICKETS = 20

    def setUp(self) -> None:
        self.user = test_utils.create_user()
        self.tickets = [
            test_utils.create_test_ticket(self.user)
            for _ in range(self.NUM_TICKETS)
        ]
        self.url = f'/api/tickets/'
        self.client = test_utils.create_api_client(self.user)

    def test_list_ticket_no_authentication(self):
        client = APIClient()
        response = client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_list_tickets(self) -> None:
        response = self.client.get(self.url)

        # HTTP status check
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # HTTP Payload check
        self.assertEqual(len(response.data), self.NUM_TICKETS)

        response_tickets = [
            _convert_ticket_payload_to_tuple(ticket)
            for ticket in response.data
        ]
        response_tickets = sorted(response_tickets, key=lambda x: x.id)

        db_tickets = [
            _convert_ticket_object_to_tuple(ticket)
            for ticket in self.tickets
        ]
        db_tickets = sorted(db_tickets, key=lambda x: x.id)

        self.assertEqual(response_tickets, db_tickets)


    def test_list_tickets_for_a_non_owner(self) -> None:
        user2 = test_utils.create_user()
        client2 = test_utils.create_api_client(user2)
        response = client2.get(self.url)

        # HTTP Status Check
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # HTTP Response Payload Check
        self.assertEqual(len(response.data), 0)
