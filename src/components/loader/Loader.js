import React from "react";

const  Loader = (props) => {

    return (
        <React.Fragment>
          <div className={"form-status "+ props.status}  ref={props.loaderRef}>
            <div className="loader">&nbsp;</div>
         </div>
        </React.Fragment>
    );


}
export default Loader;