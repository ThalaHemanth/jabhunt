import { useRouter } from 'next/router';

const Navbar = props => {
  const router = useRouter();
  return (
    <div className="w-full h-16 flex flex-row items-center">
      <div role="button" onClick={() => router.back()} className="py-1 px-3">
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
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
      </div>
      <div className="text-2xl font-medium tracking-wide">{props.title}</div>
    </div>
  );
};
export default Navbar;
