import { HStack, IconButton } from "@chakra-ui/react";
import Text from "./Text";
import { I18nOptions, TxPath, i18n } from "../i18n";

interface TableHeaderProps {
  header?: string;
  txHeader?: TxPath;
  txOptions?: I18nOptions;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TableHeader(props: TableHeaderProps) {
  const { header, txHeader, txOptions, onDelete } = props;

  const i18nHeader = txHeader ? i18n.t(txHeader, txOptions) : header;

  return (
    <HStack justifyContent="space-between" px={5} py={3}>
      <Text fontSize="2xl">{i18nHeader}</Text>
      {/* { selectedRowsId.length && <IconButton aria-label="delete button" onClick={onDelete}></IconButton>} */}
    </HStack>
  )
}
