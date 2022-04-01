import React from 'react';

function List_Loading(Component) {
  return function LoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <p style={{  fontSize: '30px' }}>
        Hold on, fetching data may take some time :)
      </p>
    );
  };
}
export default List_Loading;