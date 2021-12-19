import { useParams } from "react-router";
import PlaceList from "../components/PlaceList";

const DummyPlaces = [
    {
        id: "p1",
        title: "Empire state building",
        description: "One of the most famous sky scrapers in the world",
        imageUrl: "https://i.pinimg.com/originals/2c/60/8e/2c608efaf70b37db464e6b935674dc57.jpg",
        address: "20 W 34th 5t, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: "u1"
    },

    {
        id: "p2",
        title: "Castle state building",
        description: "Second of the most famous sky scrapers in the world",
        imageUrl: "https://i.furniturehomewares.com/images/002/img-4720.jpg",
        address: "20 W 34th 5t, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: "u2"
    }
]

const UserPlaces = () => {
    const id = useParams().userId;
    
    if(id){
        const userPlaces = DummyPlaces.filter(place => place.creator === id);
        return <PlaceList items={userPlaces}/>
    }

    return <PlaceList items={DummyPlaces} />
        
}

export default UserPlaces;