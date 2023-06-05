import { Pagination } from "../context/types";
import Button from "./Button";

interface PaginateButtonProps {
  pagination: Pagination,
  count: number,
  currentPage: number,
  onChangePaginate: (page: number|string) => () => void
}

export default function PaginateButton(props: PaginateButtonProps) {
  const { pagination, count, currentPage, onChangePaginate } = props;

  let btns: number[] = [];
  const totalPage = (Math.round(count / pagination.limit)-1)

  for (let page=currentPage; page<=totalPage; page++) {
    btns.push(page+1)
  }
  const last = Number(btns[btns.length-1]);

  return (
    <>
      {1 <= currentPage && <Button onClick={onChangePaginate(0)} text="First" />}
      {currentPage > 0 
        ? <Button variant='ghost' text={(currentPage).toString()} onClick={onChangePaginate(currentPage-1)} />
        : null
      }
      {currentPage >= 0
        ? btns.slice(0, 3).map(btn => (
          <Button key={btn} bg={btn === (currentPage+1) ? "blue.100" : ""} onClick={onChangePaginate(btn-1)} text={btn.toString()} />
        ))
        : null
      }
      { Boolean(last) && <Button onClick={onChangePaginate(last)} text="Last" /> }
    </>
  )
}

