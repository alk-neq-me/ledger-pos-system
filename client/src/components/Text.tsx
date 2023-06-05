import { Text as CKText, TextProps as CKTextProps } from '@chakra-ui/react';
import { TxPath, i18n } from '../i18n';

interface TextProps extends CKTextProps {
  children?: React.ReactNode;
  tx?: TxPath;
  text?: string;
}

export default function Text(props: TextProps) {
  const { children, tx, text, ...reset } = props;

  const txI18n = tx ? i18n.t(tx) : text;

  const content = txI18n || children;

  return (
    <CKText {...reset}>
      {content}
    </CKText>
  )
}
