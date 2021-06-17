import axios from 'axios';
import { useEffect, useState } from 'react';

export async function getStaticProps() {
  const { data } = axios.get(
    'https://cdn-api.co-vin.in/api/v2/admin/location/states',
    {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
      },
    }
  );
  console.log(data);
  return {
    props: { states: null },
  };
}

export default function Test(props) {
  // console.log(props.states);
  return <div>Test</div>;
}
