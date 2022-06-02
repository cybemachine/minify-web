import req from './req';
import res from './res';
import { IncomingMessage as IM, ServerResponse as SR } from "http";

export default (requ: IM, resu: SR) => ({ req: req(requ), res: res(resu) });