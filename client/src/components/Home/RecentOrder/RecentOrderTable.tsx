import { useEffect } from 'react';
import { NumbersOrder } from '../../../context/RecentOrder/types';
import { useTypedDispatch, useTypedSelector } from '../../../context/store';
import Table, { Columns } from '../../Table';
import { recentOrderActions } from '../../../context/RecentOrder/recentOrderActions';

const columns: Columns<NumbersOrder>[] = [
  { title: "Id", dataIndex: "id", hiddenColumn: true },
  { title: "Number", dataIndex: "number" },
  { title: "Amount", dataIndex: "amount", isNumber: true }
];

interface Props {
  recents: NumbersOrder[],
  onDelete: (ids: string[]) => void
}

function RecentOrderTable(props: Props) {
  const { recents, onDelete } = props;
  const { customerMarker } = useTypedSelector(state => state.marker);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (customerMarker?.currentBook) {
      console.log("changed marker", customerMarker?.name);
      const recents = customerMarker.books.find(book => book.id === customerMarker.currentBook)?.recents;
      dispatch(recentOrderActions.createRecentOrder(recents || [], customerMarker));
    }
  }, [customerMarker?.currentBook]);


  return (
    <>
      <Table 
        header="Recent Table"
        columns={columns}
        rows={recents}
        onDeleteAction={onDelete}
      />
    </>
  )
}

export default RecentOrderTable;
