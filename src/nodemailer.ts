import NodeMailer from "./classes/NodeMailer";
import config from "@/config.json";

export default new NodeMailer(config.mail);
