import datetime as dt

from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

import faker

from ticket.models import Ticket


class TestGetTicketById(TestCase):

    def _create_api_client_for_user(self, user: User) -> APIClient:
        client = APIClient()
        refresh_token = RefreshToken.for_user(user)
        access_token = str(refresh_token.access_token)
        client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        return client

    def _create_user(self) -> User:
        return User.objects.create_user(
            username=self.fake.user_name(),
            password=self.fake.password()
        )

    def setUp(self) -> None:
        self.fake = faker.Faker()
        self.user = self._create_user()
        self.ticket = Ticket.objects.create(
            title=self.fake.sentence(nb_words=3),
            description=self.fake.text(),
            owner=self.user
        )
        self.base_url = f'/api/tickets'
        self.url = f'{self.base_url}/{self.ticket.id}/'

        self.client = self._create_api_client_for_user(self.user)

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

    def test_get_ticket_by_id_for_a_non_owner(self) -> None:
        user2 = self._create_user()
        client2 = self._create_api_client_for_user(user2)
        response = client2.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
