import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../context/store";
import { authActions } from "../context/Auth/authActions";
import { roleActions } from "../context/Role/roleActions";
import Text from "../components/Text";
import { settingsActions } from "../context/Settings/settingsActions";

interface Props {
  children: React.ReactNode
}

function AuthProvider(props: Props) {
  const { children } = props;

  const auth = useTypedSelector(state => state.auth);

  const loading = auth.loading;
  const error = auth.error;

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(authActions.loginUser());
    dispatch(roleActions.fetchRoles());
    dispatch(settingsActions.fetchSettings());
  }, []);

  if (loading) return <Text tx="common.loading" />

  if (error) return <Text text={`Text ${error}`} />

  return <>{children}</>;
}

export default AuthProvider;
