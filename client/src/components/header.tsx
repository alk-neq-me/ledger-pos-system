import { HStack, Link, List, ListItem } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from "../context/store";
import Text from "./Text";
import Button from "./Button";
import { settingsActions } from "../context/Settings/settingsActions";


export default function Header() {
  const { auth } = useTypedSelector(state => state.auth);
  const { customerMarker } = useTypedSelector(state => state.marker);
  const { settings } = useTypedSelector(state => state.layout);

  const dispatch = useTypedDispatch();

  const { ledgerMode } = settings;

  const markerName = customerMarker ? customerMarker.name : "unknown";
  const markerBook = customerMarker ? customerMarker.books.find(book => book.id === customerMarker.currentBook)?.label : "unknown"

  const onChangeLedgerMode = () => {
    dispatch(settingsActions.toggleLedgerMode());
  }

  return (
    <>
      <HStack justifyContent="space-between">
        <HStack>
          <Text text="Ledger" />
          <Button text={ledgerMode} onClick={onChangeLedgerMode} />
        </HStack>
        <Text>{auth?.firstName} {markerName}:{markerBook}</Text>
        <List display="flex" gap={5}>
          <ListItem display="flex" gap={2}>
            <Link as={RouterLink} to="/">Home</Link>
            <Link as={RouterLink} to="/other">Other</Link>
            <Link as={RouterLink} to="/settings">Settings</Link>
          </ListItem>
          <ListItem>Hello</ListItem>
        </List>
      </HStack>
    </>
  )
}
