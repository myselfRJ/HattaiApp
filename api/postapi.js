import axios from 'axios';
const globalurl = "https://71e7-13-54-190-39.au.ngrok.io/api/v1/";

const PostApi = async (url,req_data,secure) => {
  console.log(url,"url",globalurl+url)
    const headers = {
        'Content-Type': 'application/json',
      };
      if (secure){
          headers['Authorization'] = 'Bearer '+global.user_session
      }
    const result = await axios.post(globalurl+url, 
 JSON.stringify(req_data),{headers}
    );
    console.log(result.status,headers)
    // console.log(data);
  
    return result;
  };

 const PostForm = async(url,form_data)=>{
    console.log(url,"url",form_data)
    const headers = { 
      'Authorization': 'Bearer '+global.user_session, 
      "Content-Type": "multipart/form-data"
    };
    const result = await axios.post(globalurl+url, 
      form_data,{headers}
         );
      return result;
  }

  const GetApi = async (url,secure) => {
    console.log(url,"url")
      const headers = {
          'Content-Type': 'application/json',
        };
        if (secure){
            headers['Authorization'] = 'Bearer '+global.user_session
        }
      const result = await axios.get(globalurl+url, 
      {headers}
      );
      console.log(result.status,headers)
      // console.log(data);
    
      return result;
    };
  export  {PostApi,PostForm,GetApi};