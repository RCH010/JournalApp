import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";



cloudinary.config({ 
    cloud_name: 'castellanos', 
    api_key: '161179284145932', 
    api_secret: 'QF1GJAlSIE_m43I50LRCSzVV8YE' 
});


describe('Tests in fileUpload helper', () => {
    
    test('should upload a file and return an url', async () => {
        const resp = await fetch('https://image.shutterstock.com/image-vector/img-file-document-icon-260nw-1363855613.jpg');
        const blob = await resp.blob()
        const file = new File([blob],'pic.jpg');

        const url = await fileUpload(file);

        expect(typeof url).toBe('string');
        const segments = url.split('/');
        const imgId = segments[segments.length - 1].replace('.jpg','');
        
        await cloudinary.v2.api.delete_resources(imgId);
    })

    test('should return an error with no file', async () => {
       
        const file = new File([],'pic.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    })

})
