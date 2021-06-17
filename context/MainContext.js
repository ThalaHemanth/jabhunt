import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const MainContext = createContext({
  stateID: null,
  setStateId_fun: () => {},
  districts: [],
  isDistrictsLoading: false,
  districtID: null,
  setDistrictId_fun: () => {},
  fetchSessionsByPincode: () => {},
  slots: [],
  fetchByCalender: () => {},
});

export default function MainContextProvider(props) {
  const [stateID, setStateID] = useState(null);
  const [districtID, setDistrictID] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [slots, setSlots] = useState([]);

  function setStateId_fun(id) {
    console.log(id);
    setStateID(id);
  }
  function setDistrictId_fun(id) {
    setDistrictID(id);
  }

  const fetchByCalender = async (pincode, options) => {
    const finalArray = [];
    const arr = [];
    const today = dayjs().format('DD-MM-YYYY');
    const tomorrow = dayjs().add('1', 'day').format('DD-MM-YYYY');
    const url = pincode
      ? `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${today}`
      : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtID}&date=${today}`;
    try {
      const { data } = await axios.get(url);
      console.log('FetchByCalender', url);
      console.log('FetchByCalender', data);
      await data.centers.map(center => {
        const disrict = center.district_name;
        const { pincode } = center;
        center.sessions.map(session =>
          arr.push({
            date: session.date,
            slots: session.slots.length,
            place: disrict,
            districtID,
            pincode: pincode || null,
          })
        );
      });
    } catch (e) {}

    const uniqueDates = Array.from(new Set(arr.map(d => d.date)));
    uniqueDates.forEach((d, i) => {
      let tempSlots = 0;
      let place;
      let pincode;
      arr.forEach((d2, i2) => {
        place = d2.place;
        pincode = d2.pincode;
        if (d === d2.date) {
          tempSlots += d2.slots;
        }
      });
      finalArray.push({ date: d, slots: tempSlots, place, pincode });
    });
    setSlots(finalArray);
  };

  async function fetchSessionsByPincode(pin) {
    if (!pin) {
      return;
    }
    console.log('PINCODe function working');
    const date = dayjs().format('DD-MM-YYYY');
    try {
      const { data } = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
      );
    } catch (e) {}
    console.log(pin, date);
    console.log(data);
  }

  async function fetchDistricts(id) {
    if (!stateID) {
      return;
    }
    const ID = id || stateID;
    try {
      const { data } = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${ID}`,
        {
          headers: {
            'user-agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
          },
        }
      );
      const refinedDistricts = await data.districts.map(district => ({
        value: district.district_id,
        label: district.district_name,
      }));
      await setDistricts(refinedDistricts);
    } catch (e) {}
  }

  useEffect(() => {
    fetchDistricts(stateID);
  }, [stateID]);

  useEffect(() => {}, [slots]);
  useEffect(() => {}, [districts]);
  return (
    <MainContext.Provider
      value={{
        stateID,
        setStateId_fun,
        districts,
        districtID,
        setDistrictId_fun,
        fetchSessionsByPincode,
        slots,
        fetchByCalender,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}

export const useMainContext = () => useContext(MainContext);
