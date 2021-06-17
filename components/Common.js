export const MainButton = props => (
  <div
    ass="ass"
    name={props.name}
    role="button"
    onClick={event => props.onClick(event)}
    className="text-md  font-light text-gray-100 tracking-wide border-1 bg-gradient-to-r from-red-grad-dark to-red-grad-light shadow-md border-1 py-1 px-4 overflow-hidden  rounded-sm"
  >
    {props.name}
  </div>
);

export const SearchInput = props => (
  <div
    role="button"
    onChange={props.onChange}
    className="w-10/12 sm:w-3/4 mx-auto h-10 border rounded-sm border-gray-300"
  >
    <input
      className="w-full h-full text-sm font-light outline-none font-sans pl-4"
      type="text"
      name="search"
      placeholder={props.placeholder}
    />
  </div>
);

export const SearchButton = props => (
  <div
    role="button"
    onClick={props.onClick}
    className="w-max bg-gradient-to-r from-red-grad-dark to-red-grad-light text-gray-100  px-6 py-2 border rounded-3xl tracking-wide"
  >
    Search
  </div>
);

export const FilterBreadCrumb = props => (
  <div
    data-filtertype={props.filterType}
    role="button"
    onClick={props.onClick}
    className="text-xs w-max tracking-wide border py-1 px-2 font-bold text-gray-700 border-gray-400 rounded-md"
  >
    {props.filterName}
  </div>
);
