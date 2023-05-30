import { Button, HStack, VStack, Text } from '@chakra-ui/react';

import { useCallback, useEffect } from 'react';
import { createNumbeTable } from '../../utils/createNumberTable';
import { createOrderRecent } from '../../utils/createOrderRecent';
import { brosFunc, newFunc } from '../../utils/formulaFunctions';
import Table, { Columns } from '../../components/Table';
import { useTypedDispatch, useTypedSelector } from '../../context/store';
import { recentOrderActions } from '../../context/RecentOrder/recentOrderActions';
import { totalNumberTable } from '../../utils/totalNumberTable';
import RecentOrderTable from '../../components/Home/RecentOrder/RecentOrderTable';
import RecentOrderForm from '../../components/Home/RecentOrder/RecentOrderForm';
import PermissionRequired from '../../helpers/permissionRequired';
import { customerMarkerActions } from '../../context/CustomerMarker/customerMarkerActions';
import { numberTableActions } from '../../context/NumberTable/numberTableActions';
import { NumbersTable } from '../../context/NumberTable/types';
import { customerActions } from '../../context/Customer/customerActions';


const LEDGER_MODE: "2" | "3" = "2";


const columns: Columns<NumbersTable>[] = [
  { 
    title: "Number", 
    dataIndex: "number" 
  },
  { 
    title: "Total", 
    dataIndex: "total", 
    align: "right", 
    sorter: true, 
    isNumber: true
  }
];

const table = createNumbeTable(LEDGER_MODE);

function MainTable() {
  const { rows } = useTypedSelector(state => state.numberTable);
  const { rows: recents, loading } = useTypedSelector(state => state.recentOrder);
  const { customerMarker } = useTypedSelector(state => state.marker);

  const dispatch = useTypedDispatch();

  /** Test */
  const { rows: markers } = useTypedSelector(state => state.customers);

  const disabled = customerMarker === undefined;


  useEffect(() => {
    dispatch(customerActions.fetchCustomers());
  }, []);


  const onOrderBros = useCallback(() => {
    const newOrder = createOrderRecent(brosFunc, 200);
    if (!disabled) dispatch(recentOrderActions.createRecentOrder(newOrder, customerMarker));
  }, [customerMarker?.currentBook]);

  const onOrderNew = useCallback(() => {
    const newOrder = createOrderRecent(newFunc, 250);
    if (!disabled) dispatch(recentOrderActions.createRecentOrder(newOrder, customerMarker));
  }, [customerMarker?.currentBook]);

  const onSaveRecents = useCallback(() => {
    const newRows = table(rows, recents);
    dispatch(numberTableActions.mergeTable(newRows));
    dispatch(recentOrderActions.removeAllRecentOrder());
  }, [recents]);

  const onDeleteRecent = (ids: string[]) => {
    dispatch(recentOrderActions.removeRecentOrder(ids));
  };


  return (
    <HStack alignItems="start">
      <Table
        minW="lg"
        header="Main"
        footer={`Total ${totalNumberTable(rows)}`}
        columns={columns}
        rows={rows}
      />

      <VStack>
        <RecentOrderTable recents={recents} onDelete={onDeleteRecent} />
        <HStack>
          <Button isLoading={loading} isDisabled={disabled} onClick={onOrderBros}>Bro Order</Button>
          <Button isDisabled={disabled} onClick={onOrderNew}>Order New</Button>

          <PermissionRequired 
            element={
              <Button onClick={onSaveRecents} isDisabled={disabled}>Save Recents</Button>
            } 
            permission='order:create' 
          />
          
        </HStack>
      </VStack>

      <VStack>
        <Text>Markers</Text>
        {markers.map(marker => (
          <Button key={marker.slug} onClick={() => dispatch(customerMarkerActions.selectCustomerMarker(marker, marker.books[0].id))}>{marker.name}</Button>
        ))}
      </VStack>

      <RecentOrderForm />
    </HStack>
  )
}

export default MainTable
