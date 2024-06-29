from enum import Enum

from sqlmodel import Field, Relationship, SQLModel


# Shared properties
# TODO replace email str with EmailStr when sqlmodel supports it
class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = None


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str


# TODO replace email str with EmailStr when sqlmodel supports it
class UserCreateOpen(SQLModel):
    email: str
    password: str
    full_name: str | None = None


# Properties to receive via API on update, all are optional
# TODO replace email str with EmailStr when sqlmodel supports it
class UserUpdate(UserBase):
    email: str | None = None  # type: ignore
    password: str | None = None


# TODO replace email str with EmailStr when sqlmodel supports it
class UserUpdateMe(SQLModel):
    full_name: str | None = None
    email: str | None = None


class UpdatePassword(SQLModel):
    current_password: str
    new_password: str


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(back_populates="owner")


# Properties to return via API, id is always required
class UserOut(UserBase):
    id: int


class UsersOut(SQLModel):
    data: list[UserOut]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str
    description: str | None = None


# Properties to receive on item creation
class ItemCreate(ItemBase):
    title: str


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = None  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    owner: User | None = Relationship(back_populates="items")


# Properties to return via API, id is always required
class ItemOut(ItemBase):
    id: int
    owner_id: int


class ItemsOut(SQLModel):
    data: list[ItemOut]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: int | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str


class AttackType(Enum):
    melee: str = "Melee"
    ranged: str = "Ranged"


class PrimaryAttr(Enum):
    agi: str = "agi"
    all_: str = "all"
    str_: str = "str"
    int_: str = "int"


class Role(Enum):
    carry = "Carry"
    initiator = "Initiator"
    durable = "Durable"
    disabler = "Disabler"
    support = "Support"
    nuker = "Nuker"
    pusher = "Pusher"
    escape = "Escape"


class HeroBase(SQLModel):
    id: int
    name: str
    localized_name: str
    primary_attr: str
    attack_type: AttackType
    roles: list[Role]
    legs: int


class HeroOut(HeroBase):
    img: str | None = None
    icon: str | None = None


class HeroesOut(SQLModel):
    data: list[HeroOut]
    count: int


class HeroStatsOut(HeroBase):
    img: str
    icon: str
    base_health: float
    base_health_regen: float
    base_mana: float
    base_mana_regen: float
    base_armor: float
    base_mr: float
    base_attack_min: float
    base_attack_max: float
    base_str: float
    base_agi: float
    base_int: float
    str_gain: float
    agi_gain: float
    int_gain: float
    attack_range: float
    projectile_speed: float
    attack_rate: float
    base_attack_time: float
    attack_point: float
    move_speed: float
    turn_rate: float | None = None
    cm_enabled: float
    day_vision: float
    night_vision: float
    localized_name: str
    turbo_picks: int | float | None = None
    turbo_picks_trend: list[int] | None = None
    turbo_wins: int | None = None
    turbo_wins_trend: list[int] | None = None
    pro_pick: int | None = None
    pro_win: int | None = None
    pro_ban: int | None = None
    pub_pick: int | None = None
    pub_pick_trend: list[int] | None = None
    pub_win: int | None = None
    pub_win_trend: list[int] | None = None


class HeroesStatsOut(SQLModel):
    data: list[HeroStatsOut]
    count: int
