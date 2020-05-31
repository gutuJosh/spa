import React from "react";

export default class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsPerPage: this.props.resultsPerPage,
      pagePerRange: 5,
      currentPageRange: 1,
      totalPageRanges: 1,
      totalPages: 1,
      currentPage: this.props.currentPage,
      pages: []
    };
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.preparePagination = this.preparePagination.bind(this);
  }

  componentDidMount() {
    let paginator = this.preparePagination(this.props.totalPages);
    this.setState({
      totalPages: paginator.totalPages,
      totalPageRanges: paginator.totalPageRanges,
      currentPageRange: paginator.currentPageRange,
      pages: paginator.pages
    });
    
  }

  componentDidUpdate(prevProps, nextProps){
    if (prevProps.totalPages !== nextProps.totalPages) {
        let getData = this.preparePagination(prevProps.totalPages);
      this.setState({
        currentPageRange: nextProps.currentPage > 1 ? getData.currentPageRange : 1
      }, () => {
        
        this.setState({
          totalPages: getData.totalPages,
          totalPageRanges: getData.totalPageRanges,
          pages: getData.pages,
          currentPage: prevProps.currentPage
        });
      });
    }
  }


  preparePagination(raws){

    let totalPages = Number(raws);
    let totalPageRanges = Math.ceil(totalPages / this.state.pagePerRange);
    let currentPageRange = Math.ceil( Number(this.state.currentPage) / this.state.pagePerRange);
    let startIndex = (currentPageRange === 1) ? 1 : currentPageRange * this.state.pagePerRange - (this.state.pagePerRange - 1);
    let stopIndex = (currentPageRange === 1) ? this.state.pagePerRange : startIndex + (this.state.pagePerRange - 1);

    stopIndex = (totalPages <= this.state.pagePerRange || currentPageRange === totalPageRanges)
        ? totalPages
        : stopIndex;
    let pages = [];
    for (let i = startIndex; i <= stopIndex; i++) {
      pages.push(i);
    }
    if (startIndex === 1 && stopIndex === 1) {
      pages = [];
    }

    let obj = {
      totalPages: totalPages,
      totalPageRanges: totalPageRanges,
      currentPageRange: currentPageRange,
      pages: pages
    };
   
    return obj;
  }

  changeCurrentPage(event) {
    event.preventDefault();
    const element = event.target;
    if (element.parentNode.classList.contains("active")) {
      return;
    }
    else{
        let getPageNumber = event.target.dataset.page !== undefined ? Number(event.target.dataset.page) : Number(event.target.parentNode.dataset.page);
        let range = event.target.dataset.pageRange !== undefined ? Number(event.target.dataset.pageRange) : Number(event.target.parentNode.dataset.pageRange);
        let currentPageRange = this.state.currentPageRange;
        //let pages = this.state.pages;
        const action = event.target.dataset.action === undefined && event.target.parentNode.dataset.action === undefined ? null : event.target.dataset.action || event.target.parentNode.dataset.action;
           
        if (action === null) {
            currentPageRange = range;
        }
        else if (action === "next") {
            currentPageRange = Number(range) < this.state.totalPageRanges  ? Number(range) + 1 : this.state.totalPageRanges;
        } else {
            currentPageRange = Number(range) > 2 ? Number(range) - 1 : 1;
            
        }
       
        let startIndex = currentPageRange === 1 ? 1 : currentPageRange * this.state.pagePerRange - (this.state.pagePerRange - 1);
        let stopIndex = currentPageRange === 1 ? this.state.pagePerRange : startIndex + (this.state.pagePerRange - 1);
        stopIndex = currentPageRange === this.state.totalPageRanges ? this.state.totalPages : stopIndex;
       
        let pages = [];
        for (let i = startIndex; i <= stopIndex; i++) {
            pages.push(i);
        }
        if (startIndex === 1 && stopIndex === 1) {
            pages = [];
        }
        
        this.setState({
            currentPage: getPageNumber,
            currentPageRange: currentPageRange,
            pages: pages
        }, this.props.handlePagination(getPageNumber));

        try{
          if(window.innerWidth < 992){
            document.querySelector('.details-holder').scrollTo(0,0);
          }
          window.scrollTo(0, document.querySelector('.page-header').offsetTop);
        }
        catch(error){
          console.log(error);
        }
        
        
    }

  }

  render() {
    return (
        <React.Fragment>
        {this.state.pages.length > 0 && (
          <ul className="inline-list pointer paginator">
            {this.state.currentPageRange > 1 && (
              <React.Fragment>
                <li className="list-inline-item">
                  <a
                    href="/"
                    onClick={this.changeCurrentPage}
                    data-page="1"
                    data-page-range="1"
                    data-action="prev"
                  >
                    1
                  </a>
                </li>

                <li>
                  <a
                    href="/"
                    data-page={this.state.pages[0] - 1}
                    onClick={this.changeCurrentPage}
                    data-page-range={this.state.currentPageRange}
                    data-action="prev"
                  >
                    <i className="pe-7s-angle-left"></i>
                  </a>
                </li>
              </React.Fragment>
            )}

            {this.state.pages.map((item, i) => (
              <li
                onClick={this.changeCurrentPage}
                className={
                  this.state.currentPage === item
                    ? "list-inline-item active"
                    : "list-inline-item"
                }
                key={i}
                data-page={item}
              >
                <a
                  href="/"
                  data-page={item}
                  data-page-range={this.state.currentPageRange}
                >
                  {item}
                </a>
              </li>
            ))}

            {this.state.currentPageRange < this.state.totalPageRanges && (
              <React.Fragment>
                <li
                  className="list-inline-item"
                  data-page={this.state.pages[this.state.pages.length - 1] + 1}
                >
                  <a
                    href="/"
                    data-page={
                      this.state.pages[this.state.pages.length - 1] + 1
                    }
                    data-page-range={this.state.currentPageRange}
                    data-action="next"
                    onClick={this.changeCurrentPage}
                  >
                    <i className="pe-7s-angle-right"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    data-page={this.state.totalPages}
                    onClick={this.changeCurrentPage}
                    data-page-range={this.state.totalPageRanges}
                    data-action="next"
                  >
                   {this.state.totalPages}
                  </a>
                </li>
              </React.Fragment>
            )}
          </ul>
        )}
        </React.Fragment>
    );
  }
}