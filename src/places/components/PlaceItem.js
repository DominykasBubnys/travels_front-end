import "./PlaceItem.css";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/FormElements/Button";
import Modal from "../../shared/UIElements/Modal";
import { Fragment, useState } from "react";
import Map from "../../shared/UIElements/Map";


const PlaceItem = (props) => {

    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    return (

        <Fragment>
            <Modal 
                show={showMap} 
                onCancel={closeMapHandler} 
                header={props.adress} 
                contentClass="place-item__model-content" 
                footerClass="place-item__modal-actions" 
                footer={<Button onClick={closeMapHandler}>Close</Button>} 
            >
                <div className="map-container">
                    <Map props={props} />
                </div>
            </Modal>
            
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title}/>
                    </div>

                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>

                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler} >VIEW ON MAP</Button>
                        <Button to={`/places/${props.id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </Fragment>

        
    )

}

export default PlaceItem;