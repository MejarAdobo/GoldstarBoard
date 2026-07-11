import { writable } from "svelte/store";

import type { rankTypeEnum } from "@goldstarboard/shared-types/enums";

export const rankTypeStore = writable<rankTypeEnum>("streak");
