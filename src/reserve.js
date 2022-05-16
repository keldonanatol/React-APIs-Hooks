useEffect(() => {
    setToDos({})
    const abortController = new AbortController()
    
    async function loadUsers() {
      try {
        const response = await fetch (
        'https://jsonplaceholder.typicode.com/todos?userId=3',
          {signal: abortController.signal}
        )
        const userFromAPI = await response.json()
        setToDos(userFromAPI)
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(userID)
        } else {
          throw error
        }
      }
    }
    loadUsers()
    return() => {
      abortController.abort();
    }    
  },[toDos])