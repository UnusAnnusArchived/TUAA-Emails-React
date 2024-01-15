import { Text } from "@react-email/components";
import Template, { PlainTextExport, styles } from "./_template";

export interface IProps {}

export const subject: PlainTextExport<IProps> = () => "Test";
export const preview: PlainTextExport<IProps> = () => "Hello, world!";

export const defaultValues = {
  previewLink: "https://mail.unusann.us/preview/example-email",
};

const ExampleEmail: React.FC<IProps> = () => {
  return (
    <Template
      subject={subject({})}
      preview={preview({})}
      optout="You've received this email because you didn't but I'm testing this feature. To opt out, please visit your mom."
      previewLink="test"
    >
      <Text style={styles.text}>Hello, world!</Text>
    </Template>
  );
};

export default ExampleEmail;
