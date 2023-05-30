import { useEffect } from "react";
import { useTypedSelector } from "../context/store";
import rbac from "../utils/permission";

interface Props {
  element: React.ReactElement,
  permission: string,
}

function PermissionRequired(props: Props) {
  const { element, permission } = props;
  const { auth } = useTypedSelector(state => state.auth);
  const { rows: roles } = useTypedSelector(state => state.roles);

  useEffect(() => {
    for (const role of roles) {
      rbac.addRole(role.name, role.permissions);
    }
  }, [roles]);

  if (!auth) return <>loading...</>

  try {
    const isAuthorized = rbac.authorize(auth, permission);
    if (isAuthorized) return element;
    return null;
  } catch (err) {
    let errMessage = "unknown error";
    if (err instanceof Error) errMessage = err.message;
    return <>ERROR: {errMessage}</>
  }
}

export default PermissionRequired;
