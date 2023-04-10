import { Item } from "./item.type";

export default function getItemTime(item: Item) {
  return `${item.selectedTime.selectedHour}:${item.selectedTime.selectedMinute}`;
}
