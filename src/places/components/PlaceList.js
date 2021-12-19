import Card from "../../shared/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css"
import Button from "../../shared/FormElements/Button";

const PlaceList = (props) => {
    
    if(props.items.length === 0){
        return <div className="place-list center">
            <Card>
                <h2 className="no-place-header">No places found</h2>
                <Button to="/places/new">Share place</Button>
            </Card>
        </div>
    }

    return <ul className="place-list">
        {props.items.map(place => <PlaceItem
            key = {place.id}
            id = {place.id}
            image = {place.imageUrl}
            title = {place.title}
            description = {place.description}
            address = {place.address}
            creatorId = {place.creator}
            coordinates = {place.location}
        />)}
    </ul>
}

export default PlaceList;