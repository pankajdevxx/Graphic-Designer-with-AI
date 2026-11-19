from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status


class UserAuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = '/api/v1/auth/register/'
        self.login_url = '/api/v1/auth/login/'
        self.profile_url = '/api/v1/auth/profile/'

    def test_user_registration_and_login(self):
        # 1. Register
        reg_payload = {
            'username': 'creative_test_user',
            'email': 'creator_test@pixelgen.com',
            'password': 'Password123!',
            'full_name': 'Creative Tester',
            'company': 'Pixel Studio',
        }
        reg_response = self.client.post(self.register_url, reg_payload, format='json')
        self.assertEqual(reg_response.status_code, status.HTTP_201_CREATED)
        self.assertIn('tokens', reg_response.data)
        self.assertIn('access', reg_response.data['tokens'])

        # 2. Login
        login_payload = {
            'username_or_email': 'creative_test_user',
            'password': 'Password123!',
        }
        login_response = self.client.post(self.login_url, login_payload, format='json')
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        access_token = login_response.data['tokens']['access']

        # 3. Authenticated Profile Access
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        profile_response = self.client.get(self.profile_url)
        self.assertEqual(profile_response.status_code, status.HTTP_200_OK)
        self.assertEqual(profile_response.data['username'], 'creative_test_user')
        self.assertEqual(profile_response.data['email'], 'creator_test@pixelgen.com')
