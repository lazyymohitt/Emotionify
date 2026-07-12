import axios from "axios"

const api = axios.create({

        baseURL:"http://localhost:3000 ",
        withCredentials:true
})

export const getSongs = async (mood) =>{
    const response  = await api.get("/api/song",{params:{mood}})
    return response.data
}

export const searchSong=  async(query)=>{
    const response = await api.get("/api/song/search",{params:{query }})
    return response.data
}
