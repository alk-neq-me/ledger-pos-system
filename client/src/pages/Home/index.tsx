import { Button, HStack, VStack } from '@chakra-ui/react';

import { useCallback, useEffect, useMemo } from 'react';
import Table, { Columns } from '../../components/Table';
import { useTypedDispatch, useTypedSelector } from '../../context/store';
import { recentOrderActions } from '../../context/RecentOrder/recentOrderActions';
import PermissionRequired from '../../helpers/permissionRequired';
import { customerMarkerActions } from '../../context/CustomerMarker/customerMarkerActions';
import { numberTableActions } from '../../context/NumberTable/numberTableActions';
import { NumbersTable } from '../../context/NumberTable/types';
import { customerActions } from '../../context/Customer/customerActions';
import { brosFunc, createNumbeTable, createOrderRecent, newFunc, totalNumberTable } from '../../utils';
import Text from '../../components/Text';
import RecentOrderTable from '../../components/RecentOrder/RecentOrderTable';
import RecentOrderForm from '../../components/RecentOrder/RecentOrderForm';


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


function MainTable() {
  const { 
    rows, 
    loading: rowLoading,
    pagination
  } = useTypedSelector(state => state.numberTable);

  const { 
    rows: recents, 
    loading: recentLoading, 
    pagination: recentPagination 
  } = useTypedSelector(state => state.recentOrder);
  const { customerMarker, loading: markerLoading } = useTypedSelector(state => state.marker);
  const { settings: { ledgerMode }, loading: settingsLoading } = useTypedSelector(state => state.layout);

  const loading = rowLoading || recentLoading || markerLoading || settingsLoading;

  const table = useMemo(() => createNumbeTable(ledgerMode), [ledgerMode]);  // TO MARGE RECENT NUMBERS TO MAIN TABLE

  const dispatch = useTypedDispatch();

  /** Test */
  const { rows: markers } = useTypedSelector(state => state.customers);

  const disabled = customerMarker === undefined;

  useEffect(() => {
    dispatch(customerActions.fetchCustomers());
    dispatch(numberTableActions.fetchTable(ledgerMode));  // LEDGER MODE ACTIVATE
  }, [ledgerMode]);


  const onOrderBros = useCallback(() => {
    const newOrder = createOrderRecent(brosFunc, 200);
    dispatch(recentOrderActions.createRecentOrder(newOrder));
  }, [customerMarker?.currentBook]);

  const onOrderNew = useCallback(() => {
    const newOrder = createOrderRecent(newFunc, 250);
    dispatch(recentOrderActions.createRecentOrder(newOrder));
  }, [customerMarker?.currentBook]);

  const onSaveRecents = useCallback(() => {
    const newRows = table(rows, recents);
    dispatch(numberTableActions.mergeTable(newRows));
    dispatch(recentOrderActions.removeAllRecentOrder());
  }, [recents]);

  const onDeleteRecent = (ids: string[]) => {
    dispatch(recentOrderActions.removeRecentOrder(ids));
  };

  if (loading) return <Text tx="common.loading" />

  return (
    <HStack alignItems="start">
      <Table
        minW="lg"
        header="Main"
        footer={`Total ${totalNumberTable(rows)}`}
        columns={columns}
        rows={rows}
        pagination={pagination}
        prefixTableType="@@NUMBER_TABLE"
      />

      <VStack>
        <RecentOrderTable
          recents={recents}
          pagination={recentPagination}
          onDelete={onDeleteRecent} 
        />
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
        <Text tx="common.ok" />
        {markers.map(marker => (
          <Button key={marker.slug} onClick={() => dispatch(customerMarkerActions.selectCustomerMarker(marker, marker.books[0].id))}>{marker.name}</Button>
        ))}
      </VStack>

      <RecentOrderForm />
    </HStack>
  )
}

export default MainTable
