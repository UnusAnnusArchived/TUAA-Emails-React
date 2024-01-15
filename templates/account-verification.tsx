import { Button, Link, Text } from "@react-email/components";
import Template, { PlainTextExport, styles } from "./_template";

export interface IProps {
  verifyUrl: string;
}

export const subject: PlainTextExport<IProps> = () => "Verify your email on The Unus Annus Archive";
export const preview: PlainTextExport<IProps> = ({ verifyUrl = "Error Loading Link." }) =>
  `Thank you for creating a new account on The Unus Annus Archive. Please click the button below to verify your email address. ${verifyUrl}`;

export const defaultValues = {
  verifyUrl: "asdf",
};

const AccountVerification: React.FC<IProps> = ({ verifyUrl = defaultValues.verifyUrl }) => {
  return (
    <Template
      subject={subject({ verifyUrl })}
      preview={preview({ verifyUrl })}
      optout={
        <>
          You've received this email because you have created a new account on The Unus Annus Archive. If you did not
          create an account, please{" "}
          <Link style={styles.link} className="link" href="mailto:contact@unusann.us">
            contact us
          </Link>{" "}
          and we will look into it.
        </>
      }
    >
      <Text style={styles.text}>
        Thank you for creating a new account on The Unus Annus Archive. Please click the button below to verify your
        email address.
      </Text>
      <Link href={verifyUrl}>
        <button style={styles.button} className="btn">
          Verify
        </button>
      </Link>
    </Template>
  );
};

export default AccountVerification;
