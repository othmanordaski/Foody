require('dotenv').config()
const axios = require('axios')

exports.calculateDistance = async (originAddress,destinationAddress) => {
    try{
        const apiKey = process.env.GOOGLE_API_KEY
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originAddress}&destinations=${destinationAddress}&key=${apiKey}`

        const result = await axios.get(url)

        if(result.status === 200){
            const data = result.data
            return data 
        }else{
            throw new Error('Failed to fetch distance data');
        }
    }catch(error){
        console.error('Error fetching distance data:', error);
    }
}