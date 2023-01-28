import axios from 'axios';

const PostApi = async (url,req_data) => {
    const headers = {
        'Content-Type': 'application/json',
      };
    const result = await axios.post(global.globalurl+url, 
 JSON.stringify(req_data),{headers}
    );
    console.log(result.status)
    // console.log(data);
  
    return result;
  };
  export default PostApi;