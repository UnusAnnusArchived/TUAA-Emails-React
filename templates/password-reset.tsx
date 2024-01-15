import { Button, Link, Text } from "@react-email/components";
import Template, { PlainTextExport, styles } from "./_template";

export interface IProps {
  resetUrl: string;
}

export const subject: PlainTextExport<IProps> = () => "Reset your password on The Unus Annus Archive";
export const preview: PlainTextExport<IProps> = ({ resetUrl = "Error Loading Link." }) =>
  `Please click the button below to reset your password. ${resetUrl}`;

export const defaultValues = {
  verifyUrl: "asdf",
};

const PasswordReset: React.FC<IProps> = ({ resetUrl = defaultValues.verifyUrl }) => {
  return (
    <Template
      subject={subject({ resetUrl })}
      preview={preview({ resetUrl })}
      optout={
        <>
          You've received this email because a password request was generated on The Unus Annus Archive. If you did not
          request a password reset, it is safe to ignore this email.
        </>
      }
    >
      <Text style={styles.text}>Please click the button below to reset your password.</Text>
      <Link href={resetUrl}>
        <button style={styles.button} className="btn">
          Reset
        </button>
      </Link>
    </Template>
  );
};

export default PasswordReset;
