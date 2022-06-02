"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const punycode_1 = require("punycode");
const time = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}.${date.getMilliseconds()}`;
};
class Logger {
    fname;
    data;
    backupdir;
    constructor(fname = `${process.cwd()}/log/index.log`) {
        const self = this;
        if (path_1.extname(fname) == '')
            fname += '.log';
        this.data = [
            {
                obj: {
                    msg: 'Logger init'
                },
                meta: {
                    level: 'default',
                    timestamp: time()
                }
            }
        ];
        this.fname = path_1.resolve(process.cwd(), fname);
        this.backupdir = path_1.resolve(this.fname, '../backup');
    }
    save() {
        const self = this;
        const backupfile = path_1.resolve(this.backupdir, time() + '.log');
        const data = this.data.map(e => `${e.meta.timestamp} ${e.meta.level.toUpperCase()} ${punycode_1.encode(JSON.stringify(e.obj))}`).join('\n');
        fs_extra_1.default.ensureFileSync(backupfile);
        fs_extra_1.default.writeFileSync(self.fname, data);
    }
    set(msg, level = 'default') {
        let obj;
        switch (typeof msg) {
            case 'number':
            case 'string':
                obj = { msg: msg.toString() };
                break;
            case 'object':
                obj = { ...msg };
                break;
            default:
                throw new TypeError(`${msg} is not a valid type`);
        }
        this.data.push({ obj, meta: { level, timestamp: time() } });
        this.save();
    }
    get() {
        const read = fs.readFileSync(this.fname, 'utf8');
        return read.split('\n').map(e => {
            const [timestamp, level, obj] = e.split(' ');
            return { timestamp, level, obj: JSON.parse(punycode_1.decode(obj)) };
        });
    }
}
exports.Logger = Logger;
;
exports.default = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9wYWNrYWdlcy9sb2dnZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtDQUF5QjtBQUN6QixnRUFBMkI7QUFFM0IsK0JBQXdDO0FBQ3hDLHVDQUEwQztBQUUxQyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7SUFDZCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3hCLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUM7QUFDbkssQ0FBQyxDQUFBO0FBRUQsTUFBYSxNQUFNO0lBQ2YsS0FBSyxDQUFTO0lBQ2QsSUFBSSxDQU9BO0lBQ0osU0FBUyxDQUFTO0lBQ2xCLFlBQVksS0FBSyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0I7UUFDaEQsTUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDO1FBRTFCLElBQUksY0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFBRSxLQUFLLElBQUksTUFBTSxDQUFDO1FBRTFDLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDUjtnQkFDSSxHQUFHLEVBQUU7b0JBQ0QsR0FBRyxFQUFFLGFBQWE7aUJBQ3JCO2dCQUNELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsU0FBUztvQkFDaEIsU0FBUyxFQUFFLElBQUksRUFBRTtpQkFDcEI7YUFDSjtTQUNKLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLGNBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsSUFBSTtRQUNBLE1BQU0sSUFBSSxHQUFXLElBQUksQ0FBQztRQUMxQixNQUFNLFVBQVUsR0FBRyxjQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQTtRQUMzRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksaUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakksa0JBQUcsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0Isa0JBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQVEsRUFBRSxRQUFnQixTQUFTO1FBQ25DLElBQUksR0FBRyxDQUFDO1FBRVIsUUFBUSxPQUFPLEdBQUcsRUFBRTtZQUNoQixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssUUFBUTtnQkFDVCxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUE7Z0JBQzdCLE1BQU07WUFDVixLQUFLLFFBQVE7Z0JBQ1QsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQTtnQkFDaEIsTUFBTTtZQUNWO2dCQUNJLE1BQU0sSUFBSSxTQUFTLENBQUMsR0FBRyxHQUFHLHNCQUFzQixDQUFDLENBQUM7U0FDekQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsR0FBRztRQUNDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUE7UUFDN0QsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUFsRUQsd0JBa0VDO0FBQUEsQ0FBQztBQUVGLGtCQUFlLE1BQU0sQ0FBQyJ9