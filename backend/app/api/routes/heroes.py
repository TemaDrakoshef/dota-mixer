from fastapi import APIRouter, HTTPException

from app.models import HeroesOut, HeroesStatsOut, HeroOut, HeroStatsOut
from app.opendota.api import OpenDotaAPI

router = APIRouter()
open_dota = OpenDotaAPI()


def edit_image_url(hero: HeroOut | HeroStatsOut) -> HeroOut | HeroStatsOut:
    """
    Edit image and icon url.
    """

    steam_static_url = (
        "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react"
    )

    name = hero.name[14:]
    hero.img = steam_static_url + f"/heroes/{name}.png?"
    hero.icon = steam_static_url + f"/heroes/icons/{name}.png?"

    return hero


@router.get("/", response_model=HeroesOut)
async def read_heroes() -> HeroesOut:
    """
    Retrieve heroes.
    """

    response = await open_dota.get_heroes()
    if not response:
        raise HTTPException(status_code=404, detail="Heroes not found")

    heroes = []
    for hero_raw in response:
        hero = HeroOut(**hero_raw)
        hero = edit_image_url(hero)

        heroes.append(hero)

    return HeroesOut(data=heroes, count=len(heroes))


@router.get("/{hero_id}", response_model=HeroStatsOut)
async def read_hero(hero_id: int) -> HeroStatsOut:
    """
    Get hero by ID.
    """

    response = await open_dota.get_hero_stats()

    for hero in [HeroStatsOut(**hero_raw) for hero_raw in response]:
        if hero.id == hero_id:
            hero = edit_image_url(hero)
            return hero

    raise HTTPException(status_code=404, detail="Hero not found")


@router.get("/stats/", response_model=HeroesStatsOut)
async def read_heroes_stats() -> HeroesStatsOut:
    """
    Get heroes stats.
    """

    response = await open_dota.get_hero_stats()
    if not response:
        raise HTTPException(status_code=404, detail="Heroes not found")

    heroes_stats = []
    for hero_raw in response:
        hero = HeroStatsOut(**hero_raw)
        hero = edit_image_url(hero)

        heroes_stats.append(hero)

    return HeroesStatsOut(data=heroes_stats, count=len(heroes_stats))
