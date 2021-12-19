import UsersList from "../components/UsersList";

const Users = () => {

    const DUMMY_USERS = [
        {
          id: 'u1',
          name: 'Jim Brown',
          image: "1.jpg",
          places: 1
        },

        {
          id: 'u2',
          name: 'Alice Miller',
          image: "2.jpg",
          places: 7
        },

        {
          id: 'u3',
          name: 'Daniel Scott',
          image: "3.jpg",
          places: 1
        },

        {
          id: 'u4',
          name: 'Ellen Parker',
          image: "4.jpg",
          places: 3
        },

        {
          id: 'u5',
          name: 'Peter Lee',
          image: "5.jpg",
          places: 5
        },

        {
          id: 'u6',
          name: 'Bruce Lee',
          image: "6.jpg",
          places: 2
        },

        {
          id: 'u1',
          name: 'Jim Brown',
          image: "1.jpg",
          places: 1
        },

        {
          id: 'u2',
          name: 'Alice Miller',
          image: "2.jpg",
          places: 7
        },

        {
          id: 'u3',
          name: 'Daniel Scott',
          image: "3.jpg",
          places: 1
        },

        {
          id: 'u4',
          name: 'Ellen Parker',
          image: "4.jpg",
          places: 3
        },

        {
          id: 'u5',
          name: 'Peter Lee',
          image: "5.jpg",
          places: 5
        },

        {
          id: 'u6',
          name: 'Bruce Lee',
          image: "6.jpg",
          places: 2
        },

        {
          id: 'u1',
          name: 'Jim Brown',
          image: "1.jpg",
          places: 1
        },

        {
          id: 'u2',
          name: 'Alice Miller',
          image: "2.jpg",
          places: 7
        },

        {
          id: 'u3',
          name: 'Daniel Scott',
          image: "3.jpg",
          places: 1
        },

        {
          id: 'u4',
          name: 'Ellen Parker',
          image: "4.jpg",
          places: 3
        },

        {
          id: 'u5',
          name: 'Peter Lee',
          image: "5.jpg",
          places: 5
        },

        {
          id: 'u6',
          name: 'Bruce Lee',
          image: "6.jpg",
          places: 2
        },
      ];

    return <UsersList items={DUMMY_USERS}/>
}


export default Users;