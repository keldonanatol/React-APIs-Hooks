import React, { useEffect, useState} from "react";
import "./App.css";
import ProfileEdit from "./ProfileEdit";

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")
  const [userId, setUserID] = useState(1);

  const userIds = [1,2,3,4];

  useEffect(() => {
    console.log(`You clicked ${count} times`)
  }, [count])

  const handleChange = (event) => {
    setName(event.target.value)
  }

return (
    <div className="App">
      {userIds.map((id) => (
        <button key={id} onClick={() => setUserID(id)}>
          User ID {id}
        </button>
      ))}
      <h2>User ID {userId}</h2>
      <ProfileEdit userID={userId}/>
    </div>
)

//(
//  <div>
//    <p>You clicked {count} times</p>

//    <button onClick={() => setCount(count + 1)}>Click me</button>

//    <form>
//      <label>
//        Name:
//        <input
//          type="text"
//          name="name"
//          value={name}
//          onChange={handleChange}
//        />
//      </label>
//    </form>
//  </div>
//)
}

export default App;
