import { Text as CKText, TextProps as CKTextProps } from '@chakra-ui/react';
import { I18nOptions, TxPath, i18n } from '../i18n';

interface TextProps extends CKTextProps {
  children?: React.ReactNode;
  txOptions?: I18nOptions;
  tx?: TxPath;
  text?: string;
}

export default function Text(props: TextProps) {
  const { children, tx, txOptions, text, ...reset } = props;

  const txI18n = tx ? i18n.t(tx, txOptions) : text;

  const content = txI18n || children;

  return (
    <CKText {...reset}>
      {content}
    </CKText>
  )
}
