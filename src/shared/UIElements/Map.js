import "./Map.css";

const Map = props => {
    
    console.log("props in maps file: ", props.props);

    return <div>
        {`${props.props.coordinates.lng} ==> ${props.props.coordinates.lat}`}
    </div>
}

export default Map;