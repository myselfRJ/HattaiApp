import axios from 'axios';

const PostApi = async (url,req_data) => {
    const headers = {
        'Content-Type': 'application/json',
      };
    const result = await axios.post(global.globalurl+url, 
 JSON.stringify(req_data),{headers}
    );
    console.log(result.status)
    data = await result.json();
    // console.log(data);
    data["status"]=result.status
  
    return data;
  };
  export default PostApi;