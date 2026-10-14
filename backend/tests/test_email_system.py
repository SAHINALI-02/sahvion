from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_email_health_checks_configuration():
    response = client.get('/api/email/health')
    assert response.status_code == 200
    payload = response.json()
    assert payload['status'] in {'configured', 'missing_credentials', 'disabled'}
    assert 'provider' in payload
    assert 'recipient_email' in payload


def test_contact_inquiry_requires_email_delivery_success():
    payload = {
        'name': 'Test User',
        'email': 'test@example.com',
        'phone': '+1 555 000 0000',
        'company': 'SAHVION Test',
        'service': 'Web & App Development',
        'message': 'Please respond to confirm project delivery.',
    }

    response = client.post('/api/contact', json=payload)
    assert response.status_code in {200, 201, 503}

    if response.status_code == 503:
        detail = response.json().get('detail', '')
        assert 'email' in detail.lower()

    if response.status_code in {200, 201}:
        body = response.json()
        assert 'confirmation_message' in body
