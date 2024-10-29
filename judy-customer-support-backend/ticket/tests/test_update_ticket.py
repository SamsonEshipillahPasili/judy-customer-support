from django.test import TestCase
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APIClient

import faker

from ticket.models import Ticket

from . import utils as test_utils

class TestUpdateTicket(TestCase):
    def setUp(self) -> None:
        self.base_url = '/api/tickets'
        self.fake = faker.Faker()
        self.user = test_utils.create_user()
        self.client = test_utils.create_api_client(self.user)
        self.ticket = test_utils.create_test_ticket(self.user)
        self.url = f'{self.base_url}/{self.ticket.id}/'

    def test_update_ticket_no_authentication(self):
        client = APIClient()
        payload = {
            "title": self.fake.sentence(nb_words=3),
        }
        response = client.patch(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_update_ticket_with_valid_payload(self) -> None:
        payload = {
            "title": self.fake.sentence(nb_words=3),
            "description": self.fake.text()
        }
        response = self.client.patch(self.url, payload, format='json')

        # HTTP status check
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # HTTP Payload check
        self.assertEqual(response.data['title'], payload['title'])
        self.assertEqual(response.data['description'], payload['description'])
        self.assertFalse(response.data['is_resolved'])
        self.assertEqual(response.data['owner'], self.user.id)
        self.assertEqual(response.data['id'], self.ticket.id)
        self.assertTrue(
            response.data['created_at'],
            test_utils.format_datetime(self.ticket.created_at)
        )
        self.assertTrue(response.data['resolved_at'] is None)

        # DB entry check
        ticket = Ticket.objects.get(pk=response.data['id'])
        self.assertEqual(ticket.title, payload['title'])
        self.assertEqual(ticket.description, payload['description'])

    def test_mark_ticket_as_resolved(self) -> None:
        payload = {
            "is_resolved": True
        }
        response = self.client.patch(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['is_resolved'])

        ticket = Ticket.objects.get(pk=response.data['id'])
        self.assertTrue(ticket.is_resolved)
        self.assertIsNotNone(ticket.resolved_at)

        self.assertEqual(
            test_utils.format_datetime(ticket.resolved_at),
            response.data['resolved_at']
        )

    def test_update_resolved_ticket(self) -> None:
        # mark the ticket as resolved in the DB first.
        self.ticket.is_resolved = True
        self.ticket.resolved_at = timezone.now()
        self.ticket.save()

        payload = {
            "is_resolved": False,
        }
        response = self.client.patch(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_ticket_for_non_owner(self) -> None:
        user2 = test_utils.create_user()
        client2 = test_utils.create_api_client(user2)

        payload = {
            "is_resolved": True
        }
        response = client2.patch(self.url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
