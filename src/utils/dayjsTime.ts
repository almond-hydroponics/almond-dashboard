import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc, { parseToLocal: true });
dayjs.extend(timezone);
export default dayjs;
