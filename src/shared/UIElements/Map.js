import React, { useEffect } from "react";

const Map = props => {

    

    useEffect(()=>{
        const iframeData=document.getElementById("iframeId")
        const {lat}=props; //1.305385;
        const {lon}=props; //30.923029;
        iframeData.src=`https://maps.google.com/maps?q=${lat},${lon}&zoom=5&hl=es;&output=embed`
        // iframeData.src=`http://mapsengine.google.com/map/u/0/embed?mid=zYk_BmXXTdxw.k83snDbX5SJc&zoom=9`;
    })
    return(
        <div>
            <iframe id="iframeId" zoom={9} height="500px" width="100%"></iframe>
        </div>
    );
}

export default Map;