// For gold star status
type starStatusEnum = "gain" | "loss" | "maintain" | "none";

// For type of awards
type awardTypeEnum = "hot_streak" | "cold_streak" | "most_stars" | "least_stars";

// For user role
type UserRoleEnum = "user" | "admin";

// For rank toggle
type rankTypeEnum = "streak" | "stars";

export type { awardTypeEnum, rankTypeEnum, starStatusEnum, UserRoleEnum };
