import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import Navbar from '../components/Navbar';
import { FilterBreadCrumb, SearchInput } from '../components/Common';
import SlotCard from '../components/SlotCard';

const filterOptions = [
  {
    type: 'vaccine',
    placeholder: 'COVAXIN',
  },
  {
    type: 'vaccine',
    placeholder: 'COVISHIELD',
  },
  {
    type: 'age',
    placeholder: '45',
  },
  {
    type: 'age',
    placeholder: '18',
  },
  {
    type: 'fee',
    placeholder: 'Free',
  },
  {
    type: 'fee',
    placeholder: 'PAID',
  },
];

export default function SessionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionData, setSessionData] = useState([]);
  const { query, isReady, back } = useRouter();

  const { date, place, pincode, districtID } = query;

  async function fetchData() {
    console.log('Date', pincode);
    const url = pincode
      ? `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${
          sessionDate || date
        }`
      : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtID}&date=${
          sessionDate || date
        }
`;
    try {
      const { data } = await axios.get(url);
      setSessionData(data);
    } catch (e) {}
  }

  function setDate(date) {
    setSessionDate(date);
  }

  useEffect(() => {
    fetchData();
  }, [date, isReady]);

  /*
    Just pass the date as query the continue by manipulating by using dayjs lib
    then performing api requests to cowin then painting the dom with that.
    active data should be in the state
    active date should be in the state

    trigger the fetchfunction in useeffect whenever the date changes

    send the date as query
    get the date and set it to state
    perform fetch function immediately and set the data in state; // if i do it in the main render then it might fetch with every render. so if the state data is empty fetch this.
    then when the date changes use the useeffect hook to refetch the data;

    useEffect(() => { fetchData(); }, [date])
     */

  function onSearch() {
    /*
     * Perform filtering here and display the hospitals
     * */
  }

  function onButtonClick(position) {
    const date =
      position === 'left'
        ? dayjs(sessionDate, 'DD-MM-YYYY').add('1', 'day').format('DD-MM-YYYY')
        : dayjs(sessionDate, 'DD-MM-YYYY')
            .subtract('1', 'day')
            .format('DD-MM-YYYY');
    setSessionDate(date);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch();
    }, 2000);
    return () => clearTimeout(timer);
  });

  function handleFilterButton(event) {
    const type = event.target.dataset.filtertype;
    const value = event.target.innerText;
  }

  function onSearchInput(event) {
    setSearchTerm(event.target.value);
  }

  if (!isReady) {
    return <div>Loading...</div>;
  }

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col mx-auto h-auto w-full">
        <Navbar title="Chitoor" />
        <div className="w-full flex flex-row items-center justify-between">
          <div role="button" onClick={() => back()} className="py-1 px-3">
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div>Date</div>
          <div role="button" onClick={() => back()} className="py-1 px-3">
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
        <div className="w-3/4 flex justify-center flex-row flex-wrap mt-4 mb-3 mx-auto">
          {filterOptions.map(option => (
            <div className="px-1 py-2">
              <FilterBreadCrumb
                filterName={option.placeholder}
                filterType={option.type}
                onClick={handleFilterButton}
              />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <SearchInput
            onChange={onSearchInput}
            placeholder="Search Hospital Name"
          />
        </div>
        <div className="overflow-y-scroll  flex flex-col items-center w-full mx-auto">
          {sessionData.sessions?.map(session => (
            <SlotCard
              name={session.name}
              place={session.district_name}
              fee={session.fee}
              vaccine={session.vaccine}
              pincode={session.pincode}
              shots={session.available_capacity}
            />
          ))}
        </div>
      </div>
    </>
  );
}
