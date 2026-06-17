import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.21/+esm";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDate: 7,
    deliveryPriceCents: 0,
  },
  {
    id: "2",
    deliveryDate: 3,
    deliveryPriceCents: 499,
  },
  {
    id: "3",
    deliveryDate: 1,
    deliveryPriceCents: 999,
  },
];

export const isWeekend = (date) =>
  date.format("dddd") === "Saturday" || date.format("dddd") === "Friday"
    ? true
    : false;

export function calculateDeliveryDate(option) {
  const today = dayjs();
  const deliveryDate = today.add(option.deliveryDate, "day");
  if (!isWeekend(deliveryDate)) {
    return deliveryDate.format("dddd, MMMM DD");
  } else {
  }
  switch (isWeekend(deliveryDate)) {
    case false:
      return deliveryDate.format("dddd, MMMM DD");
      break;
    case true:
      if (deliveryDate.format("dddd") === "Friday") {
        return deliveryDate.add(2, "day").format("dddd, MMMM DD");
      } else {
        return deliveryDate.add(1, "day").format("dddd, MMMM DD");
      }
      break;
  }
}
