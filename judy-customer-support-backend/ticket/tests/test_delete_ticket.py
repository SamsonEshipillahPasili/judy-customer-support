import datetime as dt

from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient


from . import utils as test_utils

class TestDeleteTicketById(TestCase):
    def setUp(self) -> None:
        self.user = test_utils.create_user()
        self.ticket = test_utils.create_test_ticket(self.user)
        self.base_url = f'/api/tickets'
        self.url = f'{self.base_url}/{self.ticket.id}/'
        self.client = test_utils.create_api_client(self.user)

    def test_delete_ticket_no_authentication(self):
        client = APIClient()
        response = client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_non_existent_ticket_by_id(self) -> None:
        response = self.client.delete(f'{self.base_url}/{1_000_000}/')

        # HTTP status check
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_ticket_by_id(self) -> None:
        response = self.client.delete(self.url)

        # HTTP status check
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_ticket_by_id_for_a_non_owner(self) -> None:
        user2 = test_utils.create_user()
        client2 = test_utils.create_api_client(user2)
        response = client2.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
