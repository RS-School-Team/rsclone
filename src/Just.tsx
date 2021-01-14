import React from "react";

interface Appprops {
    test: string,
}
export default function Just (props:Appprops) {
    return <div>{props.test}</div>
}

