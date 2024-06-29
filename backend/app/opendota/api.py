from app.base import BaseClient


class OpenDotaAPI(BaseClient):
    def __init__(self) -> None:
        base_url = "https://api.opendota.com"
        super().__init__(base_url)

    async def get_heroes(self) -> dict:
        response = await self._make_request(
            "GET",
            "/api/heroes",
        )

        return response[1]

    async def get_hero_stats(self) -> dict:
        response = await self._make_request("GET", "/api/heroStats")

        return response[1]
