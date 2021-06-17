import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SlotsListItem from '../components/SlotsListItem';
import Navbar from '../components/Navbar';
import {
  FilterBreadCrumb,
  MainButton,
  SearchButton,
  SearchInput,
} from '../components/Common';
import { useMainContext } from '../context/MainContext';
import SelectComponent from '../components/Select';
import SlotCard from '../components/SlotCard';

const StateSelect = SelectComponent;
const DistrictSelect = SelectComponent;

function getStaticProps() {}

export const filterOptions = [
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

export default function SlotsPage(props) {
  const router = useRouter();
  const [states, setStates] = useState([]);
  const [filters, setFilters] = useState({
    age: '45',
    vaccine: 'COVAXIN',
    fee: 'FREE',
  });
  const [activeSearchInputField, setActiveSearchInputField] = useState('');
  const [stateOption, setStateOption] = useState({ value: '', label: '' });
  const [districtOption, setDistrictOption] = useState({
    value: '',
    label: '',
  });
  const [pincode, setPincode] = useState(null);
  const { fetchByCalender, slots } = useMainContext();

  // useEffect(() => {
  //   console.log('Pincode Change useeffect');
  //   const timeout = setTimeout(() => {
  //     console.log('Timout triggered');
  //     fetchByCalender(pincode);
  //   }, 2000);
  //   return () => clearTimeout(timeout);
  // }, [pincode]);

  useEffect(() => {
    setStates(JSON.parse(router.query.states));
  }, []);

  const { stateID, districtID, districts, setStateId_fun, setDistrictId_fun } =
    useMainContext();

  function onPincodeChange(event) {
    setPincode(event.target.value);
  }

  function handleMainButonClick(event) {
    setActiveSearchInputField(event.target.getAttribute('name'));
  }

  function handleChange(value, type) {
    if (type === 'state') {
      setStateOption(value);
      setStateId_fun(value.value);
    }
    if (type === 'district') {
      setDistrictOption(value);
      setDistrictId_fun(value.value);
    }
  }

  function onSearchButtonClick() {
    fetchByCalender(pincode);
  }

  function handleFilterButton(event) {
    const type = event.target.dataset.filtertype;
    const value = event.target.innerText;
    console.log(type, ':', value);
  }

  return (
    <div className="flex flex-col items-center mx-auto w-full">
      <Navbar title="Available Slots" />
      <div className="flex flex-row justify-center mt-8 mx-auto w-full">
        <div className="px-2">
          <MainButton
            name="District"
            onClick={event => handleMainButonClick(event)}
          />
        </div>
        <div className="px-2">
          <MainButton
            name="Pincode"
            onClick={event => handleMainButonClick(event)}
          />
        </div>
      </div>
      {activeSearchInputField === 'District' ? (
        <div className="w-full sm:w-6/12 mt-8 flex flex-col justify-between">
          <div className="h-16 px-4">
            <p className="mx-auto text-sm">
              {stateID ? 'Change ' : 'Select '} State
            </p>
            <StateSelect
              propValue={stateOption}
              handleChange={value => handleChange(value, 'state')}
              options={states}
              placeholder="Select State"
            />
          </div>
          <div className="mt-3 h-16 px-4">
            <p className="mx-auto text-sm">
              {districtID ? 'Change ' : 'Select '} District
            </p>
            <DistrictSelect
              propValue={districtOption}
              handleChange={value => handleChange(value, 'district')}
              options={districts}
              placeholder="Select District"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="w-full sm:w-6/12 mt-8 flex flex-col justify-between">
            <SearchInput
              placeholder="Search By Pincode"
              onChange={onPincodeChange}
            />
          </div>
          <div className="flex flex-row justify-center mx-auto mt-6">
            <SearchButton onClick={onSearchButtonClick} />
          </div>
        </>
      )}
      <div className="w-full mt-6 flex flex-row justify-start sm:justify-center ml-3  pl-4 sm:mx-auto">
        Filters
      </div>
      {/* <div className="w-full h-24 bg-green-500 flex flex-row flex-wrap justify-center  mt-3 mb-3 mx-auto"> */}
      {/*  {filterOptions.map(option => ( */}
      {/*    <div className="px-3 bg-sexy-red"> */}
      {/*      <FilterBreadCrumb */}
      {/*        filterName={option.placeholder} */}
      {/*        filterType={option.type} */}
      {/*        onClick={handleFilterButton} */}
      {/*      /> */}
      {/*    </div> */}
      {/*  ))} */}
      {/* </div> */}
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
      <div className="w-full">
        {slots.map(slot => (
          <SlotsListItem
            date={slot.date}
            place={slot.place}
            slots={slot.slots}
            pincode={slot.pincode}
            districtID={slot.districtID}
          />
        ))}
      </div>
      {/* <SlotsListItem /> */}
    </div>
  );
}
