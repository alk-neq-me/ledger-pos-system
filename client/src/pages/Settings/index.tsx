import { Select, SimpleGrid } from "@chakra-ui/react";
import Button from "../../components/Button";
import { settingsActions } from "../../context/Settings/settingsActions";
import { useTypedDispatch, useTypedSelector } from "../../context/store"
import Text from "../../components/Text";

export default function Settings() {
  const { settings, loading, error } = useTypedSelector(state => state.layout);
  const dispatch = useTypedDispatch();

  const { language } = settings;

  const onClickLedgerMode = () => {
    dispatch(settingsActions.toggleLedgerMode());
  }

  const handleOnChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(settingsActions.changeLanguage(event.target.value));
  }

  if (loading) return <Text tx="common.loading" />

  if (error) return <Text tx="common.error" />

  return (
    <SimpleGrid columns={3} gap={3}>
      <Button 
        tx="settings.toggle" 
        txOptions={{ name: "Ledger Mode" }} 
        onClick={onClickLedgerMode} 
      />
      <Select onChange={handleOnChangeLanguage} defaultValue={language}>
        <option value="ko">Korea</option>
        <option value="en">English</option>
        <option value="my">Myanmar</option>
      </Select>
    </SimpleGrid>
  )
}
