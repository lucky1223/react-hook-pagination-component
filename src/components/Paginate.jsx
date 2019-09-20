import React from 'react';
import {PaginateWrapper} from './styles'


class Paginate extends React.Component {
// const Paginate = (props) => {
  // const [pagerState, setPagerState] = React.useState({
    // curPage: undefined,
    // items: props.data,
    // pager: {}
  // })
  constructor(props) {
    super(props);

    this.state = {
      curPage: undefined,
      items: props.data,
      pager: {}
    }
  }

  // const setPage = async(page) => {
  setPage = (page) => {
    if (page === undefined && this.state.curPage === undefined) {
      page = 1
    } else if (page === undefined && this.state.curPage !== undefined) {
      return
    }
    var items = this.props.data
    var limitItems = this.props.limitItems
    var pager = this.state.pager;


    if (page < 1 || page > pager.totalPages) {
      return;
    }
    // if (page || pager.limitItems) {
    //   return;
    // }

    // get new pager object for specified page
    pager = this.getPager(items.length, page, limitItems);

    //  update state
    // setPagerState({
    this.setState({
      curPage: page,
      pager: pager,
    });

    //add this part for the item on
    const selectedItems = items.slice((page - 1) * limitItems, page * limitItems);
    // call change page function in parent component
    this.props.onPageChange(page, selectedItems);
  }

  getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    // var totalPages = Math.ceil(totalItems / pageSize);
    var totalPages = this.props.totalPages ? this.props.totalPages : Math.ceil(totalItems / pageSize);

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
    var endIndex = Math.min(startIndex + pageSize - 1, this.props.totalItems ? this.props.totalItems - 1 : totalItems - 1);

    
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
  // getPager = (totalItems, currentPage, pageSize) => {
  //   // default to first page
  //   currentPage = currentPage || 1;
  //   // default page size is 10
  //   pageSize = pageSize || 10;
  //   // calculate total pages
  //   // var limitItems = Math.ceil(totalItems / pageSize);
  //   var limitItems = this.props.limitItems ? this.props.limitItems : Math.ceil(totalItems / pageSize);
  //   var startPage, endPage;
  //   if (limitItems | pager.pages.length <= 1) {
  //     // don't display pager if there is only 1 page
  //     return null;
  //   }
  // }

  componentDidMount() {
    this.setPage(1);
  }

  render() {
    const props = this.props;
    const { pager } = this.state;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
  }

    return (
      <PaginateWrapper {...props}>
        <ul className="pagination">
          <li>
            <a className={pager.currentPage === 1 ? 'disabled' : ''}
            onClick={() => this.setPage(1)}>First</a>
          </li>
          <li>
            <a className={pager.currentPage === 1 ? 'disabled' : ''}
              onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
          </li>
          { pager.pages.map((page, index) =>
            <li key={index}>
              <a className={pager.currentPage === page ? 'active' : ''}
                onClick={() => this.setPage(page)}>{page}</a>
            </li>
          ) }
          <li>
            <a
              className={pager.currentPage === pager.limitItems ? 'disabled' : ''}
              onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
          </li>

          <li>
            <a className={pager.currentPage === pager.limitItems ? 'disabled' : ''}
            onClick={() => this.setPage(pager.limitItems)}>Last</a>
          </li>
        </ul>
      </PaginateWrapper>
    )
  }
}

export default Paginate
