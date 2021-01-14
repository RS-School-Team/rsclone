import React from "react";
import {connect, ConnectedProps} from "react-redux";




const mapState = (state: { text: string; test: { text: string; }; }) => {
    return {text: state.test.text}
}

const connector = connect(mapState, null)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    text: string
}


const JustWIthStore =  ({text}:any) => {
     return (
        <h2>тут должен быть state {text}</h2>
    )
}

export default connector(JustWIthStore)