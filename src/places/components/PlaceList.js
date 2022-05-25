import Card from '../../shared/UIElements/Card'
import PlaceItem from './PlaceItem'
import './PlaceList.css'
import Button from '../../shared/FormElements/Button'
import { useContext } from 'react'
import { AuthContext } from '../../shared/context/auth-context'
import { useState } from 'react'

const PlaceList = (props) => {
  const [reload, setReload] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const User = useContext(AuthContext)

  const reloadHandler = () => {
    setReload(!reload)
  }

  if (!props.items || props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2 className="no-place-header">No places found</h2>
          {User.isLoggedIn && User.userId === props.userId && (
            <Button to="/places/new">Share place</Button>
          )}
        </Card>
      </div>
    )
  }

  const elementList = props.items
    .filter((place) => {
      if (searchTerm === '') return place
      else if (place.title.toLowerCase().includes(searchTerm.toLowerCase()))
        return place
    })
    .map((place) => (
      <PlaceItem
        key={place._id}
        id={place._id}
        image={place.image}
        title={place.title}
        description={place.description}
        address={place.address}
        creatorId={place.creator}
        coordinates={place.location}
        likes={place.likes}
        isLikedByYou={place.likedBy.includes(User.userId)}
        showControllers={props.userControllers === User.userId}
        onDelete={props.onDeletePlace}
        onReload={reloadHandler}
      />
    ))

  return (
    <ul className="place-list">
      <div className="controllers">
        <input
          autoFocus
          id="search-input"
          placeholder="Search by title"
          type="text"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {elementList}
    </ul>
  )
}

export default PlaceList
