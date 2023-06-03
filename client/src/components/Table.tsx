import { TableContainer, Table as ChakraTable, Thead, Td, Th, Tr, Tbody, Text, TableContainerProps, IconButton, Checkbox, HStack, Box, Select } from "@chakra-ui/react"
import { useCallback, useState } from "react";
import { numberFormat } from "../utils/numberFormat";
import { Pagination } from "../context/types";
import PaginateButton from "./PaginateButton";
import { useTypedDispatch } from "../context/store";
import { Prefix, paginationChangeLimit } from "../context/helpers";


export type Columns<T> = {
  hiddenColumn?: boolean,
  title: string,
  dataIndex: keyof T,
  align?: "right" | "left",
  sorter?: boolean,
  isNumber?: boolean,
  render?: (row: T) => React.ReactElement
}

interface Props<T> extends TableContainerProps {
  onDeleteAction?: (ids: string[]) => void,
  header: string,
  footer?: string,
  columns: Columns<T>[],
  rows: T[],
  pagination: Pagination,
  prefixTableType: Prefix
}

function Table<T extends {id: string}>(props: Props<T>) {
  const { header, columns, onDeleteAction, rows, footer, pagination, prefixTableType, ...reset } = props;

  const [sortBy, setSortBy] = useState<keyof T | undefined>(undefined);
  const [desc, setDesc] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useTypedDispatch();

  const showColumns = (col: Columns<T>) => !col.hiddenColumn;

  const isChecked = (id: string) => selectedRowsId.includes(id);

  const allChecked = (rows.length === selectedRowsId.length) && selectedRowsId.length !== 0;

  const isInputElement = selectedRowsId.length >= 1 && !allChecked;

  const getPaginatedRows = useCallback(() => {
    const idx = pagination.limit * currentPage;
    return rows.slice(idx, idx + pagination.limit);
  }, [currentPage, pagination])

  const paginated = getPaginatedRows()

  const onSort = (dataIndex: keyof T) => () => {
    setSortBy(dataIndex);
    setDesc(d => !d);
  };

  if (sortBy) paginated.sort((a, b) => {
    if (typeof a[sortBy] === "string" && desc) return (a[sortBy] as string).length - (b[sortBy] as string).length
    if (typeof a[sortBy] === "number" && desc) return (a[sortBy] as number) - (b[sortBy] as number)

    if (typeof a[sortBy] === "string" && !desc) return (b[sortBy] as string).length - (a[sortBy] as string).length
    if (typeof a[sortBy] === "number" && !desc) return (b[sortBy] as number) - (a[sortBy] as number)
    return 1
  });


  const onSelectByEach = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRowsId((ids) => ([...ids, id]));
      return;
    }
    setSelectedRowsId((ids) => (ids.filter(current => current !== id)));
    return;
  };

  const onselectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRowsId(rows.map(row => row.id));
      return;
    }
    setSelectedRowsId([]);
    return;
  }

  const onDelete = useCallback(() => {
    if (onDeleteAction !== undefined) {
      onDeleteAction(selectedRowsId);
    }
  }, [selectedRowsId]);

  const onChangePaginate = (idx: string|number) => () => {
    setCurrentPage(Number(idx))
  }

  const onChangePaginateLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = Number(event.target.value) || 10;
    dispatch(paginationChangeLimit(limit, prefixTableType));
  }

  return (
    <Box borderWidth={1} borderColor="gray.100" borderRadius={10}>
      <HStack justifyContent="space-between" px={5} py={3}>
        <Text fontSize="2xl">{header}</Text>
        { selectedRowsId.length && <IconButton aria-label="delete button" onClick={onDelete}></IconButton>}
      </HStack>
      <TableContainer maxH="lg" overflowY="scroll" {...reset}>
        <ChakraTable>
          <Thead>
            <Tr>
              { onDeleteAction &&
                <Td w={1}>
                  <Checkbox isChecked={allChecked} isIndeterminate={isInputElement} onChange={onselectAll} />
                </Td>
              }
              {columns.filter(showColumns).map((column, index) => (
                <Th key={index} textAlign={column.align}>
                  {column.title}
                  {column.sorter && <IconButton aria-label="sort" onClick={onSort(column.dataIndex)}></IconButton>}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {paginated.map((row, key) => (
              <Tr key={key} bg={isChecked(row.id) ? "blue.50" : ""}>
                { onDeleteAction &&
                  <Td>
                    <Checkbox isChecked={isChecked(row.id)} onChange={onSelectByEach(row.id)} />
                  </Td>
                }
                {columns.filter(showColumns).map((column, index) => {
                  if (!column.render) return (
                    <Td key={index} textAlign={column.align}>
                      {/* @ts-ignore */}
                      {(column.isNumber) && (typeof row[column.dataIndex] === "number") ? numberFormat(row[column.dataIndex]) : row[column.dataIndex]}
                    </Td>
                  )
                  return (
                    <Td key={index} textAlign={column.align}>
                      {column.render(row)}
                    </Td>
                  )
                })}
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
      </TableContainer>
      <HStack alignItems="center" justifyContent="space-between" px={5} py={3}>
        { footer && <Text fontSize="xl" px={5} py={3}>{footer}</Text>}
        <HStack>
          <Select defaultValue={pagination.limit} onChange={onChangePaginateLimit}>
            <Box as="option" value={5}>5</Box>
            <Box as="option" value={10}>10</Box>
            <Box as="option" value={15}>15</Box>
            <Box as="option" value={20}>20</Box>
          </Select>
          <PaginateButton
            pagination={pagination}
            count={rows.length}
            onChangePaginate={onChangePaginate}
            currentPage={currentPage}
          />
        </HStack>
      </HStack>
    </Box>
  )
}

export default Table
