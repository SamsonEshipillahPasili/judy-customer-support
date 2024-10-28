import datetime as dt

from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient


from . import utils as test_utils

class TestGetTicketById(TestCase):
    def setUp(self) -> None:
        self.user = test_utils.create_user()
        self.ticket = test_utils.create_test_ticket(self.user)
        self.base_url = f'/api/tickets'
        self.url = f'{self.base_url}/{self.ticket.id}/'
        self.client = test_utils.create_api_client(self.user)

    def test_get_ticket_no_authentication(self):
        client = APIClient()
        response = client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_get_ticket_by_id(self) -> None:
        response = self.client.get(self.url)

        # HTTP status check
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # HTTP Payload check
        self.assertEqual(response.data['title'], self.ticket.title)
        self.assertEqual(response.data['description'], self.ticket.description)
        self.assertFalse(response.data['is_resolved'], self.ticket.is_resolved)
        self.assertEqual(response.data['owner'], self.ticket.owner.id)
        self.assertEqual(response.data['id'], self.ticket.id)

        created_at = dt.datetime.strftime(self.ticket.created_at, "%Y-%m-%dT%H:%M:%S.%fZ")
        self.assertEqual(response.data['created_at'], created_at)

        self.assertTrue(response.data['resolved_at'] is None)

    def test_get_non_existent_ticket_by_id(self) -> None:
        response = self.client.get(f'{self.base_url}/{1_000_000}/')

        # HTTP status check
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_ticket_by_id_for_a_non_owner(self) -> None:
        user2 = test_utils.create_user()
        client2 = test_utils.create_api_client(user2)
        response = client2.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
