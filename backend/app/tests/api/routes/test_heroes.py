from fastapi.testclient import TestClient

from app.core.config import settings


def test_read_heroes(client: TestClient) -> None:
    response = client.get(f"{settings.API_V1_STR}/heroes")

    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2


def test_read_hero(client: TestClient) -> None:
    hero = {
        "id": 1,
        "name": "npc_dota_hero_antimage",
        "localized_name": "Anti-Mage",
        "primary_attr": "agi",
        "attack_type": "Melee"
    }

    response = client.get(f"{settings.API_V1_STR}/heroes/{hero['id']}")

    assert response.status_code == 200
    content = response.json()
    assert content["id"] == hero["id"]
    assert content["name"] == hero["name"]
    assert content["localized_name"] == hero["localized_name"]
    assert content["primary_attr"] == hero["primary_attr"]
    assert content["attack_type"] == hero["attack_type"]


def test_read_hero_not_found(client: TestClient) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/heroes/999"
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Hero not found"


def test_read_heroes_stats(client: TestClient) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/heroes/stats/"
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2
