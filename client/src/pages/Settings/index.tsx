import Button from "../../components/Button";
import { settingsActions } from "../../context/Settings/settingsActions";
import { useTypedDispatch } from "../../context/store"

export default function Settings() {
  const dispatch = useTypedDispatch();

  const onClickLedgerMode = () => {
    dispatch(settingsActions.toggleLedgerMode());
  }

  return (
    <Button 
      tx="settings.toggle" 
      txOptions={{ name: "Ledger Mode" }} 
      onClick={onClickLedgerMode} 
    />
  )
}
