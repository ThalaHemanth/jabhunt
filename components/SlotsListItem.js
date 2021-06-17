import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRouter } from 'next/router';

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);

const SlotsListItem = props => {
  const displayDate = dayjs(props.date, 'DD-MM-YYYY');
  const router = useRouter();
  function onSlotListItemClick() {
    router.push({
      pathname: '/sessions',
      query: {
        date: displayDate.format('DD-MM-YYYY'),
        place: props.place,
        pincode: props.pincode,
        districtID: props.districtID,
      },
    });
  }
  return (
    <div
      role="button"
      onClick={onSlotListItemClick}
      className="h-16 sm:w-2/4  sm:m-auto w-full border-b flex flex-row items-center justify-around py-1 px-3"
    >
      <div>{dayjs(displayDate).format('LL')}</div>
      <div>{props.slots} slots</div>
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};
export default SlotsListItem;
