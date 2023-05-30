import { TableContainer, Table as ChakraTable, Thead, Td, Th, Tr, Tbody, Text, TableContainerProps, IconButton, Checkbox, HStack } from "@chakra-ui/react"
import { useCallback, useState } from "react";
import { numberFormat } from "../utils/numberFormat";


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
  rows: T[]
}

function Table<T extends {id: string}>(props: Props<T>) {
  const { header, columns, onDeleteAction, rows, footer, ...reset } = props;

  const [sortBy, setSortBy] = useState<keyof T | undefined>(undefined);
  const [desc, setDesc] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([]);

  const showColumns = (col: Columns<T>) => !col.hiddenColumn;

  const isChecked = (id: string) => selectedRowsId.includes(id);

  const allChecked = (rows.length === selectedRowsId.length) && selectedRowsId.length !== 0;

  const isInputElement = selectedRowsId.length >= 1 && !allChecked;

  const onSort = (dataIndex: keyof T) => () => {
    setSortBy(dataIndex);
    setDesc(d => !d);
  };

  if (sortBy) rows.sort((a, b) => {
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

  return (
    <TableContainer borderWidth={1} borderColor="gray.100" borderRadius={10} maxH="lg" overflowY="scroll" {...reset}>
      <HStack justifyContent="space-between" px={5} py={3}>
        <Text fontSize="2xl">{header}</Text>
        { selectedRowsId.length && <IconButton aria-label="delete button" onClick={onDelete}></IconButton>}
      </HStack>
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
          {rows.map((row, key) => (
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
      { footer && <Text fontSize="2xl" px={5} py={3}>{footer}</Text>}
    </TableContainer>
  )
}

export default Table
