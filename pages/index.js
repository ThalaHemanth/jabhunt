import Head from 'next/head';
import axios from 'axios';

import React, { useEffect, Suspense, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FilterBreadCrumb,
  MainButton,
  SearchButton,
  SearchInput,
} from '../components/Common';
import Navbar from '../components/Navbar';
import SlotsListItem from '../components/SlotsListItem';
import SelectComponent from '../components/Select';
import SlotCard from '../components/SlotCard';
import { JabIcon } from '../components/Icons';
import { useMainContext } from '../context/MainContext';

const StateSelect = SelectComponent;
const DistrictSelect = SelectComponent;

export async function fetchStates() {
  const { data: states } = await axios.get(
    'https://cdn-api.co-vin.in/api/v2/admin/location/states',
    {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      },
    }
  );
  const stateOptions = states?.states.map(state => ({
    label: state.state_name,
    value: state.state_id,
  }));
  return stateOptions;
}

export async function getStaticProps() {
  const states = await fetchStates();
  return {
    props: { states },
  };
}

export default function Home({ states }) {
  const {
    districts,
    setStateId_fun,
    setDistrictId_fun,
    stateID,
    districtID,
    fetchSessionsByPincode,
    fetchByCalender,
  } = useMainContext();
  const [stateOption, setStateOption] = useState({ value: '', label: '' });
  const [districtOption, setDistrictOption] = useState({
    value: '',
    label: '',
  });
  const [activeSearchInputField, setActiveSearchInputField] = useState('');
  const [pincode, setPincode] = useState(null);
  const router = useRouter();

  function handleMainButonClick(event) {
    setPincode('');
    setActiveSearchInputField(event.target.getAttribute('name'));
  }

  function onPincodeChange(event) {
    setPincode(event.target.value);
  }

  function onSearchButtonClick() {
    fetchByCalender(pincode || null);
    router.push({
      pathname: '/slots',
      query: {
        states: JSON.stringify(states),
      },
    });
  }

  function handleChange(value, type) {
    if (type === 'state') {
      setStateOption(value);
    }
    if (type === 'district') {
      setDistrictOption(value);
    }
  }

  useEffect(() => {
    setStateId_fun(stateOption.value);
    setDistrictId_fun(districtOption.value);
    if (districtID) {
      fetchByCalender();
    }
  }, [stateOption, districtOption]);
  return (
    <div>
      <Head />
      <div className="flex flex-col items-center m-auto w-full my-auto">
        <div className="flex flex-row  justify-center text-center mt-8">
          <div className="text-center">
            <JabIcon />
          </div>
          <div className="w-10/12 text-4xl font-bold px-2">JabHunt</div>
        </div>
        <div className="text-sm mt-4">
          Find Vaccination Centres in Your Area{' '}
        </div>
        <div className="flex flex-row justify-center mt-20 mx-auto w-full">
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
          <div className="w-full sm:w-6/12 mt-8 flex flex-col justify-between">
            <SearchInput onChange={event => onPincodeChange(event)} />
          </div>
        )}
        <div className="flex flex-row justify-center mx-auto mt-6">
          <SearchButton onClick={onSearchButtonClick} />
        </div>
      </div>
    </div>
  );
}