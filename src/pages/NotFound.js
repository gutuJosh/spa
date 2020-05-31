import React from "react"

export default class NotFound extends React.Component {

    componentDidMount(){
        this.props.history.push('/');
    }

    render(){
        return (
            <React.Fragment>&nbsp;</React.Fragment>
        );
    }
}