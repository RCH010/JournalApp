// function that returns image url, that's just been uploaded 
// in claudinary

export const fileUpload = async (file) => {
    const cloudinaryURL = 'https://api.cloudinary.com/v1_1/castellanos/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'reactJournalApp');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudinaryURL, {
            method: 'POST',
            body: formData
        })
        if(resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else {
            throw await resp.json() //seria error de clodinary
        }
    } catch (error) {
        console.log(error);
        throw error; //seria error de algo que no maneje bien
    }
}