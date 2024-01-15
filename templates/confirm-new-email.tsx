import { Button, Link, Text } from "@react-email/components";
import Template, { PlainTextExport, styles } from "./_template";

export interface IProps {
  confirmUrl: string;
}

export const subject: PlainTextExport<IProps> = () => "Confirm your new email address on The Unus Annus Archive";
export const preview: PlainTextExport<IProps> = ({ confirmUrl = "Error Loading Link." }) =>
  `Please click the button below to confirm your new email address. ${confirmUrl}`;

export const defaultValues = {
  confirmUrl: "asdf",
};

const ConfirmNewEmail: React.FC<IProps> = ({ confirmUrl = defaultValues.confirmUrl }) => {
  return (
    <Template
      subject={subject({ confirmUrl })}
      preview={preview({ confirmUrl })}
      optout={
        <>
          You've received this email because a change email request was generated on The Unus Annus Archive. If you did
          not request a change email reset, it is safe to ignore this email.
        </>
      }
    >
      <Text style={styles.text}>Please click the button below to confirm your new email address.</Text>
      <Link href={confirmUrl}>
        <button style={styles.button} className="btn">
          Confirm
        </button>
      </Link>
    </Template>
  );
};

export default ConfirmNewEmail;
