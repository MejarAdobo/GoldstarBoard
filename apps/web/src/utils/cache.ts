import { Temporal } from "@js-temporal/polyfill";

// Genmini generated all of this
const getTargetMinute = (minute: number): number => {
  if (minute < 50) {
    return 50;
  }

  if (minute < 55) {
    return 55;
  }

  return 60;
};

export const getSecondsUntilNextUpdate = (): number => {
  const now = Temporal.Now.zonedDateTimeISO();
  const { minute } = now;

  const targetMinute = getTargetMinute(minute);

  const target =
    targetMinute === 60
      ? now.add({ hours: 1 }).with({
          minute: 0,
          second: 0,
          millisecond: 0,
          microsecond: 0,
          nanosecond: 0,
        })
      : now.with({
          minute: targetMinute,
          second: 0,
          millisecond: 0,
          microsecond: 0,
          nanosecond: 0,
        });

  const { seconds: totalSeconds } = now.until(target, {
    largestUnit: "second",
  });

  return Math.max(totalSeconds, 5);
};
