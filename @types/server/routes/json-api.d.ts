import { REQ, RES } from "../lib/handler";
declare const exportnow: {
    path: string;
    handler: (req: REQ, res: RES) => void;
};
export default exportnow;
