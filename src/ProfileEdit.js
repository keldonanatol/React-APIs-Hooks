import React, { useEffect, useState } from "react"

function ProfileEdit ({userID}) {
    const [user, setUser] = useState({})

    //useEffect(() => {
    //    fetch("https://jsonplaceholder.typicode.com/users/1")
    //       .then((response) => response.json())
    //       .then(setUser)
    //}, [])//same as the bottom function but better to use await and async

    useEffect(() => {
        setUser({});
        const abortController = new AbortController();

        async function loadUsers() {
         try {  const response = await fetch (
               `https://jsonplaceholder.typicode.com/users/${userID}`,
               {signal: abortController.signal}
            );//get data from the API
            const userFromAPI = await response.json();
            console.log("setUser", userFromAPI)
            setUser(userFromAPI); // calls user that is return from the API or from the get data above
         } catch (error) {
             if (error.name === "AbortError") {
                 console.log("Aborted", userID)
             } else {
                 throw error;
             }
         }
        }
        loadUsers();

        return () => {
            console.log("cleanup", userID)
            abortController.abort();
        }
    }, [userID]) // Passing [] so that it only runs the effect once

    useEffect(() => {
        if (user.username) {
            document.title = `${user.username} : Edit Profile`
        } else {
            document.title = "Edit Profile"
        }
    }, [user]) // Rerun this effect when the user changes

    const handleChange = ({target}) => {
        setUser({
            ...user,
            [target.name]: target.value,
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const response = await fetch (
            `https://jsonplaceholder.typicode.com/users/${user.id}`,

            {
                method: "PUT",
                body: JSON.stringify(user),
                
            }
        )
        const savedData = await response.json();
        console.log("Saved Data:", savedData)
    }

   if(user.id) {
    return (
        <form name="profileEdit" onSubmit={submitHandler}>
            <label htmlFor="username">
                User Name:
                <input 
                  id="username"
                  name="username"
                  type="text"
                  required={true}
                  value={user.username}
                  onChange={handleChange}
                />
            </label>

            <label htmlFor="email">
                Email:
                <input id="email" name="email" type="email" required={true} value={user.email} onChange={handleChange}/>
            </label>
            <button type="submit">Save</button>
        </form>
    )
   }

   return "Loading..."
}

export default ProfileEdit