import { ClassValue, clsx } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function formatDate(
  date: string | Date | undefined,
  format = "dd MMM, yyyy",
) {
  if (!date) return "-";
  const newDate = DateTime.fromISO(new Date(date).toISOString());
  return newDate.toFormat(format);
}

export function getNestedTouched(errors: Record<string, unknown>) {
  return Object.keys(errors).reduce(
    (acc, key) => {
      const value = errors[key];
      acc[key] =
        typeof value === "object"
          ? getNestedTouched(value as Record<string, unknown>)
          : true;
      return acc;
    },
    {} as { [key: string]: boolean | object },
  );
}

export function formatNumber(
  value: number,
  { minFracDigits = 0, maxFracDigits = 2 } = {
    minFracDigits: 0,
    maxFracDigits: 2,
  },
) {
  if (value == null || isNaN(value)) {
    return "0";
  }

  const formattedValue = value.toLocaleString(undefined, {
    minimumFractionDigits: minFracDigits,
    maximumFractionDigits: maxFracDigits,
  });

  return formattedValue;
}

export function isNaNValue(value: unknown): boolean {
  const num = Number(value);
  return isNaN(num);
}
