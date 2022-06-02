import { REQ, RES } from "../lib/handler";
declare const exportnow: {
    startswith: string;
    handler: (req: REQ, res: RES) => RES | REQ | undefined;
};
export default exportnow;
