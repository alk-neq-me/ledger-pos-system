import { ButtonProps as CKButtonProps, Button as CKButton } from "@chakra-ui/react";
import { I18nOptions, TxPath, i18n } from "../i18n";

interface ButtonProps extends CKButtonProps {
  tx?: TxPath;
  txOptions?: I18nOptions;
  text?: string;
  children?: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const { children, tx, txOptions, text, ...reset } = props;
  const txI18n = tx ? i18n.t(tx, txOptions) : text;

  const content = txI18n || children;

  return (
    <CKButton {...reset}>
      {content}
    </CKButton>
  )
}
