import axios from "axios"

const uploadImg = async (file) => {
    if (!file) return
    
    try {
        const formData = new FormData()
        formData.append('upload_preset', 'vue-daybook')
        formData.append('file', file)

        const url = 'https://api.cloudinary.com/v1_1/luciano11/image/upload'
        const { data } = await axios.post(url, formData)
        console.log({data})

        return data.secure_url
    } catch (error) {
        console.log('Error attempting to upload image');
        console.log(error);
        return null
    }
}

export default uploadImg