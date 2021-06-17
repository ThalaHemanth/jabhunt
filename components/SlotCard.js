import { FilterBreadCrumb } from './Common';

export default function SlotCard(props) {
  const { name, pincode, place, vaccine, fee, shots } = props;
  return (
    <div
      role="button"
      className="w-10/12 sm:w-8/12 md:w-8/12 border rounded-xl m-auto h-36 flex flex-row shadow-xl mt-6 overflow-hidden"
    >
      <div className="w-3/4 flex flex-col justify-around px-4 py-2">
        <div>
          <h1 className="font-medium py-1 text-sm">{name}</h1>
          <div className="flex flex-row py-1">
            <div className="flex flex-col justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-light px-1">
              {place}, {pincode}
            </p>
          </div>
        </div>
        <FilterBreadCrumb filterName="all" />
        <p className="font-light text-sm">
          Vaccine: {vaccine} {fee === '0' ? '(free)' : `(${fee})`}
        </p>
      </div>
      <div
        className={`w-1/4 ${
          shots < 10
            ? 'bg-red-500'
            : shots < 20
            ? 'bg-yellow-300'
            : 'bg-green-300'
        }`}
      >
        <div className="h-4/6 flex flex-col items-center justify-items-start pt-4">
          <p>{shots}</p>
          <p>Shots</p>
        </div>
        <div
          className={`${
            shots < 10
              ? 'bg-red-600'
              : shots < 20
              ? 'bg-yellow-500'
              : 'bg-green-600'
          } h-2/6 p-2 text-xs text-center`}
        >
          <a href="#">Book On CoWin</a>
        </div>
      </div>
    </div>
  );
}
