import { useResourceData } from "crudashx"
import { useEffect, useState } from "react"

const PostUserRenderer = ({value: userId}: {value:number}) =>{
    const [user,setUser] = useState<any>(null)
    const {getOne,loading,error} = useResourceData<any>("users")
    useEffect(()=>{
        getOne(userId).then(setUser)
    },[])

    if(loading) return <span>...</span>
    if(error) return <span>{error}</span>
    if(!user) return <span>---</span>
    return <span className="text-teal-500">{userId} - {user.name}</span>
}

export default PostUserRenderer