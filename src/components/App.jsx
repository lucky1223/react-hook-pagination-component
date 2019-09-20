import React from 'react'
// import Layout from '../components/Layout'

import Paginate from './Paginate1';

// let perPage = 12

const createArrayInitialArray = () => {
  return [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
}

const Pagination = () => {
  const arrayRef = React.useRef(createArrayInitialArray());


  const [paginationState, setPaginationState] = React.useState({
    pageOfItems: [],
    items: arrayRef.current
  })

  
  const onPageChange = async (page, pageOfItems) => {
      // update state with new page of items
      // getMoreItems(page)
      setPaginationState({...paginationState, pageOfItems: pageOfItems})
  }


  return (
    <div>
      <p>Pagination</p>

      {paginationState.pageOfItems.map(item =>
        <div key={item.id}>{item.name}</div>
      )}

      <Paginate 
        data={paginationState.items}
        limitItems={15}
        onPageChange={onPageChange}
      />

    </div>
  )


}


export default Pagination