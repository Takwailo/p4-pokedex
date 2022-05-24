export default function ProfilePage({ user }) {
    console.log(user)
    return (
        <div className="profilePage">
            <h1>{user.username}</h1>
            <img src={user.photoUrl} />
            <ul>
                {user.pokemons?.map(pokemon => <li>{pokemon}</li>)}
            </ul>
        </div>
    )
}

