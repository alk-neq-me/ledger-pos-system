import { Pagination } from "../context/types";
import { Button } from "@chakra-ui/react";

interface PaginateButtonProps {
  pagination: Pagination,
  count: number,
  currentPage: number,
  onChangePaginate: (page: number|string) => () => void
}

export default function PaginateButton(props: PaginateButtonProps) {
  const { pagination, count, currentPage, onChangePaginate } = props;

  let btns: string[] = [];
  const totalPage = (Math.round(count / pagination.limit)-1)

  for (let page=currentPage; page<totalPage; page++) {
    btns.push(`${page+1}`)
  }
  const last = Number(btns[btns.length-1]);

  return (
    <>
      {1 <= currentPage && <Button onClick={onChangePaginate(0)}>First</Button>}
      {currentPage >= 0
        ? btns.slice(0, 3).map(btn => (
          <Button key={btn} onClick={onChangePaginate(btn)}>{btn}</Button>
        ))
        : null
      }
      {last ? <Button onClick={onChangePaginate(last)}>last</Button> : null}
    </>
  )
}

