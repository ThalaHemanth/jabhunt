import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import Select from 'react-select';
import Navbar from '../components/Navbar';
import {
  FilterBreadCrumb,
  SearchButton,
  SearchInput,
} from '../components/Common';
import SlotCard from '../components/SlotCard';
import { useIsMount } from '../utils/helper_hooks';

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);

const filterOptions = [
  {
    value: 'vaccine',
    label: 'COVAXIN',
  },
  {
    value: 'vaccine',
    label: 'COVISHIELD',
  },
  {
    value: 'min_age_limit',
    label: 45,
  },
  {
    value: 'min_age_limit',
    label: 18,
  },
  {
    value: 'fee_type',
    label: 'Free',
  },
  {
    value: 'fee_type',
    label: 'Paid',
  },
];

export default function SessionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [filterOption, setFilterOption] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [sessionPincode, setSessionPincode] = useState();
  const { query, isReady, back } = useRouter();

  const dateRef = useRef();
  dateRef.current = sessionDate;

  const { date, place, pincode, districtID } = query;
  const isFirst = useIsMount();

  async function fetchData() {
    console.log('fetch data triggered');
    const url = sessionPincode
      ? `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${sessionPincode}&date=${
          sessionDate || date
        }`
      : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtID}&date=${
          sessionDate || date
        }
`;
    console.log(url);
    try {
      const { data } = await axios.get(url);
      setSessionData(data.sessions);
      setActiveData(data.sessions);
    } catch (e) {}
    // setActiveData(sessionData);
  }

  function filterSessions() {
    if (filterOption.length < 1) {
      if (searchTerm === '') {
        setActiveData(sessionData);
      } else {
        setActiveData(searchData);
      }
      return;
    }
    const filteredSessions = activeData?.map(session => {
      // console.log('Filtersessions function');
      if (filterOption.length < 1) return session;
      let counter = 0;
      // console.log('Filtersessions continuing and its length is greater than 1');
      filterOption.forEach(filter => {
        if (session[filter.value] === filter.label) {
          counter += 1;
        }
      });
      if (filterOption.length === counter) {
        return session;
      }
      //   // console.log('counter', counter);
      //   let filtered = [];
      //   filtered = filterOption.length === counter ? session : null;
      //   console.log('filtered variable', filtered);
      //   let deleteUndefined = [];
      //
    });
    const deleteUndefined = filteredSessions?.filter(
      item => item !== undefined
    );
    setActiveData(deleteUndefined);
    //   setActiveData(deleteUndefined);
    //
    // // return deleteUndefined;
  }

  function setDate(date) {
    setSessionDate(date);
  }

  function searchData_fun() {
    if (!searchTerm || searchTerm === '') {
      setActiveData(sessionData);
    } else {
      let Data = [];
      Data = sessionData?.filter(session =>
        session.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
      setSearchData(Data);
      setActiveData(Data);
    }
  }
  useEffect(() => {
    setSessionDate(date);
    setSessionPincode(pincode);
  }, []);

  useEffect(() => {
    fetchData();
  }, [sessionDate]);

  useEffect(() => {
    filterSessions();
    // if (isFirst) {
    // } else {
    //   console.log('filter Option Changed');
    //   const timeout = setTimeout(() => {
    //     filterSessions();
    //   }, [1500]);
    //   return () => clearTimeout(timeout);
    // }
  }, [filterOption]);

  useEffect(() => {}, [activeData]);

  useEffect(() => {}, [sessionData]);
  useEffect(() => {}, [searchData]);
  useEffect(() => {}, [sessionDate]);

  useEffect(() => {
    if (isFirst) {
    } else {
      const timeout = setTimeout(() => {
        searchData_fun();
        filterSessions();
      }, [2000]);
      return () => clearTimeout(timeout);
    }
  }, [searchTerm]);

  // useEffect(() => {
  //   console.log('Active Data', activeData);
  //   console.log('Session Data', sessionData);
  // }, [activeData, sessionData]);

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
    console.log(dateRef.current);
    const formattedDate = dayjs(dateRef.current, 'DD-MM-YYYY').format(
      'YYYY-MM-DD'
    );
    const tempDate =
      position === 'left'
        ? dayjs(formattedDate, 'YYYY-MM-DD').subtract(1, 'day')
        : dayjs(formattedDate, 'YYYY-MM-DD').add(1, 'day');
    setSessionDate(dayjs(tempDate).format('DD-MM-YYYY'));
    setFilterOption([]);
    setSearchTerm('');
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch();
    }, 2000);
    return () => clearTimeout(timer);
  });

  function onSearchInput(event) {
    setSearchTerm(event.target.value);
  }

  // if (!isReady) {
  //   console.log('Is Ready', isReady);
  //   return <div>Loading...</div>;
  // }

  // if (!activeData.length) {
  //   return <div>Loading...</div>;
  // }

  // if (!activeData.length) return <div>No Results</div>;

  // if (activeData && activeData.length < 1) return <div>Loading...</div>;

  return isReady ? (
    <>
      <div className="flex flex-col mx-auto h-auto w-full">
        <Navbar title={place} />
        <div className="w-full flex flex-row items-center justify-between">
          <div
            role="button"
            onClick={() => onButtonClick('left')}
            className="py-1 px-3"
          >
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
          <div>{dayjs(sessionDate, 'DD-MM-YYYY').format('LL')}</div>
          <div
            role="button"
            onClick={() => onButtonClick('right')}
            className="py-1 px-3"
          >
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
        {/* <div className="w-3/4 flex justify-center flex-row flex-wrap mt-4 mb-3 mx-auto"> */}
        {/*  {filterOptions.map(option => ( */}
        {/*    <div className="px-1 py-2"> */}
        {/*      <FilterBreadCrumb */}
        {/*        filterName={option.placeholder} */}
        {/*        filterType={option.type} */}
        {/*        onClick={handleFilterButton} */}
        {/*      /> */}
        {/*    </div> */}
        {/*  ))} */}
        {/* </div> */}
        <div className="w-full mt-6 flex flex-row justify-start sm:justify-center ml-3  pl-4 sm:mx-auto">
          Filters
        </div>
        <div className="w-full sm:w-6/12 mt-8 mx-auto px-4">
          <Select
            defaultValues={[{ value: '', label: 'Select' }]}
            isMulti
            options={filterOptions}
            value={filterOption}
            onChange={value => {
              setFilterOption(value);
            }}
            placeholder="Filter"
          />
        </div>
        <div className="mt-6">
          <SearchInput
            onChange={onSearchInput}
            placeholder="Search Hospital Name"
          />
        </div>
        {/* <div className="flex flex-row justify-center mx-auto mt-6"> */}
        {/*  <SearchButton onClick={onSearchButtonClick} /> */}
        {/* </div> */}
        <div className="overflow-y-scroll  flex flex-col items-center w-full mx-auto">
          {activeData?.map((session, i) => (
            <SlotCard
              key={i + session.center_id}
              name={session.name}
              place={session.district_name}
              fee={session.fee}
              vaccine={session.vaccine}
              pincode={session.pincode}
              shots={session.available_capacity}
            />
          ))}
        </div>
        {/* <div className="overflow-y-scroll  flex flex-col items-center w-full mx-auto"> */}
        {/*  {activeData.sessions?.map((session, i) => ( */}
        {/*    <SlotCard */}
        {/*      key={i + session.center_id} */}
        {/*      name={session.name} */}
        {/*      place={session.district_name} */}
        {/*      fee={session.fee} */}
        {/*      vaccine={session.vaccine} */}
        {/*      pincode={session.pincode} */}
        {/*      shots={session.available_capacity} */}
        {/*    /> */}
        {/*  ))} */}
        {/* </div> */}
      </div>
    </>
  ) : (
    <div>Loading....</div>
  );
}
