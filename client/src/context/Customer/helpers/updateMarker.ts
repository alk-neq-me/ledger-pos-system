import { deepClone } from "../../../utils/deepClone";
import { customerMarkerActions } from "../../CustomerMarker/customerMarkerActions";
import { NumbersOrder } from "../../RecentOrder/types";
import { customerActions } from "../customerActions";
import { Customer } from "../types";

type AnyFunc = (...args: any[]) => any;

export function updateRecentToCustomer<T extends AnyFunc>(dispatch: T) {
  return (customerMarker: Customer, payload: NumbersOrder) => {
    const newMarker = deepClone(customerMarker);
    newMarker.books.find(book => book.id === customerMarker.currentBook)?.recents.push(payload);
    dispatch(customerActions.updateCustomer(newMarker));
    dispatch(customerMarkerActions.selectCustomerMarker(newMarker, newMarker.currentBook));
  }
}
