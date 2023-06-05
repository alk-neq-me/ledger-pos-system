import { HStack, Link, List, ListItem, Text } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import { useTypedSelector } from "../context/store";


export default function Header() {
  const { auth } = useTypedSelector(state => state.auth);
  const { customerMarker } = useTypedSelector(state => state.marker);

  const markerName = customerMarker ? customerMarker.name : "unknown";
  const markerBook = customerMarker ? customerMarker.books.find(book => book.id === customerMarker.currentBook)?.label : "unknown"

  return (
    <>
      <HStack justifyContent="space-between">
        <Text>Ledger</Text>
        <Text>{auth?.firstName} {markerName}:{markerBook}</Text>
        <List display="flex" gap={5}>
          <ListItem>
            <Link as={RouterLink} to="/">Home</Link>
          </ListItem>
          <ListItem>Hello</ListItem>
        </List>
      </HStack>
    </>
  )
}
