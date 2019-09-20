import React from 'react'
import {PaginateWrapper} from './styles'
import 'babel-polyfill';

const Paginate = (props) => {

  const [pagerState, setPagerState] = React.useState({
    curPage: undefined,
    items: props.data,
    pager: {}
  })

  const setPage = async(page) => {
    
    if (page === undefined && pagerState.curPage === undefined) {
      page = 1
    } else if (page === undefined && pagerState.curPage !== undefined) {
      return
    }

    var items  = await props.data
    var limitItems = props.limitItems
    var pager = pagerState.pager;

    if (page < 1 || page > pager.totalPages) {
        return;
    }

    // get new pager object for specified page
    pager = getPager(items.length, page, limitItems);

    // update state
    setPagerState({
      curPage: page,
      pager: pager,
    });

    const selectedItems = items.slice((page - 1) * limitItems, page * limitItems);
    // call change page function in parent component
    props.onPageChange(page, selectedItems);

  }

  const getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    // var totalPages = Math.ceil(totalItems / pageSize);
    var totalPages = props.totalPages ? props.totalPages : Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, props.totalItems ? props.totalItems - 1 : totalItems - 1);

    
    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
  }

  React.useEffect(() => {
    setPage(props.initialPage);
  }, [props.data])

  const pager = pagerState.pager;

  if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
  }


  return (
    <PaginateWrapper {...props}>
      <ul className="pagination">

        <li>
            <a 
              className={pager.currentPage === 1 ? 'disabled' : ''} 
              onClick={() => setPage(1)}>First</a>
        </li>
        <li>
            <a 
              className={pager.currentPage === 1 ? 'disabled' : ''} 
              onClick={() => setPage(pager.currentPage - 1)}>Previous</a>
        </li>


        {pager.pages.map((page, index) =>
            <li key={index}>
                <a 
                  className={pager.currentPage === page ? 'active' : ''} 
                  onClick={() => setPage(page)}>{page}</a>
            </li>
        )}

        <li>
            <a 
              className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
              onClick={() => setPage(pager.currentPage + 1)}>Next</a>
        </li>
        <li>
            <a 
              className={pager.currentPage === pager.totalPages ? 'disabled' : ''} 
              onClick={() => setPage(pager.totalPages)}>Last</a>
        </li>

      </ul>
    </PaginateWrapper>
  )

}


export default Paginate